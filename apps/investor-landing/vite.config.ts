import { vitePlugin as remix } from '@remix-run/dev'
import { installGlobals } from '@remix-run/node'
import autoprefixer from 'autoprefixer'
import { flatRoutes } from 'remix-flat-routes'
import tailwindcss from 'tailwindcss'
import { defineConfig } from 'vite'
import envOnly from 'vite-env-only'
import tsconfigPaths from 'vite-tsconfig-paths'

// TODO: Update this once we figure our the TS issue that vite is throwing

import { themePreset } from '../../packages/1ui/src/styles'

installGlobals()

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss(themePreset), autoprefixer],
    },
  },
  plugins: [
    envOnly(),
    remix({
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
      'mini-svg-data-uri',
    ],
  },
})
