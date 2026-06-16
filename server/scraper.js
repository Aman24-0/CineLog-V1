import puppeteer from 'puppeteer';

/**
 * Scraper configuration for multiple video sources
 * This includes both legal and common streaming sources
 */
const SCRAPER_SOURCES = [
  {
    name: 'HiMovies',
    searchUrl: (title) => `https://himovies.to/search/${encodeURIComponent(title)}`,
    selectors: {
      resultLink: 'a[href*="/watch/"]',
      videoFrame: 'iframe[src*="streaming"]',
    },
  },
  {
    name: 'Flixtor',
    searchUrl: (title) => `https://flixtor.to/search/${encodeURIComponent(title)}`,
    selectors: {
      resultLink: 'a.film-poster-ahref',
      videoFrame: 'iframe[src*="embed"]',
    },
  },
  {
    name: 'MovieBox',
    searchUrl: (title) => `https://www.movieboxpro.com/search/${encodeURIComponent(title)}`,
    selectors: {
      resultLink: 'a[href*="/movie/"]',
      videoFrame: 'iframe[src*="player"]',
    },
  },
];

/**
 * Attempt to scrape a video source from a single website
 * @param {string} movieTitle - The movie title to search for
 * @param {Object} source - The source configuration
 * @returns {Promise<string|null>} - The video URL if found, null otherwise
 */
async function scrapeFromSource(movieTitle, source) {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
      ],
    });

    const page = await browser.newPage();
    
    // Set timeout and user agent
    page.setDefaultTimeout(15000);
    page.setDefaultNavigationTimeout(15000);
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    );

    // Navigate to search page
    const searchUrl = source.searchUrl(movieTitle);
    console.log(`🔍 Searching on ${source.name}: ${searchUrl}`);
    
    await page.goto(searchUrl, { waitUntil: 'domcontentloaded', timeout: 15000 }).catch(() => {});

    // Try to find and click the first result
    const resultLink = await page.$(source.selectors.resultLink);
    if (!resultLink) {
      console.log(`❌ No results found on ${source.name}`);
      return null;
    }

    await resultLink.click();
    await page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 15000 }).catch(() => {});

    // Try to find video iframe or direct video link
    const videoFrame = await page.$(source.selectors.videoFrame);
    if (videoFrame) {
      const videoUrl = await page.evaluate((iframe) => {
        return iframe.src || iframe.getAttribute('data-src');
      }, videoFrame);

      if (videoUrl && (videoUrl.includes('.mp4') || videoUrl.includes('.m3u8'))) {
        console.log(`✅ Found video on ${source.name}: ${videoUrl}`);
        return videoUrl;
      }
    }

    // Try to find direct video source
    const directVideo = await page.evaluate(() => {
      const video = document.querySelector('video source');
      if (video && video.src) return video.src;
      
      const iframe = document.querySelector('iframe[src*="mp4"], iframe[src*="m3u8"]');
      if (iframe) return iframe.src;
      
      return null;
    });

    if (directVideo) {
      console.log(`✅ Found direct video on ${source.name}: ${directVideo}`);
      return directVideo;
    }

    console.log(`⚠️ No playable video found on ${source.name}`);
    return null;

  } catch (error) {
    console.error(`❌ Error scraping ${source.name}:`, error.message);
    return null;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

/**
 * Main scraper function that tries multiple sources
 * @param {string} movieTitle - The movie title to search for
 * @returns {Promise<string|null>} - The video URL if found, null otherwise
 */
export async function findVideoSource(movieTitle) {
  console.log(`\n🎬 Starting scrape for: "${movieTitle}"`);
  
  // Try each source sequentially
  for (const source of SCRAPER_SOURCES) {
    try {
      const videoUrl = await scrapeFromSource(movieTitle, source);
      if (videoUrl) {
        return videoUrl;
      }
    } catch (error) {
      console.error(`Error with ${source.name}:`, error.message);
      continue;
    }
  }

  console.log(`❌ Could not find video source for "${movieTitle}" across all sources`);
  return null;
}

/**
 * Fallback: Return a demo video URL for testing
 * This is used when scraping fails
 */
export function getDemoVideoUrl() {
  return 'https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4';
}
