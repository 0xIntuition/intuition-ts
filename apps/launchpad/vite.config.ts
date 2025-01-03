import { vitePlugin as remix } from '@remix-run/dev'
import { installGlobals } from '@remix-run/node'
import autoprefixer from 'autoprefixer'
import { flatRoutes } from 'remix-flat-routes'
import tailwindcss from 'tailwindcss'
import { defineConfig } from 'vite'
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
  optimizeDeps: {
    include: [
      'cytoscape',
      'cytoscape-cola',
      'cytoscape-fcose',
      'cytoscape-popper',
      'react-cytoscapejs',
    ],
    exclude: ['@0xintuition/1ui'],
  },
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
    rollupOptions: {
      external: [],
      output: {
        manualChunks: {
          cytoscape: ['cytoscape'],
          'cytoscape-ext': [
            'cytoscape-cola',
            'cytoscape-fcose',
            'cytoscape-popper',
          ],
          vendor: ['react', 'react-dom', 'react-cytoscapejs'],
        },
      },
    },
    modulePreload: {
      polyfill: true,
    },
  },
  resolve: {
    dedupe: ['react', 'react-dom'],
    mainFields: ['browser', 'module', 'main'],
  },
  ssr: {
    noExternal: [
      'react-cytoscapejs',
      'cytoscape',
      'cytoscape-cola',
      'cytoscape-fcose',
      'cytoscape-popper',
    ],
    optimizeDeps: {
      disabled: false,
    },
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  },
})
