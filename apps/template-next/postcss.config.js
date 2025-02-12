const path = require('path')

/** @type {import('postcss').Config} */
module.exports = {
  plugins: {
    'tailwindcss/nesting': {},
    tailwindcss: {
      config: path.resolve(__dirname, './tailwind.config.ts'),
    },
    autoprefixer: {},
  },
}
