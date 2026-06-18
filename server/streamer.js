import WebTorrent from 'webtorrent';

const client = new WebTorrent();

export const streamTorrent = (req, res) => {
  const magnet = req.query.magnet;
  if (!magnet) {
    return res.status(400).send('Magnet link is required');
  }

  try {
    let torrent = client.get(magnet);

    const handleTorrent = (t) => {
      const file = t.files.reduce((a, b) => (a.length > b.length ? a : b));

      const range = req.headers.range;
      if (!range) {
        res.writeHead(200, {
          'Content-Length': file.length,
          'Content-Type': 'video/mp4',
        });
        file.createReadStream().pipe(res);
        return;
      }

      const positions = range.replace(/bytes=/, '').split('-');
      const start = parseInt(positions[0], 10);
      const end = positions[1] ? parseInt(positions[1], 10) : file.length - 1;
      const chunksize = end - start + 1;

      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${file.length}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      });

      file.createReadStream({ start, end }).pipe(res);
    };

    if (torrent) {
      handleTorrent(torrent);
    } else {
      console.log('🔄 Starting Torrent Stream Engine...');
      client.add(magnet, handleTorrent);
    }

  } catch (err) {
    console.error('Streaming error:', err);
    res.status(500).send('Error starting stream');
  }
};
