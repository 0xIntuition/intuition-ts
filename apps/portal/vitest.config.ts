import {
  configDefaults,
  defineConfig,
  mergeConfig,
  type UserConfig,
} from 'vitest/config'
import viteConfig from './vite.config'

const config = mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      ...configDefaults,
      globals: true,
      environment: 'jsdom',
      setupFiles: './vitest.setup.ts',
    },
  }) as UserConfig,
)

export default config
