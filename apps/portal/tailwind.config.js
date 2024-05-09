// import { themePreset } from '@intuition-ts/1ui'

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [],
  // This breaks the build
  // presets: [themePreset],
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
