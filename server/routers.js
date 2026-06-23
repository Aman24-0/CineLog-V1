import { initTRPC, TRPCError } from '@trpc/server';
import { z } from 'zod';
import axios from 'axios';
import { TEMP_DIR, safeDeleteFile, handleStreamResponse } from './streamer.js';
import path from 'path';
import fs from 'fs';

// ============================================
// 1. Environment & API Key Validation
// ============================================
const TMDB_API_KEY = process.env.TMDB_API_KEY || process.env.VITE_TMDB_API_KEY;

if (!TMDB_API_KEY || TMDB_API_KEY === 'your_tmdb_api_key_here') {
  console.error('❌ CRITICAL: TMDB API Key is missing or invalid. Please set TMDB_API_KEY in your .env file.');
  // We don't exit here to allow the server to start, but API calls will fail gracefully.
}

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// ============================================
// 2. LRU Cache Implementation (Fixes Memory Leak)
// ============================================
// Limits cache to 100 entries to prevent server memory exhaustion
class LRUCache {
  constructor(maxSize = 100) {
    this.maxSize = maxSize;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) return undefined;
    const value = this.cache.get(key);
    // Move to end (most recently used)
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  set(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.maxSize) {
      // Evict oldest entry
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }
}

const torrentCache = new LRUCache(100);

// ============================================
// 3. tRPC Initialization
// ============================================
const t = initTRPC.create();

export const appRouter = t.router({
  // ==========================================
  // Search Movies/TV Shows
  // ==========================================
  search: t.procedure
    .input(z.object({ 
      query: z.string().min(1, "Search query cannot be empty"),
      type: z.enum(['movie', 'tv']).optional().default('movie') 
    }))
    .query(async ({ input }) => {
      if (!TMDB_API_KEY) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'TMDB API Key is not configured on the server.',
        });
      }

      try {
        // Input sanitization: ensure query is properly encoded
        const encodedQuery = encodeURIComponent(input.query.trim());
        const endpoint = input.type === 'tv' ? 'search/tv' : 'search/movie';
        
        const response = await axios.get(`${TMDB_BASE_URL}/${endpoint}`, {
          params: {
            api_key: TMDB_API_KEY,
            query: encodedQuery,
            include_adult: false,
          },
        });

        return {
          results: response.data.results,
          total_pages: response.data.total_pages,
          total_results: response.data.total_results,
        };
      } catch (error) {
        console.error('TMDB Search Error:', error.message);
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `Failed to fetch search results: ${error.message}`,
        });
      }
    }),

  // ==========================================
  // Get Movie/TV Details
  // ==========================================
  details: t.procedure
    .input(z.object({ 
      id: z.number().int().positive(),
      type: z.enum(['movie', 'tv']).optional().default('movie') 
    }))
    .query(async ({ input }) => {
      if (!TMDB_API_KEY) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'TMDB API Key is not configured on the server.',
        });
      }

      try {
        const response = await axios.get(`${TMDB_BASE_URL}/${input.type}/${input.id}`, {
          params: {
            api_key: TMDB_API_KEY,
            append_to_response: 'credits,videos,images',
          },
        });
        return response.data;
      } catch (error) {
        console.error('TMDB Details Error:', error.message);
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `Failed to fetch details: ${error.message}`,
        });
      }
    }),

  // ==========================================
  // Scrape Video Source (with Proxy Fallback & Caching)
  // ==========================================
  scrapeVideo: t.procedure
    .input(z.object({ 
      query: z.string().min(1),
      season: z.number().int().optional(),
      episode: z.number().int().optional()
    }))
    .query(async ({ input }) => {
      const cacheKey = `${input.query}-${input.season || ''}-${input.episode || ''}`;
      
      // Check cache first
      const cachedResult = torrentCache.get(cacheKey);
      if (cachedResult) {
        return { source: cachedResult, fromCache: true };
      }

      const proxies = [
        `https://api.allorigins.win/raw?url=`,
        `https://corsproxy.io/?`
      ];

      let lastError = null;

      for (const proxy of proxies) {
        try {
          // Sanitize and encode the target URL
          const targetUrl = `https://example-torrent-api.com/search?query=${encodeURIComponent(input.query)}`;
          const finalUrl = `${proxy}${encodeURIComponent(targetUrl)}`;

          const response = await axios.get(finalUrl, { timeout: 10000 });
          
          // Mock parsing logic (replace with your actual scraping logic)
          const data = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
          
          if (data && data.magnet) {
            // Store in LRU cache
            torrentCache.set(cacheKey, data.magnet);
            return { source: data.magnet, fromCache: false };
          }
        } catch (error) {
          lastError = error;
          console.warn(`⚠️ Proxy ${proxy} failed: ${error.message}`);
          continue; // Try next proxy
        }
      }

      // If all proxies fail
      throw new TRPCError({
        code: 'SERVICE_UNAVAILABLE',
        message: `Failed to scrape video source. All proxies failed. Last error: ${lastError?.message || 'Unknown error'}`,
      });
    }),

  // ==========================================
  // Stream Video File (Handles Range Requests)
  // ==========================================
  stream: t.procedure
    .input(z.object({ 
      filePath: z.string().min(1) 
    }))
    .mutation(async ({ input, ctx }) => {
      // Security: Prevent path traversal attacks
      const safePath = path.resolve(input.filePath);
      if (!safePath.startsWith(TEMP_DIR)) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'Access denied: Invalid file path.',
        });
      }

      if (!fs.existsSync(safePath)) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Video file not found on server.',
        });
      }

      // Note: In a real Express/tRPC setup, streaming requires direct access to req/res.
      // This is a placeholder to show the integration with streamer.js.
      // You would typically handle this via a custom Express route or pass req/res through context.
      return { 
        status: 'ready', 
        message: 'Stream endpoint ready. Ensure req/res are passed via tRPC context for actual streaming.' 
      };
    }),
});

// Export the router type for TypeScript support
export { appRouter };
