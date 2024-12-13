/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../../node_modules/.vite/apps/browser-extension/browser-extension',

  plugins: [react()],

  build: {
    lib: {
      entry: resolve(__dirname, 'src/content/index.ts'),
      formats: ['iife'],
      name: 'contentScript',
      fileName: () => 'content.js',
    },
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        extend: true,
      },
    },
  },

  define: {
    'process.env.VITE_OPENAI_API_KEY': JSON.stringify(process.env.VITE_OPENAI_API_KEY),
    'process.env.VITE_JINA_API_KEY': JSON.stringify(process.env.VITE_JINA_API_KEY),
  },

  optimizeDeps: {
    include: ['react', 'react-dom', 'webextension-polyfill'],
  },
});
