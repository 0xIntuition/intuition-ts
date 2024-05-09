import containerQueries from '@tailwindcss/container-queries'
import type { Config } from 'tailwindcss'
import animatePlugin from 'tailwindcss-animate'

import { themePlugin } from './theme-plugin'

export default {
  darkMode: ['class'],
  content: [
    './components/**/*.{ts,tsx}', // Include all TypeScript and TSX files in components
    './components/**/*.{ts,tsx}', // Include all TypeScript and TSX files in the ui directory
    './**/*.tsx', // Include all TSX files in the entire package
    './index.ts', // Include the index file if it's used for exports
  ],
  plugins: [themePlugin, animatePlugin, containerQueries],
} satisfies Config
