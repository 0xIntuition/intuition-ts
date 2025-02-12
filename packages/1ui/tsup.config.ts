import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: false,
  splitting: false,
  sourcemap: true,
  clean: true,
  outDir: 'dist',
  external: ['react', 'react-dom', 'react/jsx-runtime', '@radix-ui/*'],
  injectStyle: true,
  treeshake: true,
  platform: 'browser',
  env: {
    NODE_ENV: 'production',
  },
})
