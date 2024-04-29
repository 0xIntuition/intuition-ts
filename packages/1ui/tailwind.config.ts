// import type { Config } from 'tailwindcss';
// import { themePreset } from './styles';

import { themePreset } from './styles';

// // const config = {
// //   presets: [themePreset],
// // } satisfies Config;

// // export default config;

// module.exports = {
//   presets: [themePreset],
// };

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [themePreset],
  content: ['./components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
