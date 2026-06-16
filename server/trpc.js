import { initTRPC } from '@trpc/server';
import superjson from 'superjson'; // 1. Superjson import karein

const t = initTRPC.create({
  transformer: superjson, // 2. Yahan transformer add karein
});

export const router = t.router;
export const publicProcedure = t.procedure;
