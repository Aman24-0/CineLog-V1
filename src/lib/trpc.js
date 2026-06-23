import { createTRPCSolid, httpBatchLink, loggerLink } from '@trpc/solid';

// ============================================
// Unified Backend URL Configuration
// ============================================
// Fixes: Hardcoded URLs. Now uses VITE_BACKEND_URL from .env
const getBaseUrl = () => {
  if (import.meta.env.VITE_BACKEND_URL) {
    return import.meta.env.VITE_BACKEND_URL;
  }
  // Fallback for local development
  return 'http://localhost:5000';
};

export const trpc = createTRPCSolid({
  config() {
    return {
      links: [
        loggerLink({
          enabled: (op) =>
            import.meta.env.DEV ||
            (op.direction === 'down' && op.result instanceof Error),
        }),
        httpBatchLink({
          url: `${getBaseUrl()}/trpc`,
        }),
      ],
    };
  },
});

export default trpc;
