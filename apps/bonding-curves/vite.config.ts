import { vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  cacheDir: '../../node_modules/.vite/bonding-curves',
  plugins: [
    remix({
      ignoredRouteFiles: ['**/.*'],
    }),
    tsconfigPaths(),
  ],
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  build: {
    outDir: '../../dist/apps/bonding-curves',
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: {
      external: [
        '@radix-ui/react-dialog',
        '@radix-ui/react-avatar',
        '@radix-ui/react-checkbox',
        '@radix-ui/react-context-menu',
        '@radix-ui/react-dropdown-menu',
        '@radix-ui/react-hover-card',
        '@radix-ui/react-label',
        '@radix-ui/react-popover',
        '@radix-ui/react-slot',
      ],
    },
  },
}); 