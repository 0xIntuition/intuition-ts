import { vitePlugin as remix } from '@remix-run/dev'
import { installGlobals } from '@remix-run/node'
import autoprefixer from 'autoprefixer'
import { flatRoutes } from 'remix-flat-routes'
import tailwindcss from 'tailwindcss'
import { defineConfig } from 'vite'
// import envOnly from 'vite-env-only'
import tsconfigPaths from 'vite-tsconfig-paths'

import { themePreset } from '../../packages/1ui/src/styles/index'

installGlobals()

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss(themePreset), autoprefixer],
    },
  },
  plugins: [
    // envOnly(),
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
    sourcemap: true,
    cssMinify: process.env.NODE_ENV === 'production',
    assetsInlineLimit: (source: string) => {
      if (source.endsWith('sprite.svg')) {
        return false
      }
    },
  },
  // ssr: {
  //   noExternal: ['@privy-io/react-auth', '@privy-io/wagmi'],
  // },
})

// this is the NEW recommended config -- using portal's for now to keep it aligned but we can gradually update to the new features

// import { vitePlugin as remix } from "@remix-run/dev";
// import { defineConfig } from "vite";
// import tsconfigPaths from "vite-tsconfig-paths";

// declare module "@remix-run/node" {
//   interface Future {
//     v3_singleFetch: true;
//   }
// }

// export default defineConfig({
//   plugins: [
//     remix({
//       future: {
//         v3_fetcherPersist: true,
//         v3_relativeSplatPath: true,
//         v3_throwAbortReason: true,
//         v3_singleFetch: true,
//         v3_lazyRouteDiscovery: true,
//       },
//     }),
//     tsconfigPaths(),
//   ],
// });
