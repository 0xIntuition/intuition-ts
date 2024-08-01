import contentCollections from '@content-collections/remix-vite'
import { vitePlugin as remix } from '@remix-run/dev'
import { installGlobals } from '@remix-run/node'
import { sentryVitePlugin } from '@sentry/vite-plugin'
import autoprefixer from 'autoprefixer'
import { flatRoutes } from 'remix-flat-routes'
import tailwindcss from 'tailwindcss'
import { defineConfig } from 'vite'
import envOnly from 'vite-env-only'
import tsconfigPaths from 'vite-tsconfig-paths'

// TODO: Update this once we figure our the TS issue that vite is throwing

import { themePreset } from '../../packages/1ui/src/styles/index'

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
    contentCollections(),
    process.env.SENTRY_AUTH_TOKEN
      ? sentryVitePlugin({
          disable: process.env.NODE_ENV !== 'production',
          authToken: process.env.SENTRY_AUTH_TOKEN,
          org: process.env.SENTRY_ORG,
          project: process.env.SENTRY_PROJECT,
          release: { inject: false },
        })
      : null,
  ],
  server: {
    port: 8080,
  },
  build: {
    target: 'ES2022',
    sourcemap: true,
  },
  ssr: {
    noExternal: [
      '@privy-io/react-auth',
      '@privy-io/wagmi',
      '@content-collections/mdx',
    ],
  },
})
