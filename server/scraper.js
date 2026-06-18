// server/scraper.js

export async function findVideoSource(movieTitle) {
  console.log(`\n🎬 Prowlarr List Search For: "${movieTitle}"`);

  // URL ke aage se extra '/' hatane ka safe tareeqa
  const baseUrl = (process.env.PROWLARR_URL || '').replace(/\/$/, '');
  const apiKey = process.env.PROWLARR_API_KEY;

  if (!baseUrl || !apiKey) {
    throw new Error("Render par PROWLARR_URL ya PROWLARR_API_KEY set nahi hai!");
  }

  try {
    // 💡 URL Builder (Status 400 fix)
    // Ye Prowlarr ke exact .NET format me URL parameters banata hai
    const url = new URL(`${baseUrl}/api/v1/search`);
    url.searchParams.append('query', movieTitle);
    url.searchParams.append('type', 'search');
    url.searchParams.append('categories', '2000'); // Standard Movies
    url.searchParams.append('categories', '2040'); // HD Movies

    console.log(`📡 Fetching from: ${url.toString()}`);

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'X-Api-Key': apiKey
      }
    });

    if (!response.ok) {
      throw new Error(`Prowlarr Connection Failed (Status: ${response.status})`);
    }

    const results = await response.json();

    if (!results || results.length === 0) {
      return []; // Agar movie nahi mili
    }

    // Top 20 results (Seeders ke hisaab se sorted)
    const sorted = results.sort((a, b) => (b.seeders || 0) - (a.seeders || 0)).slice(0, 20);

    const streams = sorted.map(item => {
      // File Size ko Bytes se GB mein convert karna
      let sizeStr = "Unknown Size";
      if (item.size) {
        sizeStr = (item.size / (1024 * 1024 * 1024)).toFixed(2) + " GB";
      }
      return {
        title: item.title || 'Unknown Title',
        link: item.magnetUrl || item.downloadUrl || null,
        seeders: item.seeders || 0,
        size: sizeStr,
        indexer: item.indexer || 'Torrent'
      };
    }).filter(item => item.link);

    return streams;

  } catch (error) {
    console.error(`❌ Scraper Error:`, error.message);
    throw error;
  }
}

export function getDemoVideoUrl() {
  return 'https://vjs.zencdn.net/v/oceans.mp4';
}
