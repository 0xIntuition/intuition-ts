import tsconfigPaths from 'vite-tsconfig-paths'
import {
  configDefaults,
  defineConfig,
  mergeConfig,
  type UserConfig,
} from 'vitest/config'

import viteConfig from './.storybook/vite.config'

const config = mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      ...configDefaults,
      globals: true,
      environment: 'jsdom',
      setupFiles: './vitest.setup.ts',
    },
    plugins: [tsconfigPaths()],
  }) as UserConfig,
)

export default config
