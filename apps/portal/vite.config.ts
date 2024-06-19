import { vitePlugin as remix } from '@remix-run/dev'
import { installGlobals } from '@remix-run/node'
import autoprefixer from 'autoprefixer'
import { expressDevServer } from 'remix-express-dev-server'
import { flatRoutes } from 'remix-flat-routes'
import tailwindcss from 'tailwindcss'
import { defineConfig } from 'vite'
import envOnly from 'vite-env-only'
import tsconfigPaths from 'vite-tsconfig-paths'

// TODO: Update this once we figure our the TS issue that vite is throwing
// import { themePreset } from '@0xintuition/1ui'
import { themePreset } from '../../packages/1ui/src/styles/index'

installGlobals({ nativeFetch: true })

export default defineConfig({
  // optimizeDeps: {
  //   include: ['@0xintuition/1ui', '@0xintuition/api'],
  // },
  css: {
    postcss: {
      plugins: [tailwindcss(themePreset), autoprefixer],
    },
  },
  plugins: [
    expressDevServer(),
    envOnly(),
    remix({
      buildDirectory: '../../dist/apps/portal/build',
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
  ssr: {
    noExternal: [
      '@privy-io/react-auth',
      '@privy-io/wagmi',
      '@privy-io/server-auth',
    ],
  },
})
