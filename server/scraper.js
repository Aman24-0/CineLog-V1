// server/scraper.js

// .env file se Prowlarr details fetch karein (Ya direct URL daal dein)
const PROWLARR_URL = process.env.PROWLARR_URL || 'http://localhost:9696';
const PROWLARR_API_KEY = process.env.PROWLARR_API_KEY || 'YAHAN_APNI_API_KEY_DAALEIN';

export async function findVideoSource(movieTitle) {
  console.log(`\n🎬 Searching Prowlarr for: "${movieTitle}"`);
  
  if (!PROWLARR_API_KEY || PROWLARR_API_KEY === 'YAHAN_APNI_API_KEY_DAALEIN') {
    console.log("❌ PROWLARR_API_KEY is missing!");
    return null;
  }

  try {
    // 2000 aur 2040 Movies ki categories hain Prowlarr mein
    const searchUrl = `${PROWLARR_URL}/api/v1/search?apikey=${PROWLARR_API_KEY}&query=${encodeURIComponent(movieTitle)}&categories=2000,2040`;
    
    // Direct fetch request to your local Prowlarr server
    const response = await fetch(searchUrl);

    if (!response.ok) throw new Error('Prowlarr server unreachable');
    const results = await response.json();

    if (results && results.length > 0) {
      // Sabse zyada Seeders (fastest working link) wale torrent ko top par layein
      const sortedResults = results.sort((a, b) => (b.seeders || 0) - (a.seeders || 0));
      
      for (const item of sortedResults) {
        // Prowlarr ya toh magnetUrl deta hai ya direct downloadUrl
        const link = item.magnetUrl || item.downloadUrl;
        if (link) {
          console.log(`✅ Best Prowlarr Match Found: ${item.title} (Seeders: ${item.seeders})`);
          return link; 
        }
      }
    }

    console.log(`❌ No working link found for "${movieTitle}"`);
    return null;
  } catch (error) {
    console.error(`❌ Error fetching from Prowlarr:`, error.message);
    return null;
  }
}

export function getDemoVideoUrl() {
  return 'https://vjs.zencdn.net/v/oceans.mp4';
}
