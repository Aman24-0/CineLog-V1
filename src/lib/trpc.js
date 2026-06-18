import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import superjson from 'superjson';

// Smart URL detection: Localhost par alag, Netlify par Render ka URL
const getBackendUrl = () => {
  if (window.location.hostname === 'localhost') {
    return 'http://localhost:5000';
  }
  // Aapke Render server ka Live URL
  return 'https://cinelog-0py8.onrender.com';
};

export const trpc = createTRPCProxyClient({
  transformer: superjson,
  links: [
    httpBatchLink({
      url: `${getBackendUrl()}/api/trpc`,
    }),
  ],
});
