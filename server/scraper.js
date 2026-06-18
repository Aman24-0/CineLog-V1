// server/scraper.js

export async function findVideoSource(movieTitle, year) {
  // Exact Match Query: Agar year hai toh title ke aage laga do
  const exactQuery = year ? `${movieTitle} ${year}` : movieTitle;
  console.log(`\n🎬 Prowlarr List Search For: "${exactQuery}"`);

  const baseUrl = (process.env.PROWLARR_URL || '').replace(/\/$/, '');
  const apiKey = process.env.PROWLARR_API_KEY;

  if (!baseUrl || !apiKey) throw new Error("PROWLARR_URL ya API_KEY set nahi hai!");

  try {
    const url = new URL(`${baseUrl}/api/v1/search`);
    url.searchParams.append('query', exactQuery); // Naya exact query
    url.searchParams.append('type', 'search');
    url.searchParams.append('categories', '2000'); 
    url.searchParams.append('categories', '2040'); 

    //... (Baaki ka fetch response aur return streams wala code bilkul same rahega)

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
