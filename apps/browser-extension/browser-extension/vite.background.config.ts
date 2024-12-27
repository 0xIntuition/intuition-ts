import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../../node_modules/.vite/apps/browser-extension/browser-extension',

  build: {
    lib: {
      entry: resolve(__dirname, 'src/background/index.ts'),
      formats: ['iife'],
      name: 'backgroundScript',
      fileName: () => 'background.js',
    },
    outDir: 'dist',
    emptyOutDir: false,
    rollupOptions: {
      external: ['webextension-polyfill'],
      output: {
        globals: {
          'webextension-polyfill': 'browser',
        },
        extend: true,
      },
    },
  },

  define: {
    'process.env.VITE_OPENAI_API_KEY': JSON.stringify(process.env.VITE_OPENAI_API_KEY),
    'process.env.VITE_JINA_API_KEY': JSON.stringify(process.env.VITE_JINA_API_KEY),
  },
});
