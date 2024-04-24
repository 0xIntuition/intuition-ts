import containerQueries from '@tailwindcss/container-queries'
import type { Config } from 'tailwindcss'
import animatePlugin from 'tailwindcss-animate'


import { themePlugin } from './theme-plugin'

export default {
  darkMode: ['class'],
  content: [],
  plugins: [themePlugin, animatePlugin, containerQueries],
} satisfies Config
