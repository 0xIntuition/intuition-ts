import themePreset from '@0xintuition/1ui/src/styles/theme-preset'

import type { Config } from 'tailwindcss'

const config = {
  darkMode: ['class'],
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/1ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  presets: [themePreset],
  theme: {
    extend: {},
  },
} satisfies Config

export default config
