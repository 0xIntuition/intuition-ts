import type { Config } from 'tailwindcss'

import { themePreset } from '@intuition-ts/1design'

const config = {
  presets: [themePreset],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
} satisfies Config

export default config
