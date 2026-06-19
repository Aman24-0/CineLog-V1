import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    solidPlugin(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: false,
      // Use injectManifest strategy for custom SW
      strategies: 'injectManifest',
      
      // ✅ FIXED: Changed from 'public' to 'src' to prevent build collision
      srcDir: 'src', 
      filename: 'sw.js',
      
      injectManifest: {
        // Keep globPatterns empty if you want full manual control over precaching
        globPatterns: [],
      },
      
      includeAssets: ['icons/*.png', 'icons/*.ico'],
    })
  ],
  build: {
    target: 'esnext',
  },
});
