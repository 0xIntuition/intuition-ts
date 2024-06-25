import defaultTheme from 'tailwindcss/defaultTheme.js'
import plugin from 'tailwindcss/plugin'

import { themes } from './themes'
import { colorMix } from './utils'

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
        '--success-foreground': themes.light.successForeground,
        '--warning': themes.light.warning,
        '--warning-foreground': themes.light.warningForeground,
        '--for': themes.light.for,
        '--for-foreground': themes.light.forForeground,
        '--against': themes.light.against,
        '--against-foreground': themes.light.againstForeground,
        '--social': themes.light.social,
        '--social-foreground': themes.light.socialForeground,
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
          '--success-foreground': value.successForeground,
          '--warning': value.warning,
          '--warning-foreground': value.warningForeground,
          '--for': value.for,
          '--for-foreground': value.forForeground,
          '--against': value.against,
          '--against-foreground': value.againstForeground,
          '--social': value.social,
          '--social-foreground': value.socialForeground,
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
      body: {
        '@apply bg-background text-foreground': {},
        'font-feature-settings': '"rlig" 1, "calt" 1',
      },
    })

    addUtilities({
      // Gradient utility classes
      '.primary-gradient-subtle': {
        background: `linear-gradient(${colorMix('primary', 0.1)}, ${colorMix('primary', 0.05)})`,
      },
      '.primary-gradient': {
        background: `linear-gradient(${colorMix('primary', 0.4)}, ${colorMix('primary', 0.2)})`,
      },
      '.primary-gradient-strong': {
        background: `linear-gradient(${colorMix('primary', 0.8)}, ${colorMix('primary', 0.5)})`,
      },
    })
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
          xs: ['0.625rem', '1rem'], // small
          sm: ['0.75rem', '1.125rem'], // caption & footnote
          base: ['0.875rem', '1.25rem'], // body
          lg: ['1rem', '1.875rem'], // bodyLarge
          xl: ['1.25rem', '1.875rem'], // headline
          '2xl': '1.5rem', // heading5
          '3xl': '1.875rem', // heading4
          '4xl': '2.5rem', // heading3
          '5xl': '3.125rem', // heading2
          '6xl': '3.75rem', // heading1
        },
        colors: {
          border: colorMix('border'),
          input: colorMix('input'),
          ring: colorMix('ring'),
          background: colorMix('background'),
          foreground: colorMix('foreground'),
          primary: {
            DEFAULT: colorMix('primary'),
            foreground: colorMix('primary-foreground'),
            50: colorMix('primary-50'),
            100: colorMix('primary-100'),
            200: colorMix('primary-200'),
            300: colorMix('primary-300'),
            400: colorMix('primary-400'),
            500: colorMix('primary-500'),
            600: colorMix('primary-600'),
            700: colorMix('primary-700'),
            800: colorMix('primary-800'),
            900: colorMix('primary-900'),
            950: colorMix('primary-950'),
          },
          secondary: {
            DEFAULT: colorMix('secondary'),
            foreground: colorMix('secondary-foreground'),
          },
          destructive: {
            DEFAULT: colorMix('destructive'),
            foreground: colorMix('destructive-foreground'),
          },
          muted: {
            DEFAULT: colorMix('muted'),
            foreground: colorMix('muted-foreground'),
          },
          accent: {
            DEFAULT: colorMix('accent'),
            foreground: colorMix('accent-foreground'),
          },
          warning: {
            DEFAULT: colorMix('warning'),
            foreground: colorMix('warning-foreground'),
          },
          success: {
            DEFAULT: colorMix('success'),
            foreground: colorMix('success-foreground'),
          },
          popover: {
            DEFAULT: colorMix('popover'),
            foreground: colorMix('popover-foreground'),
          },
          card: {
            DEFAULT: colorMix('card'),
            foreground: colorMix('card-foreground'),
          },
          for: {
            DEFAULT: colorMix('for'),
            foreground: colorMix('for-foreground'),
          },
          against: {
            DEFAULT: colorMix('against'),
            foreground: colorMix('against-foreground'),
          },
          social: {
            DEFAULT: colorMix('social'),
            foreground: colorMix('social-foreground'),
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
