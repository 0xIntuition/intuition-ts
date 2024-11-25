/** @type {import('tailwindcss').Config} */
module.exports = {
  optimizeDeps: {
    include: ['mini-svg-data-uri'],
  },
  presets: [],
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
