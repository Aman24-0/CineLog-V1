import fs from 'fs';
import path from 'path';
import os from 'os';

// ============================================
// Cross-Platform Temporary Directory Setup
// ============================================
// Fixes: Hardcoded '/tmp' path which fails on Windows and some Render instances
const getTempDir = () => {
  const baseDir = path.join(os.tmpdir(), 'cinelog-streams');
  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
  }
  return baseDir;
};

export const TEMP_DIR = getTempDir();

// ============================================
// Safe File Cleanup
// ============================================
// Prevents crashes if files are locked or already deleted
export const safeDeleteFile = (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    console.warn(`⚠️ Could not delete temp file ${filePath}:`, error.message);
  }
};

// ============================================
// Stream Response Helper
// ============================================
// Handles HTTP Range Requests for smooth video seeking
export const handleStreamResponse = (req, res, filePath, contentType = 'video/mp4') => {
  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = (end - start) + 1;
    const file = fs.createReadStream(filePath, { start, end });

    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': contentType,
    };

    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': contentType,
    };

    res.writeHead(200, head);
    fs.createReadStream(filePath).pipe(res);
  }
};

// ============================================
// Cleanup Interval (Prevents disk space issues)
// ============================================
// Automatically cleans up files older than 24 hours
const CLEANUP_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours in ms

setInterval(() => {
  try {
    const files = fs.readdirSync(TEMP_DIR);
    const now = Date.now();

    files.forEach(file => {
      const filePath = path.join(TEMP_DIR, file);
      const stats = fs.statSync(filePath);
      
      // If file is older than 24 hours, delete it
      if (now - stats.mtimeMs > CLEANUP_INTERVAL) {
        safeDeleteFile(filePath);
        console.log(` Cleaned up old temp file: ${file}`);
      }
    });
  } catch (error) {
    console.error('❌ Error during temp file cleanup:', error.message);
  }
}, CLEANUP_INTERVAL);

console.log(`✅ Streamer initialized. Temp directory: ${TEMP_DIR}`);
