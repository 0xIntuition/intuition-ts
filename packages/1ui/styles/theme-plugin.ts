import defaultTheme from 'tailwindcss/defaultTheme.js';
import plugin from 'tailwindcss/plugin';

import { themes } from './themes';
import { hexToHSL } from './utils';

export const themePlugin = plugin(
  // 1. Add css variable definitions to the base layer
  function ({ addBase, addUtilities }) {
    addBase({
      ':root': {
        '--background': themes.light.background,
        '--foreground': themes.light.foreground,
        '--card': themes.light.card,
        '--card-foreground': themes.light.cardForeground,
        '--popover': themes.light.popover,
        '--popover-foreground': themes.light.popoverForeground,
        '--primary': hexToHSL(themes.light.primary.DEFAULT),
        '--primary-foreground': themes.light.primaryForeground,
        '--secondary': themes.light.secondary,
        '--secondary-foreground': themes.light.secondaryForeground,
        '--muted': themes.light.muted,
        '--muted-foreground': themes.light.mutedForeground,
        '--accent': themes.light.accent,
        '--accent-foreground': themes.light.accentForeground,
        '--destructive': themes.light.destructive,
        '--destructive-foreground': themes.light.destructiveForeground,
        '--border': themes.light.border,
        '--input': themes.light.input,
        '--ring': themes.light.ring,
        '--radius': themes.light.radius,
        // primary
        '--primary-50': hexToHSL(themes.light.primary[50]),
        '--primary-100': hexToHSL(themes.light.primary[100]),
        '--primary-200': hexToHSL(themes.light.primary[200]),
        '--primary-300': hexToHSL(themes.light.primary[300]),
        '--primary-400': hexToHSL(themes.light.primary[400]),
        '--primary-500': hexToHSL(themes.light.primary[500]),
        '--primary-600': hexToHSL(themes.light.primary[600]),
        '--primary-700': hexToHSL(themes.light.primary[700]),
        '--primary-800': hexToHSL(themes.light.primary[800]),
        '--primary-900': hexToHSL(themes.light.primary[900]),
        '--primary-950': hexToHSL(themes.light.primary[950]),
      },
    });
    Object.entries(themes).forEach(([key, value]) => {
      addBase({
        [`[data-theme="${key}"]`]: {
          '--background': value.background,
          '--foreground': value.foreground,
          '--card': value.card,
          '--card-foreground': value.cardForeground,
          '--popover': value.popover,
          '--popover-foreground': value.popoverForeground,
          '--primary': hexToHSL(value.primary.DEFAULT),
          '--primary-foreground': value.primaryForeground,
          '--secondary': value.secondary,
          '--secondary-foreground': value.secondaryForeground,
          '--muted': value.muted,
          '--muted-foreground': value.mutedForeground,
          '--accent': value.accent,
          '--accent-foreground': value.accentForeground,
          '--destructive': value.destructive,
          '--destructive-foreground': value.destructiveForeground,
          '--border': value.border,
          '--input': value.input,
          '--ring': value.ring,
          '--radius': value.radius,
          // primary
          '--primary-50': hexToHSL(value.primary[50]),
          '--primary-100': hexToHSL(value.primary[100]),
          '--primary-200': hexToHSL(value.primary[200]),
          '--primary-300': hexToHSL(value.primary[300]),
          '--primary-400': hexToHSL(value.primary[400]),
          '--primary-500': hexToHSL(value.primary[500]),
          '--primary-600': hexToHSL(value.primary[600]),
          '--primary-700': hexToHSL(value.primary[700]),
          '--primary-800': hexToHSL(value.primary[800]),
          '--primary-900': hexToHSL(value.primary[900]),
          '--primary-950': hexToHSL(value.primary[950]),
        },
      });
    });
    addBase({
      '*': {
        '@apply border-border': {},
      },
      body: {
        '@apply bg-background text-foreground': {},
        'font-feature-settings': '"rlig" 1, "calt" 1',
      },
    });

    const newUtilities = {
      '.border-border': {
        border: '1px solid var(--border-color)',
        '.bg-background': {
          backgroundColor: 'var(--background)',
        },
      },
    };

    addUtilities(newUtilities);
  },

  // 2. Extend the tailwind theme with 'themable' utilities
  {
    theme: {
      container: {
        center: true,
        padding: '2rem',
        screens: {
          '2xl': '1024px',
        },
      },
      extend: {
        fontFamily: {
          sans: ['Geist', ...defaultTheme.fontFamily.sans],
        },
        colors: {
          border: 'hsl(var(--border))',
          input: 'hsl(var(--input))',
          ring: 'hsl(var(--ring))',
          background: 'hsl(var(--background))',
          foreground: 'hsl(var(--foreground))',
          primary: {
            DEFAULT: 'hsl(var(--primary))',
            foreground: 'hsl(var(--primary-foreground))',
            50: 'hsl(var(--primary-50))',
            100: 'hsl(var(--primary-100))',
            200: 'hsl(var(--primary-200))',
            300: 'hsl(var(--primary-300))',
            400: 'hsl(var(--primary-400))',
            500: 'hsl(var(--primary-500))',
            600: 'hsl(var(--primary-600))',
            700: 'hsl(var(--primary-700))',
            800: 'hsl(var(--primary-800))',
            900: 'hsl(var(--primary-900))',
            950: 'hsl(var(--primary-950))',
          },
          destructive: {
            DEFAULT: 'hsl(var(--destructive))',
            foreground: 'hsl(var(--destructive-foreground))',
          },
          muted: {
            DEFAULT: 'hsl(var(--muted))',
            foreground: 'hsl(var(--muted-foreground))',
          },
          accent: {
            DEFAULT: 'hsl(var(--accent))',
            foreground: 'hsl(var(--accent-foreground))',
          },
          popover: {
            DEFAULT: 'hsl(var(--popover))',
            foreground: 'hsl(var(--popover-foreground))',
          },
          card: {
            DEFAULT: 'hsl(var(--card))',
            foreground: 'hsl(var(--card-foreground))',
          },
        },
        borderRadius: {
          lg: 'var(--radius)',
          md: 'calc(var(--radius) - 2px)',
          sm: 'calc(var(--radius) - 4px)',
        },
        keyframes: {
          'accordion-down': {
            from: { height: '0' },
            to: { height: 'var(--radix-accordion-content-height)' },
          },
          'accordion-up': {
            from: { height: 'var(--radix-accordion-content-height)' },
            to: { height: '0' },
          },
        },
        animation: {
          'accordion-down': 'accordion-down 0.2s ease-out',
          'accordion-up': 'accordion-up 0.2s ease-out',
        },
        boxShadow: {
          'sm-subtle':
            '0px 5px 5px 0px rgba(0, 0, 0, 0.05), 0px 2px 2px 0px rgba(0, 0, 0, 0.03), 0px 1px 0px 0px rgba(0, 0, 0, 0.03)',
          'md-subtle':
            '0px 8px 8px 0px rgba(0, 0, 0, 0.05), 0px 4px 4px 0px rgba(0, 0, 0, 0.05), 0px 1px 0px 0px rgba(0, 0, 0, 0.03)',
          'lg-subtle':
            '0px 10px 10px 0px rgba(0, 0, 0, 0.05), 0px 6px 6px 0px rgba(0, 0, 0, 0.05), 0px 1px 0px 0px rgba(0, 0, 0, 0.03)',
          'xl-subtle':
            '0px 12px 12px 0px rgba(0, 0, 0, 0.06), 0px 8px 8px 0px rgba(0, 0, 0, 0.05), 0px 1px 0px 0px rgba(0, 0, 0, 0.03)',
          sm: '0px 10px 10px 0px rgba(0, 0, 0, 0.10), 0px 4px 4px 0px rgba(0, 0, 0, 0.05), 0px 1px 0px 0px rgba(0, 0, 0, 0.05)',
          md: '0px 15px 30px 0px rgba(0, 0, 0, 0.15), 0px 5px 10px 0px rgba(0, 0, 0, 0.10), 0px 2px 4px 0px rgba(0, 0, 0, 0.10)',
          lg: '0px 15px 30px 0px rgba(0, 0, 0, 0.15), 0px 10px 20px 0px rgba(0, 0, 0, 0.10), 0px 3px 6px 0px rgba(0, 0, 0, 0.10)',
          xl: '0px 20px 40px 0px rgba(0, 0, 0, 0.15), 0px 15px 30px 0px rgba(0, 0, 0, 0.10), 0px 5px 10px 0px rgba(0, 0, 0, 0.10)',
          'sm-strong':
            '0px 10px 10px 0px rgba(0, 0, 0, 0.15), 0px 4px 4px 0px rgba(0, 0, 0, 0.10), 0px 1px 0px 0px rgba(0, 0, 0, 0.05)',
          'md-strong':
            '0px 10px 20px 0px rgba(0, 0, 0, 0.20), 0px 5px 10px 0px rgba(0, 0, 0, 0.10), 0px 2px 4px 0px rgba(0, 0, 0, 0.10)',
          'lg-strong':
            '0px 15px 30px 0px rgba(0, 0, 0, 0.20), 0px 10px 20px 0px rgba(0, 0, 0, 0.15), 0px 3px 6px 0px rgba(0, 0, 0, 0.10)',
          'xl-strong':
            '0px 20px 40px 0px rgba(0, 0, 0, 0.25), 0px 15px 30px 0px rgba(0, 0, 0, 0.15), 0px 5px 10px 0px rgba(0, 0, 0, 0.05)',
        },
      },
    },
  }
);
