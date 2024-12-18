import { configDefaults, defineConfig, type UserConfig } from 'vitest/config'

const config = defineConfig({
  test: {
    ...configDefaults,
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
  },
}) as UserConfig

export default config
