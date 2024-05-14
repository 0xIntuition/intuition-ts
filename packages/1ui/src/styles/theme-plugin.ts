import defaultTheme from 'tailwindcss/defaultTheme.js'
import plugin from 'tailwindcss/plugin'

import { themes } from './themes'

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
        '--primary': themes.light.primary.DEFAULT,
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
        '--success': themes.light.success,
        '--successForeground': themes.light.successForeground,
        '--warning': themes.light.warning,
        '--warningForeground': themes.light.warningForeground,
        // primary
        '--primary-50': themes.light.primary[50],
        '--primary-100': themes.light.primary[100],
        '--primary-200': themes.light.primary[200],
        '--primary-300': themes.light.primary[300],
        '--primary-400': themes.light.primary[400],
        '--primary-500': themes.light.primary[500],
        '--primary-600': themes.light.primary[600],
        '--primary-700': themes.light.primary[700],
        '--primary-800': themes.light.primary[800],
        '--primary-900': themes.light.primary[900],
        '--primary-950': themes.light.primary[950],
      },
    })
    Object.entries(themes).forEach(([key, value]) => {
      addBase({
        [`[data-theme="${key}"]`]: {
          '--background': value.background,
          '--foreground': value.foreground,
          '--card': value.card,
          '--card-foreground': value.cardForeground,
          '--popover': value.popover,
          '--popover-foreground': value.popoverForeground,
          '--primary': value.primary.DEFAULT,
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
          '--success': value.success,
          '--successForeground': value.successForeground,
          '--warning': value.warning,
          '--warningForeground': value.warningForeground,
          // primary
          '--primary-50': value.primary[50],
          '--primary-100': value.primary[100],
          '--primary-200': value.primary[200],
          '--primary-300': value.primary[300],
          '--primary-400': value.primary[400],
          '--primary-500': value.primary[500],
          '--primary-600': value.primary[600],
          '--primary-700': value.primary[700],
          '--primary-800': value.primary[800],
          '--primary-900': value.primary[900],
          '--primary-950': value.primary[950],
        },
      })
    })
    addBase({
      '*': {
        '@apply border-border': {},
      },
      body: {
        '@apply bg-background text-foreground': {},
        'font-feature-settings': '"rlig" 1, "calt" 1',
      },
    })

    const newUtilities = {
      '.border-border': {
        border: '1px solid var(--border-color)',
        '.bg-background': {
          backgroundColor: 'var(--background)',
        },
      },
    }

    addUtilities(newUtilities)
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
        fontSize: {
          xs: ['0.625rem', ''],
          sm: ['0.75rem', ''],
          base: ['0.875rem', ''],
          lg: ['1rem', ''],
          xl: ['1.25rem', ''],
          '2xl': ['1.5rem', ''],
          '3xl': ['1.875rem', ''],
          '4xl': ['2.5rem', ''],
          '5xl': ['3.125rem', ''],
          '6xl': ['3.75rem', ''],
        },
        colors: {
          border:
            'color-mix(in srgb, var(--border) calc(<alpha-value> * 100%), transparent)',
          input:
            'color-mix(in srgb, var(--input) calc(<alpha-value> * 100%), transparent)',
          ring: 'color-mix(in srgb, var(--ring) calc(<alpha-value> * 100%), transparent)',
          background:
            'color-mix(in srgb, var(--background) calc(<alpha-value> * 100%), transparent)',
          foreground:
            'color-mix(in srgb, var(--foreground) calc(<alpha-value> * 100%), transparent)',
          primary: {
            DEFAULT:
              'color-mix(in srgb, var(--primary) calc(<alpha-value> * 100%), transparent)',
            foreground:
              'color-mix(in srgb, var(--primary-foreground) calc(<alpha-value> * 100%), transparent)',
            50: 'color-mix(in srgb, var(--primary-50) calc(<alpha-value> * 100%), transparent)',
            100: 'color-mix(in srgb, var(--primary-100) calc(<alpha-value> * 100%), transparent)',
            200: 'color-mix(in srgb, var(--primary-200) calc(<alpha-value> * 100%), transparent)',
            300: 'color-mix(in srgb, var(--primary-300) calc(<alpha-value> * 100%), transparent)',
            400: 'color-mix(in srgb, var(--primary-400) calc(<alpha-value> * 100%), transparent)',
            500: 'color-mix(in srgb, var(--primary-500) calc(<alpha-value> * 100%), transparent)',
            600: 'color-mix(in srgb, var(--primary-600) calc(<alpha-value> * 100%), transparent)',
            700: 'color-mix(in srgb, var(--primary-700) calc(<alpha-value> * 100%), transparent)',
            800: 'color-mix(in srgb, var(--primary-800) calc(<alpha-value> * 100%), transparent)',
            900: 'color-mix(in srgb, var(--primary-900) calc(<alpha-value> * 100%), transparent)',
            950: 'color-mix(in srgb, var(--primary-950) calc(<alpha-value> * 100%), transparent)',
          },
          destructive: {
            DEFAULT:
              'color-mix(in srgb, var(--destructive) calc(<alpha-value> * 100%), transparent)',
            foreground:
              'color-mix(in srgb, var(--destructive-foreground) calc(<alpha-value> * 100%), transparent)',
          },
          muted: {
            DEFAULT:
              'color-mix(in srgb, var(--muted) calc(<alpha-value> * 100%), transparent)',
            foreground:
              'color-mix(in srgb, var(--muted-foreground) calc(<alpha-value> * 100%), transparent)',
          },
          accent: {
            DEFAULT:
              'color-mix(in srgb, var(--accent)) calc(<alpha-value> * 100%), transparent)',
            foreground:
              'color-mix(in srgb, var(--accent-foreground) calc(<alpha-value> * 100%), transparent)',
          },
          popover: {
            DEFAULT:
              'color-mix(in srgb, var(--popover) calc(<alpha-value> * 100%), transparent)',
            foreground:
              'color-mix(in srgb, var(--popover-foreground) calc(<alpha-value> * 100%), transparent)',
          },
          card: {
            DEFAULT:
              'color-mix(in srgb, var(--card) calc(<alpha-value> * 100%), transparent)',
            foreground:
              'color-mix(in srgb, var(--card-foreground) calc(<alpha-value> * 100%), transparent)',
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
  },
)
