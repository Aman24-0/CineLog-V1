import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';

// Smart URL detection: Localhost par alag, Netlify par Render ka URL
const getBackendUrl = () => {
  if (window.location.hostname === 'localhost') {
    return 'http://localhost:5000';
  }
  // Aapke Render server ka Live URL
  return 'https://cinelog-0py8.onrender.com';
};

export const trpc = createTRPCProxyClient({
  links: [
    httpBatchLink({
      // ✅ FIXED: Ensures path matches backend /api/trpc
      url: `${getBackendUrl()}/api/trpc`,
    }),
  ],
});
