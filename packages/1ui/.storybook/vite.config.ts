import { defineConfig } from 'vite';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import themePreset from '../styles/theme-preset'; // adjust the path as necessary

export default defineConfig({
  css: {
    postcss: {
      plugins: [
        tailwindcss(themePreset), // Use your Tailwind preset
        autoprefixer,
      ],
    },
  },
});
