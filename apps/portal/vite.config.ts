import { vitePlugin as remix } from '@remix-run/dev'
import { installGlobals } from '@remix-run/node'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { flatRoutes } from 'remix-flat-routes'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
// TODO: Update this once we figure our the TS issue that vite is throwing
// import { themePreset } from '@0xintuition/1ui'
import { themePreset } from '../../packages/1ui/src/styles/index'
import { expressDevServer } from 'remix-express-dev-server'
import envOnly from 'vite-env-only'

installGlobals({ nativeFetch: true })

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss(themePreset), autoprefixer],
    },
  },
  plugins: [
    expressDevServer(),
    envOnly(),
    remix({
      future: { unstable_singleFetch: true },
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
    port: 3000,
  },
  build: {
    target: 'ES2022',
  },
})
