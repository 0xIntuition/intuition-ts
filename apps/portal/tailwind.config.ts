import { themePreset } from '@intuition-ts/1ui'
import type { Config } from 'tailwindcss'


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
