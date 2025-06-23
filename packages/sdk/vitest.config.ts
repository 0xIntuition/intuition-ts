import { defineConfig } from 'vitest/config'

// https://vitest.dev/config/
export default defineConfig({
  test: {
    globalSetup: ['./tests/helpers/globalSetup.ts'],
    setupFiles: ['./tests/helpers/setup.ts'],
  },
})
