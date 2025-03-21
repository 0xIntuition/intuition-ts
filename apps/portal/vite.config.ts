import { vitePlugin as remix } from '@remix-run/dev'
import { installGlobals } from '@remix-run/node'
import autoprefixer from 'autoprefixer'
import { flatRoutes } from 'remix-flat-routes'
import tailwindcss from 'tailwindcss'
import { defineConfig } from 'vite'
import envOnly from 'vite-env-only'
import tsconfigPaths from 'vite-tsconfig-paths'

import { themePreset } from '../../packages/1ui/src/styles'

installGlobals()

declare module '@remix-run/node' {
  interface Future {
    v3_singleFetch: true
  }
}

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss(themePreset), autoprefixer],
    },
  },
  plugins: [
    envOnly(),
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
      ignoredRouteFiles: ['**/.*'],
      routes: async (defineRoutes) => {
        return flatRoutes('routes', defineRoutes, {
          ignoredRouteFiles: [
            '.*',
            '**/*.css',
            '**/*.test.{js,jsx,ts,tsx}',
            '**/__*.*',
          ],
        })
      },
    }),
    tsconfigPaths(),
  ],
  server: {
    port: 8080,
  },
  build: {
    target: 'ES2022',
    sourcemap: true,
    cssMinify: process.env.NODE_ENV === 'production',
    assetsInlineLimit: (source: string) => {
      if (source.endsWith('sprite.svg')) {
        return false
      }
    },
  },
  ssr: {
    noExternal: [
      '@privy-io/react-auth',
      '@privy-io/wagmi',
      'react-dropzone',
      'buffer',
    ],
    optimizeDeps: {
      include: ['stream-browserify', 'buffer'],
    },
  },
  resolve: {
    alias: {
      stream: 'stream-browserify',
      buffer: 'buffer',
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
  define: {
    'import.meta.env.VITE_ENABLE_SOCIAL_LINKING': JSON.stringify(
      process.env.ENABLE_SOCIAL_LINKING,
    ),
  },
})
