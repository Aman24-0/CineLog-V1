import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';

const getBackendUrl = () => {
  if (window.location.hostname === 'localhost') {
    return 'http://localhost:3000';
  }
  // ✅ REPLACE WITH YOUR ORACLE CLOUD DOMAIN OR IP
  return 'https://api.cinelog.com'; 
};

export const trpc = createTRPCProxyClient({
  links: [
    httpBatchLink({
      url: `${getBackendUrl()}/api/trpc`,
    }),
  ],
});
