import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';

const getBackendUrl = () => {
  if (window.location.hostname === 'localhost') {
    return 'http://localhost:5000';
  }
  // Your existing Render server URL
  return 'https://cinelog-0py8.onrender.com';
};

export const trpc = createTRPCProxyClient({
  links: [
    httpBatchLink({
      url: `${getBackendUrl()}/api/trpc`,
    }),
  ],
});
