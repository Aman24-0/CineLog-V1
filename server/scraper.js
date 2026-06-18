// server/scraper.js
const PROWLARR_URL = process.env.PROWLARR_URL;
const PROWLARR_API_KEY = process.env.PROWLARR_API_KEY;

export async function findVideoSource(movieTitle) {
  console.log(`\n🎬 Prowlarr Search Triggered For: "${movieTitle}"`);
  
  if (!PROWLARR_URL || !PROWLARR_API_KEY) {
    console.log("❌ Render par PROWLARR_URL ya PROWLARR_API_KEY set nahi hai!");
    return null;
  }

  try {
    // API Key ko URL se hata diya gaya hai taaki Prowlarr block na kare
    const searchUrl = `${PROWLARR_URL}/api/v1/search?query=${encodeURIComponent(movieTitle)}&categories=2000,2040`;
    
    console.log(`📡 Sending request to: ${searchUrl}`);

    const response = await fetch(searchUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'X-Api-Key': PROWLARR_API_KEY // API Key ko safely secure Headers mein bhej rahe hain
      }
    });

    if (!response.ok) {
      console.log(`❌ Prowlarr Server responded with status: ${response.status}`);
      throw new Error('Prowlarr authentication or network failed');
    }
    
    const results = await response.json();

    if (results && results.length > 0) {
      // Highest seeders wale torrent ko choose karne ke liye sort
      const sortedResults = results.sort((a, b) => (b.seeders || 0) - (a.seeders || 0));
      
      for (const item of sortedResults) {
        const link = item.magnetUrl || item.downloadUrl;
        if (link) {
          console.log(`✅ Real Link Found: ${item.title} (Seeders: ${item.seeders})`);
          return link; 
        }
      }
    }

    console.log(`❌ No stream found on Prowlarr for "${movieTitle}"`);
    return null;
  } catch (error) {
    console.error(`❌ Scraper Error:`, error.message);
    return null;
  }
}

export function getDemoVideoUrl() {
  return 'https://vjs.zencdn.net/v/oceans.mp4';
}
