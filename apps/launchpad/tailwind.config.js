/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('@0xintuition/1ui/tailwind.config')],
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    '../../packages/1ui/src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
