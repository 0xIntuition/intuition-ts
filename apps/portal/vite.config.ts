import { vitePlugin as remix } from '@remix-run/dev'
import { installGlobals } from '@remix-run/node'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { flatRoutes } from 'remix-flat-routes'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
// import { themePreset } from '@intuition-ts/1ui'
import { themePreset } from '../../packages/1ui/src/styles/index'

installGlobals()

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss(themePreset), autoprefixer],
    },
  },
  plugins: [
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
    port: 3000,
  },
  build: {
    target: 'ES2022',
  },
})
