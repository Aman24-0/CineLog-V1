import express from 'express';
import cors from 'express'; // ya import cors from 'cors'; jo pehle se tha
import cors from 'cors';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from './routers.js';
import { createContext } from './context.js';
import superjson from 'superjson'; // 1. Is line ko sabse upar import karein

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    callback(null, true);
  },
  credentials: true,
}));
app.use(express.json());

// tRPC endpoint
app.use('/api/trpc', createExpressMiddleware({
  router: appRouter,
  createContext,
  transformer: superjson, // 2. YAHAN PAR SUPERJSON ADD KAREIN
}));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`🎬 Cinelog Backend Server running on http://localhost:${PORT}`);
});
