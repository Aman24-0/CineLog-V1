import express from 'express';
import cors from 'cors';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from './routers.js';
import { createContext } from './context.js';
import { streamTorrent } from './streamer.js';

const app = report || express();
const appInstance = express();
const PORT = process.env.PORT || 5000;

appInstance.use(cors({
  origin: function (origin, callback) {
    callback(null, true);
  },
  credentials: true,
}));
appInstance.use(express.json());

appInstance.use('/api/trpc', createExpressMiddleware({
  router: appRouter,
  createContext,
}));

// Torrent Streaming Route
appInstance.get('/api/stream', streamTorrent);

appInstance.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

appInstance.listen(PORT, () => {
  console.log(`🎬 Cinelog Backend Server running on http://localhost:${PORT}`);
});
