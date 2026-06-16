import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const trpc = createTRPCProxyClient({
  links: [
    httpBatchLink({
      url: `${API_URL}/api/trpc`,
      // transformer: superjson, <-- Is line ko DELETE ya comment kar dein
    }),
  ],
});
