// vite.config.ts
import { vitePlugin as remix } from 'file:///Users/metasudo/workspace/intution/v2/intuition-ts/node_modules/.pnpm/@remix-run+dev@2.9.2_@remix-run+react@2.9.2_react-dom@18.3.1_react@18.3.1__react@18.3.1_types_zlvjlmgfjneaosybselae3jg7u/node_modules/@remix-run/dev/dist/index.js'
import { installGlobals } from 'file:///Users/metasudo/workspace/intution/v2/intuition-ts/node_modules/.pnpm/@remix-run+node@2.9.2_typescript@5.4.5/node_modules/@remix-run/node/dist/index.js'
// ../../packages/1ui/src/styles/theme-preset.ts
import containerQueries from 'file:///Users/metasudo/workspace/intution/v2/intuition-ts/node_modules/.pnpm/@tailwindcss+container-queries@0.1.1_tailwindcss@3.4.4_ts-node@10.9.1_@swc+core@1.3.107_@swc+_27arvc6rjqgtg6tm4hjt6ee4hi/node_modules/@tailwindcss/container-queries/dist/index.js'
import autoprefixer from 'file:///Users/metasudo/workspace/intution/v2/intuition-ts/node_modules/.pnpm/autoprefixer@10.4.19_postcss@8.4.38/node_modules/autoprefixer/lib/autoprefixer.js'
// ../../packages/1ui/src/styles/utils.ts
import { clsx } from 'file:///Users/metasudo/workspace/intution/v2/intuition-ts/node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs'
import { flatRoutes } from 'file:///Users/metasudo/workspace/intution/v2/intuition-ts/node_modules/.pnpm/remix-flat-routes@0.6.5_@remix-run+dev@2.9.2_@remix-run+react@2.9.2_react-dom@18.3.1_react@18_bj76rfhdo4pevjn7wrw5b3z36i/node_modules/remix-flat-routes/dist/index.js'
import { twMerge } from 'file:///Users/metasudo/workspace/intution/v2/intuition-ts/node_modules/.pnpm/tailwind-merge@2.3.0/node_modules/tailwind-merge/dist/bundle-mjs.mjs'
import animatePlugin from 'file:///Users/metasudo/workspace/intution/v2/intuition-ts/node_modules/.pnpm/tailwindcss-animate@1.0.7_tailwindcss@3.4.4_ts-node@10.9.1_@swc+core@1.3.107_@swc+helpers@0.5_hoimnv5ixu2c27jo6lizwkhbgm/node_modules/tailwindcss-animate/index.js'
// ../../packages/1ui/src/styles/theme-plugin.ts
import defaultTheme from 'file:///Users/metasudo/workspace/intution/v2/intuition-ts/node_modules/.pnpm/tailwindcss@3.4.4_ts-node@10.9.1_@swc+core@1.3.107_@swc+helpers@0.5.15__@types+node@20.14.2_typescript@5.4.5_/node_modules/tailwindcss/defaultTheme.js'
import tailwindcss from 'file:///Users/metasudo/workspace/intution/v2/intuition-ts/node_modules/.pnpm/tailwindcss@3.4.4_ts-node@10.9.1_@swc+core@1.3.107_@swc+helpers@0.5.15__@types+node@20.14.2_typescript@5.4.5_/node_modules/tailwindcss/lib/index.js'
import plugin from 'file:///Users/metasudo/workspace/intution/v2/intuition-ts/node_modules/.pnpm/tailwindcss@3.4.4_ts-node@10.9.1_@swc+core@1.3.107_@swc+helpers@0.5.15__@types+node@20.14.2_typescript@5.4.5_/node_modules/tailwindcss/plugin.js'
import envOnly from 'file:///Users/metasudo/workspace/intution/v2/intuition-ts/node_modules/.pnpm/vite-env-only@2.4.1_vite@5.2.13_@types+node@20.14.2_terser@5.31.1_/node_modules/vite-env-only/dist/index.js'
import tsconfigPaths from 'file:///Users/metasudo/workspace/intution/v2/intuition-ts/node_modules/.pnpm/vite-tsconfig-paths@4.3.2_typescript@5.4.5_vite@5.2.13_@types+node@20.14.2_terser@5.31.1_/node_modules/vite-tsconfig-paths/dist/index.mjs'
import { defineConfig } from 'file:///Users/metasudo/workspace/intution/v2/intuition-ts/node_modules/.pnpm/vite@5.2.13_@types+node@20.14.2_terser@5.31.1/node_modules/vite/dist/node/index.js'

// ../../packages/1ui/src/styles/palette.ts
var black = '#000000'
var white = '#FFFFFF'
var palette = {
  black: {
    base: black,
    a90: `rgba(${black}, 90%)`,
    a80: `rgba(${black}, 80%)`,
    a70: `rgba(${black}, 70%)`,
    a60: `rgba(${black}, 60%)`,
    a50: `rgba(${black}, 50%)`,
    a40: `rgba(${black}, 40%)`,
    a30: `rgba(${black}, 30%)`,
    a20: `rgba(${black}, 20%)`,
    a10: `rgba(${black}, 10%)`,
    a5: `rgba(${black}, 5%)`,
    a3: `rgba(${black}, 3%)`,
  },
  white: {
    base: white,
    a90: `rgba(${white}, 90%)`,
    a80: `rgba(${white}, 80%)`,
    a70: `rgba(${white}, 70%)`,
    a60: `rgba(${white}, 60%)`,
    a50: `rgba(${white}, 50%)`,
    a40: `rgba(${white}, 40%)`,
    a30: `rgba(${white}, 30%)`,
    a20: `rgba(${white}, 20%)`,
    a10: `rgba(${white}, 10%)`,
    a5: `rgba(${white}, 5%)`,
    a3: `rgba(${white}, 3%)`,
  },
  gray: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#E5E5E5',
    300: '#D4D4D4',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0A0A0A',
  },
  red: {
    50: '#FDF3F3',
    100: '#FBE5E5',
    200: '#F9CFCF',
    300: '#F3AEAE',
    400: '#EA807F',
    500: '#DD5352',
    600: '#CA3938',
    700: '#A92D2C',
    800: '#8C2928',
    900: '#752827',
    950: '#3F1010',
  },
  orange: {
    50: '#FFF4E6',
    100: '#FFDEB0',
    200: '#FFCE8A',
    300: '#FFB854',
    400: '#FFAA33',
    500: '#FF9500',
    600: '#E88800',
    700: '#B56A00',
    800: '#8C5200',
    900: '#6B3F00',
    950: '#553200',
  },
  yellow: {
    50: '#FFFAE6',
    100: '#FFEFB0',
    200: '#FFE88A',
    300: '#FFDD54',
    400: '#FFD633',
    500: '#FFCC00',
    600: '#E8BA00',
    700: '#B59100',
    800: '#8C7000',
    900: '#6B5600',
    950: '#5E4B00',
  },
  green: {
    50: '#F1FCF5',
    100: '#DFF9EB',
    200: '#C0F2D7',
    300: '#8FE6B8',
    400: '#57D191',
    500: '#34C578',
    600: '#23955A',
    700: '#1F754A',
    800: '#1D5E40',
    900: '#194D36',
    950: '#092A1D',
  },
  sky: {
    50: '#F2F9FE',
    100: '#E3F1FD',
    200: '#C3E5FA',
    300: '#91D1F8',
    400: '#61BAF3',
    500: '#4AA3E3',
    600: '#3882C2',
    700: '#2C679C',
    800: '#265881',
    900: '#21496B',
    950: '#142E47',
  },
  blue: {
    50: '#E6F2FF',
    100: '#B0D6FF',
    200: '#8AC2FF',
    300: '#54A6FF',
    400: '#3395FF',
    500: '#007AFF',
    600: '#006FE8',
    700: '#0057B5',
    800: '#00438C',
    900: '#00336B',
    950: '#042C5D',
  },
  purple: {
    50: '#F7EEFC',
    100: '#E6C9F5',
    200: '#DAAFF0',
    300: '#C98BE9',
    400: '#BF75E5',
    500: '#AF52DE',
    600: '#9F4BCA',
    700: '#7C3A9E',
    800: '#602D7A',
    900: '#4A225D',
    950: '#3B1B4A',
  },
}

// ../../packages/1ui/src/styles/themes.ts
var radiusValue = '0.5rem'
var themes = {
  light: {
    background: '0 0% 100%',
    foreground: '224 71.4% 4.1%',
    card: '0 0% 100%',
    cardForeground: '224 71.4% 4.1%',
    popover: '0 0% 100%',
    popoverForeground: '224 71.4% 4.1%',
    primary: {
      DEFAULT: '#0052FF',
      50: '#f0f2ff',
      100: '#dde1ff',
      200: '#c0c7ff',
      300: '#94a0ff',
      400: '#576aff',
      500: '#233cff',
      600: '#0420ff',
      700: '#0018d7',
      800: '#0010a6',
      900: '#000b7f',
      950: '#00064c',
    },
    primaryForeground: '224 71.4% 4.1%',
    secondary: '220 14.3% 95.9%',
    secondaryForeground: '220.9 39.3% 11%',
    muted: '220 14.3% 95.9%',
    mutedForeground: '220 8.9% 46.1%',
    accent: '220 14.3% 95.9%',
    accentForeground: '220.9 39.3% 11%',
    destructive: '0 84.2% 60.2%',
    destructiveForeground: '210 20% 98%',
    border: '215 27.9% 16.9%',
    input: '215 27.9% 16.9%',
    ring: '216 12.2% 83.9%',
    radius: radiusValue,
    // custom attributes
    success: palette.green[500],
    successForeground: palette.black.base,
    warning: palette.yellow[600],
    warningForeground: palette.black.base,
    for: palette.blue[500],
    forForeground: palette.white.base,
    against: palette.orange[500],
    againstForeground: palette.black.base,
    social: palette.purple[600],
    socialForeground: palette.black.base,
  },
  dark: {
    background: palette.black.base,
    foreground: palette.white.base,
    card: palette.black.base,
    cardForeground: palette.white.base,
    popover: palette.black.base,
    popoverForeground: palette.white.base,
    primary: {
      DEFAULT: palette.gray[50],
      ...palette.gray,
    },
    primaryForeground: palette.black.base,
    secondary: palette.white.base,
    secondaryForeground: palette.gray[400],
    muted: palette.gray[800],
    mutedForeground: palette.gray[500],
    accent: palette.blue[500],
    accentForeground: palette.white.base,
    destructive: palette.red[500],
    destructiveForeground: palette.white.base,
    border: palette.white.base,
    input: palette.white.base,
    ring: palette.white.base,
    radius: radiusValue,
    // custom attributes
    success: palette.green[500],
    successForeground: palette.black.base,
    warning: palette.yellow[600],
    warningForeground: palette.black.base,
    for: palette.blue[600],
    forForeground: palette.white.base,
    against: palette.orange[600],
    againstForeground: palette.black.base,
    social: palette.purple[600],
    socialForeground: palette.black.base,
  },
}

function colorMix(color, opacity) {
  return `color-mix(in srgb, var(--${color}) calc(${opacity || '<alpha-value>'} * 100%), transparent)`
}
var Theme = /* @__PURE__ */ ((Theme2) => {
  Theme2['DARK'] = 'dark'
  Theme2['LIGHT'] = 'light'
  Theme2['SYSTEM'] = 'system'
  return Theme2
})(Theme || {})
var themesList = Object.values(Theme)

// ../../packages/1ui/src/styles/theme-plugin.ts
var themePlugin = plugin(
  // 1. Add css variable definitions to the base layer
  ({ addBase, addUtilities }) => {
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
      '.theme-border': {
        '@apply border border-border/10': {},
      },
      '.in-out-gradient': {
        '@apply bg-gradient-to-r from-border/5 from-10% via-border/20 via-50% to-border/5 to-90%':
          {},
      },
      '.in-out-gradient-strong': {
        '@apply bg-gradient-to-r from-transparent from-10% via-border/20 via-50% to-transparent to-90%':
          {},
      },
    })
    addUtilities({
      // Gradients
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
      },
      extend: {
        fontFamily: {
          sans: ['Geist', ...defaultTheme.fontFamily.sans],
        },
        borderWidth: {
          DEFAULT: '1px',
          px: '1px',
        },
        fontSize: {
          xs: ['0.625rem', '1rem'],
          // small
          sm: ['0.75rem', '1.125rem'],
          // caption & footnote
          base: ['0.875rem', '1.25rem'],
          // body
          lg: ['1rem', '1.875rem'],
          // bodyLarge
          xl: ['1.25rem', '1.875rem'],
          // headline
          '2xl': '1.5rem',
          // heading5
          '3xl': '1.875rem',
          // heading4
          '4xl': '2.5rem',
          // heading3
          '5xl': '3.125rem',
          // heading2
          '6xl': '3.75rem',
          // heading1
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
          'pulse-slow': 'pulse 1.6s cubic-bezier(0.6, 0, 0.7, 1) infinite',
          'spin-slow': 'spin 3.2s linear infinite',
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

var theme_preset_default = {
  darkMode: ['class'],
  content: [
    './components/**/*.{ts,tsx}',
    // Include all TypeScript and TSX files in components
    './components/**/*.{ts,tsx}',
    // Include all TypeScript and TSX files in the ui directory
    './**/*.tsx',
    // Include all TSX files in the entire package
    './index.ts',
    // Include the index file if it's used for exports
  ],
  plugins: [themePlugin, animatePlugin, containerQueries],
}

// vite.config.ts
installGlobals()
var vite_config_default = defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss(theme_preset_default), autoprefixer],
    },
  },
  plugins: [
    envOnly(),
    remix({
      ignoredRouteFiles: ['**/.*'],
      routes: async (defineRoutes) => {
        return flatRoutes('routes', defineRoutes, {
          ignoredRouteFiles: [
            '.*',
            '**/*.css',
            '**/*.test.{js,jsx,ts,tsx}',
            '**/__*.*',
          ],
        })
      },
    }),
    tsconfigPaths(),
  ],
  server: {
    port: 8080,
  },
  build: {
    target: 'ES2022',
    sourcemap: true,
    cssMinify: process.env.NODE_ENV === 'production',
    assetsInlineLimit: (source) => {
      if (source.endsWith('sprite.svg')) {
        return false
      }
    },
  },
  ssr: {
    noExternal: [
      '@privy-io/react-auth',
      '@privy-io/wagmi',
      'wagmi',
      'mini-svg-data-uri',
      '@walletconnect/jsonrpc-ws-connection',
    ],
  },
})
export { vite_config_default as default }
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiLi4vLi4vcGFja2FnZXMvMXVpL3NyYy9zdHlsZXMvcGFsZXR0ZS50cyIsICIuLi8uLi9wYWNrYWdlcy8xdWkvc3JjL3N0eWxlcy90aGVtZS1wbHVnaW4udHMiLCAiLi4vLi4vcGFja2FnZXMvMXVpL3NyYy9zdHlsZXMvdGhlbWVzLnRzIiwgIi4uLy4uL3BhY2thZ2VzLzF1aS9zcmMvc3R5bGVzL3V0aWxzLnRzIiwgIi4uLy4uL3BhY2thZ2VzLzF1aS9zcmMvc3R5bGVzL3RoZW1lLXByZXNldC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9tZXRhc3Vkby93b3Jrc3BhY2UvaW50dXRpb24vdjIvaW50dWl0aW9uLXRzL2FwcHMvZGF0YS1wb3B1bGF0b3JcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9tZXRhc3Vkby93b3Jrc3BhY2UvaW50dXRpb24vdjIvaW50dWl0aW9uLXRzL2FwcHMvZGF0YS1wb3B1bGF0b3Ivdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL21ldGFzdWRvL3dvcmtzcGFjZS9pbnR1dGlvbi92Mi9pbnR1aXRpb24tdHMvYXBwcy9kYXRhLXBvcHVsYXRvci92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IHZpdGVQbHVnaW4gYXMgcmVtaXggfSBmcm9tICdAcmVtaXgtcnVuL2RldidcbmltcG9ydCB7IGluc3RhbGxHbG9iYWxzIH0gZnJvbSAnQHJlbWl4LXJ1bi9ub2RlJ1xuaW1wb3J0IGF1dG9wcmVmaXhlciBmcm9tICdhdXRvcHJlZml4ZXInXG5pbXBvcnQgeyBmbGF0Um91dGVzIH0gZnJvbSAncmVtaXgtZmxhdC1yb3V0ZXMnXG5pbXBvcnQgdGFpbHdpbmRjc3MgZnJvbSAndGFpbHdpbmRjc3MnXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IGVudk9ubHkgZnJvbSAndml0ZS1lbnYtb25seSdcbmltcG9ydCB0c2NvbmZpZ1BhdGhzIGZyb20gJ3ZpdGUtdHNjb25maWctcGF0aHMnXG5cbi8vIFRPRE86IFVwZGF0ZSB0aGlzIG9uY2Ugd2UgZmlndXJlIG91ciB0aGUgVFMgaXNzdWUgdGhhdCB2aXRlIGlzIHRocm93aW5nXG5cbmltcG9ydCB7IHRoZW1lUHJlc2V0IH0gZnJvbSAnLi4vLi4vcGFja2FnZXMvMXVpL3NyYy9zdHlsZXMnXG5cbmluc3RhbGxHbG9iYWxzKClcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgY3NzOiB7XG4gICAgcG9zdGNzczoge1xuICAgICAgcGx1Z2luczogW3RhaWx3aW5kY3NzKHRoZW1lUHJlc2V0KSwgYXV0b3ByZWZpeGVyXSxcbiAgICB9LFxuICB9LFxuICBwbHVnaW5zOiBbXG4gICAgZW52T25seSgpLFxuICAgIHJlbWl4KHtcbiAgICAgIGlnbm9yZWRSb3V0ZUZpbGVzOiBbJyoqLy4qJ10sXG4gICAgICByb3V0ZXM6IGFzeW5jIChkZWZpbmVSb3V0ZXMpID0+IHtcbiAgICAgICAgcmV0dXJuIGZsYXRSb3V0ZXMoJ3JvdXRlcycsIGRlZmluZVJvdXRlcywge1xuICAgICAgICAgIGlnbm9yZWRSb3V0ZUZpbGVzOiBbXG4gICAgICAgICAgICAnLionLFxuICAgICAgICAgICAgJyoqLyouY3NzJyxcbiAgICAgICAgICAgICcqKi8qLnRlc3Que2pzLGpzeCx0cyx0c3h9JyxcbiAgICAgICAgICAgICcqKi9fXyouKicsXG4gICAgICAgICAgXSxcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgfSksXG4gICAgdHNjb25maWdQYXRocygpLFxuICBdLFxuICBzZXJ2ZXI6IHtcbiAgICBwb3J0OiA4MDgwLFxuICB9LFxuICBidWlsZDoge1xuICAgIHRhcmdldDogJ0VTMjAyMicsXG4gICAgc291cmNlbWFwOiB0cnVlLFxuICAgIGNzc01pbmlmeTogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJyxcbiAgICBhc3NldHNJbmxpbmVMaW1pdDogKHNvdXJjZTogc3RyaW5nKSA9PiB7XG4gICAgICBpZiAoc291cmNlLmVuZHNXaXRoKCdzcHJpdGUuc3ZnJykpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfSxcbiAgfSxcbiAgc3NyOiB7XG4gICAgbm9FeHRlcm5hbDogW1xuICAgICAgJ0Bwcml2eS1pby9yZWFjdC1hdXRoJyxcbiAgICAgICdAcHJpdnktaW8vd2FnbWknLFxuICAgICAgJ3dhZ21pJyxcbiAgICAgICdtaW5pLXN2Zy1kYXRhLXVyaScsXG4gICAgICAnQHdhbGxldGNvbm5lY3QvanNvbnJwYy13cy1jb25uZWN0aW9uJyxcbiAgICBdLFxuICB9LFxufSlcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL21ldGFzdWRvL3dvcmtzcGFjZS9pbnR1dGlvbi92Mi9pbnR1aXRpb24tdHMvcGFja2FnZXMvMXVpL3NyYy9zdHlsZXNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9tZXRhc3Vkby93b3Jrc3BhY2UvaW50dXRpb24vdjIvaW50dWl0aW9uLXRzL3BhY2thZ2VzLzF1aS9zcmMvc3R5bGVzL3BhbGV0dGUudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL21ldGFzdWRvL3dvcmtzcGFjZS9pbnR1dGlvbi92Mi9pbnR1aXRpb24tdHMvcGFja2FnZXMvMXVpL3NyYy9zdHlsZXMvcGFsZXR0ZS50c1wiO2NvbnN0IGJsYWNrID0gJyMwMDAwMDAnXG5jb25zdCB3aGl0ZSA9ICcjRkZGRkZGJ1xuXG5leHBvcnQgY29uc3QgcGFsZXR0ZSA9IHtcbiAgYmxhY2s6IHtcbiAgICBiYXNlOiBibGFjayxcbiAgICBhOTA6IGByZ2JhKCR7YmxhY2t9LCA5MCUpYCxcbiAgICBhODA6IGByZ2JhKCR7YmxhY2t9LCA4MCUpYCxcbiAgICBhNzA6IGByZ2JhKCR7YmxhY2t9LCA3MCUpYCxcbiAgICBhNjA6IGByZ2JhKCR7YmxhY2t9LCA2MCUpYCxcbiAgICBhNTA6IGByZ2JhKCR7YmxhY2t9LCA1MCUpYCxcbiAgICBhNDA6IGByZ2JhKCR7YmxhY2t9LCA0MCUpYCxcbiAgICBhMzA6IGByZ2JhKCR7YmxhY2t9LCAzMCUpYCxcbiAgICBhMjA6IGByZ2JhKCR7YmxhY2t9LCAyMCUpYCxcbiAgICBhMTA6IGByZ2JhKCR7YmxhY2t9LCAxMCUpYCxcbiAgICBhNTogYHJnYmEoJHtibGFja30sIDUlKWAsXG4gICAgYTM6IGByZ2JhKCR7YmxhY2t9LCAzJSlgLFxuICB9LFxuICB3aGl0ZToge1xuICAgIGJhc2U6IHdoaXRlLFxuICAgIGE5MDogYHJnYmEoJHt3aGl0ZX0sIDkwJSlgLFxuICAgIGE4MDogYHJnYmEoJHt3aGl0ZX0sIDgwJSlgLFxuICAgIGE3MDogYHJnYmEoJHt3aGl0ZX0sIDcwJSlgLFxuICAgIGE2MDogYHJnYmEoJHt3aGl0ZX0sIDYwJSlgLFxuICAgIGE1MDogYHJnYmEoJHt3aGl0ZX0sIDUwJSlgLFxuICAgIGE0MDogYHJnYmEoJHt3aGl0ZX0sIDQwJSlgLFxuICAgIGEzMDogYHJnYmEoJHt3aGl0ZX0sIDMwJSlgLFxuICAgIGEyMDogYHJnYmEoJHt3aGl0ZX0sIDIwJSlgLFxuICAgIGExMDogYHJnYmEoJHt3aGl0ZX0sIDEwJSlgLFxuICAgIGE1OiBgcmdiYSgke3doaXRlfSwgNSUpYCxcbiAgICBhMzogYHJnYmEoJHt3aGl0ZX0sIDMlKWAsXG4gIH0sXG4gIGdyYXk6IHtcbiAgICA1MDogJyNGQUZBRkEnLFxuICAgIDEwMDogJyNGNUY1RjUnLFxuICAgIDIwMDogJyNFNUU1RTUnLFxuICAgIDMwMDogJyNENEQ0RDQnLFxuICAgIDQwMDogJyNBM0EzQTMnLFxuICAgIDUwMDogJyM3MzczNzMnLFxuICAgIDYwMDogJyM1MjUyNTInLFxuICAgIDcwMDogJyM0MDQwNDAnLFxuICAgIDgwMDogJyMyNjI2MjYnLFxuICAgIDkwMDogJyMxNzE3MTcnLFxuICAgIDk1MDogJyMwQTBBMEEnLFxuICB9LFxuICByZWQ6IHtcbiAgICA1MDogJyNGREYzRjMnLFxuICAgIDEwMDogJyNGQkU1RTUnLFxuICAgIDIwMDogJyNGOUNGQ0YnLFxuICAgIDMwMDogJyNGM0FFQUUnLFxuICAgIDQwMDogJyNFQTgwN0YnLFxuICAgIDUwMDogJyNERDUzNTInLFxuICAgIDYwMDogJyNDQTM5MzgnLFxuICAgIDcwMDogJyNBOTJEMkMnLFxuICAgIDgwMDogJyM4QzI5MjgnLFxuICAgIDkwMDogJyM3NTI4MjcnLFxuICAgIDk1MDogJyMzRjEwMTAnLFxuICB9LFxuICBvcmFuZ2U6IHtcbiAgICA1MDogJyNGRkY0RTYnLFxuICAgIDEwMDogJyNGRkRFQjAnLFxuICAgIDIwMDogJyNGRkNFOEEnLFxuICAgIDMwMDogJyNGRkI4NTQnLFxuICAgIDQwMDogJyNGRkFBMzMnLFxuICAgIDUwMDogJyNGRjk1MDAnLFxuICAgIDYwMDogJyNFODg4MDAnLFxuICAgIDcwMDogJyNCNTZBMDAnLFxuICAgIDgwMDogJyM4QzUyMDAnLFxuICAgIDkwMDogJyM2QjNGMDAnLFxuICAgIDk1MDogJyM1NTMyMDAnLFxuICB9LFxuICB5ZWxsb3c6IHtcbiAgICA1MDogJyNGRkZBRTYnLFxuICAgIDEwMDogJyNGRkVGQjAnLFxuICAgIDIwMDogJyNGRkU4OEEnLFxuICAgIDMwMDogJyNGRkRENTQnLFxuICAgIDQwMDogJyNGRkQ2MzMnLFxuICAgIDUwMDogJyNGRkNDMDAnLFxuICAgIDYwMDogJyNFOEJBMDAnLFxuICAgIDcwMDogJyNCNTkxMDAnLFxuICAgIDgwMDogJyM4QzcwMDAnLFxuICAgIDkwMDogJyM2QjU2MDAnLFxuICAgIDk1MDogJyM1RTRCMDAnLFxuICB9LFxuICBncmVlbjoge1xuICAgIDUwOiAnI0YxRkNGNScsXG4gICAgMTAwOiAnI0RGRjlFQicsXG4gICAgMjAwOiAnI0MwRjJENycsXG4gICAgMzAwOiAnIzhGRTZCOCcsXG4gICAgNDAwOiAnIzU3RDE5MScsXG4gICAgNTAwOiAnIzM0QzU3OCcsXG4gICAgNjAwOiAnIzIzOTU1QScsXG4gICAgNzAwOiAnIzFGNzU0QScsXG4gICAgODAwOiAnIzFENUU0MCcsXG4gICAgOTAwOiAnIzE5NEQzNicsXG4gICAgOTUwOiAnIzA5MkExRCcsXG4gIH0sXG4gIHNreToge1xuICAgIDUwOiAnI0YyRjlGRScsXG4gICAgMTAwOiAnI0UzRjFGRCcsXG4gICAgMjAwOiAnI0MzRTVGQScsXG4gICAgMzAwOiAnIzkxRDFGOCcsXG4gICAgNDAwOiAnIzYxQkFGMycsXG4gICAgNTAwOiAnIzRBQTNFMycsXG4gICAgNjAwOiAnIzM4ODJDMicsXG4gICAgNzAwOiAnIzJDNjc5QycsXG4gICAgODAwOiAnIzI2NTg4MScsXG4gICAgOTAwOiAnIzIxNDk2QicsXG4gICAgOTUwOiAnIzE0MkU0NycsXG4gIH0sXG4gIGJsdWU6IHtcbiAgICA1MDogJyNFNkYyRkYnLFxuICAgIDEwMDogJyNCMEQ2RkYnLFxuICAgIDIwMDogJyM4QUMyRkYnLFxuICAgIDMwMDogJyM1NEE2RkYnLFxuICAgIDQwMDogJyMzMzk1RkYnLFxuICAgIDUwMDogJyMwMDdBRkYnLFxuICAgIDYwMDogJyMwMDZGRTgnLFxuICAgIDcwMDogJyMwMDU3QjUnLFxuICAgIDgwMDogJyMwMDQzOEMnLFxuICAgIDkwMDogJyMwMDMzNkInLFxuICAgIDk1MDogJyMwNDJDNUQnLFxuICB9LFxuICBwdXJwbGU6IHtcbiAgICA1MDogJyNGN0VFRkMnLFxuICAgIDEwMDogJyNFNkM5RjUnLFxuICAgIDIwMDogJyNEQUFGRjAnLFxuICAgIDMwMDogJyNDOThCRTknLFxuICAgIDQwMDogJyNCRjc1RTUnLFxuICAgIDUwMDogJyNBRjUyREUnLFxuICAgIDYwMDogJyM5RjRCQ0EnLFxuICAgIDcwMDogJyM3QzNBOUUnLFxuICAgIDgwMDogJyM2MDJEN0EnLFxuICAgIDkwMDogJyM0QTIyNUQnLFxuICAgIDk1MDogJyMzQjFCNEEnLFxuICB9LFxufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbWV0YXN1ZG8vd29ya3NwYWNlL2ludHV0aW9uL3YyL2ludHVpdGlvbi10cy9wYWNrYWdlcy8xdWkvc3JjL3N0eWxlc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL21ldGFzdWRvL3dvcmtzcGFjZS9pbnR1dGlvbi92Mi9pbnR1aXRpb24tdHMvcGFja2FnZXMvMXVpL3NyYy9zdHlsZXMvdGhlbWUtcGx1Z2luLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9tZXRhc3Vkby93b3Jrc3BhY2UvaW50dXRpb24vdjIvaW50dWl0aW9uLXRzL3BhY2thZ2VzLzF1aS9zcmMvc3R5bGVzL3RoZW1lLXBsdWdpbi50c1wiO2ltcG9ydCBkZWZhdWx0VGhlbWUgZnJvbSAndGFpbHdpbmRjc3MvZGVmYXVsdFRoZW1lLmpzJ1xuaW1wb3J0IHBsdWdpbiBmcm9tICd0YWlsd2luZGNzcy9wbHVnaW4nXG5cbmltcG9ydCB7IHRoZW1lcyB9IGZyb20gJy4vdGhlbWVzJ1xuaW1wb3J0IHsgY29sb3JNaXggfSBmcm9tICcuL3V0aWxzJ1xuXG5leHBvcnQgY29uc3QgdGhlbWVQbHVnaW4gPSBwbHVnaW4oXG4gIC8vIDEuIEFkZCBjc3MgdmFyaWFibGUgZGVmaW5pdGlvbnMgdG8gdGhlIGJhc2UgbGF5ZXJcbiAgKHsgYWRkQmFzZSwgYWRkVXRpbGl0aWVzIH0pID0+IHtcbiAgICBhZGRCYXNlKHtcbiAgICAgICc6cm9vdCc6IHtcbiAgICAgICAgJy0tYmFja2dyb3VuZCc6IHRoZW1lcy5saWdodC5iYWNrZ3JvdW5kLFxuICAgICAgICAnLS1mb3JlZ3JvdW5kJzogdGhlbWVzLmxpZ2h0LmZvcmVncm91bmQsXG4gICAgICAgICctLWNhcmQnOiB0aGVtZXMubGlnaHQuY2FyZCxcbiAgICAgICAgJy0tY2FyZC1mb3JlZ3JvdW5kJzogdGhlbWVzLmxpZ2h0LmNhcmRGb3JlZ3JvdW5kLFxuICAgICAgICAnLS1wb3BvdmVyJzogdGhlbWVzLmxpZ2h0LnBvcG92ZXIsXG4gICAgICAgICctLXBvcG92ZXItZm9yZWdyb3VuZCc6IHRoZW1lcy5saWdodC5wb3BvdmVyRm9yZWdyb3VuZCxcbiAgICAgICAgJy0tcHJpbWFyeSc6IHRoZW1lcy5saWdodC5wcmltYXJ5LkRFRkFVTFQsXG4gICAgICAgICctLXByaW1hcnktZm9yZWdyb3VuZCc6IHRoZW1lcy5saWdodC5wcmltYXJ5Rm9yZWdyb3VuZCxcbiAgICAgICAgJy0tc2Vjb25kYXJ5JzogdGhlbWVzLmxpZ2h0LnNlY29uZGFyeSxcbiAgICAgICAgJy0tc2Vjb25kYXJ5LWZvcmVncm91bmQnOiB0aGVtZXMubGlnaHQuc2Vjb25kYXJ5Rm9yZWdyb3VuZCxcbiAgICAgICAgJy0tbXV0ZWQnOiB0aGVtZXMubGlnaHQubXV0ZWQsXG4gICAgICAgICctLW11dGVkLWZvcmVncm91bmQnOiB0aGVtZXMubGlnaHQubXV0ZWRGb3JlZ3JvdW5kLFxuICAgICAgICAnLS1hY2NlbnQnOiB0aGVtZXMubGlnaHQuYWNjZW50LFxuICAgICAgICAnLS1hY2NlbnQtZm9yZWdyb3VuZCc6IHRoZW1lcy5saWdodC5hY2NlbnRGb3JlZ3JvdW5kLFxuICAgICAgICAnLS1kZXN0cnVjdGl2ZSc6IHRoZW1lcy5saWdodC5kZXN0cnVjdGl2ZSxcbiAgICAgICAgJy0tZGVzdHJ1Y3RpdmUtZm9yZWdyb3VuZCc6IHRoZW1lcy5saWdodC5kZXN0cnVjdGl2ZUZvcmVncm91bmQsXG4gICAgICAgICctLWJvcmRlcic6IHRoZW1lcy5saWdodC5ib3JkZXIsXG4gICAgICAgICctLWlucHV0JzogdGhlbWVzLmxpZ2h0LmlucHV0LFxuICAgICAgICAnLS1yaW5nJzogdGhlbWVzLmxpZ2h0LnJpbmcsXG4gICAgICAgICctLXJhZGl1cyc6IHRoZW1lcy5saWdodC5yYWRpdXMsXG4gICAgICAgICctLXN1Y2Nlc3MnOiB0aGVtZXMubGlnaHQuc3VjY2VzcyxcbiAgICAgICAgJy0tc3VjY2Vzcy1mb3JlZ3JvdW5kJzogdGhlbWVzLmxpZ2h0LnN1Y2Nlc3NGb3JlZ3JvdW5kLFxuICAgICAgICAnLS13YXJuaW5nJzogdGhlbWVzLmxpZ2h0Lndhcm5pbmcsXG4gICAgICAgICctLXdhcm5pbmctZm9yZWdyb3VuZCc6IHRoZW1lcy5saWdodC53YXJuaW5nRm9yZWdyb3VuZCxcbiAgICAgICAgJy0tZm9yJzogdGhlbWVzLmxpZ2h0LmZvcixcbiAgICAgICAgJy0tZm9yLWZvcmVncm91bmQnOiB0aGVtZXMubGlnaHQuZm9yRm9yZWdyb3VuZCxcbiAgICAgICAgJy0tYWdhaW5zdCc6IHRoZW1lcy5saWdodC5hZ2FpbnN0LFxuICAgICAgICAnLS1hZ2FpbnN0LWZvcmVncm91bmQnOiB0aGVtZXMubGlnaHQuYWdhaW5zdEZvcmVncm91bmQsXG4gICAgICAgICctLXNvY2lhbCc6IHRoZW1lcy5saWdodC5zb2NpYWwsXG4gICAgICAgICctLXNvY2lhbC1mb3JlZ3JvdW5kJzogdGhlbWVzLmxpZ2h0LnNvY2lhbEZvcmVncm91bmQsXG4gICAgICAgIC8vIHByaW1hcnlcbiAgICAgICAgJy0tcHJpbWFyeS01MCc6IHRoZW1lcy5saWdodC5wcmltYXJ5WzUwXSxcbiAgICAgICAgJy0tcHJpbWFyeS0xMDAnOiB0aGVtZXMubGlnaHQucHJpbWFyeVsxMDBdLFxuICAgICAgICAnLS1wcmltYXJ5LTIwMCc6IHRoZW1lcy5saWdodC5wcmltYXJ5WzIwMF0sXG4gICAgICAgICctLXByaW1hcnktMzAwJzogdGhlbWVzLmxpZ2h0LnByaW1hcnlbMzAwXSxcbiAgICAgICAgJy0tcHJpbWFyeS00MDAnOiB0aGVtZXMubGlnaHQucHJpbWFyeVs0MDBdLFxuICAgICAgICAnLS1wcmltYXJ5LTUwMCc6IHRoZW1lcy5saWdodC5wcmltYXJ5WzUwMF0sXG4gICAgICAgICctLXByaW1hcnktNjAwJzogdGhlbWVzLmxpZ2h0LnByaW1hcnlbNjAwXSxcbiAgICAgICAgJy0tcHJpbWFyeS03MDAnOiB0aGVtZXMubGlnaHQucHJpbWFyeVs3MDBdLFxuICAgICAgICAnLS1wcmltYXJ5LTgwMCc6IHRoZW1lcy5saWdodC5wcmltYXJ5WzgwMF0sXG4gICAgICAgICctLXByaW1hcnktOTAwJzogdGhlbWVzLmxpZ2h0LnByaW1hcnlbOTAwXSxcbiAgICAgICAgJy0tcHJpbWFyeS05NTAnOiB0aGVtZXMubGlnaHQucHJpbWFyeVs5NTBdLFxuICAgICAgfSxcbiAgICB9KVxuXG4gICAgT2JqZWN0LmVudHJpZXModGhlbWVzKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgICAgIGFkZEJhc2Uoe1xuICAgICAgICBbYFtkYXRhLXRoZW1lPVwiJHtrZXl9XCJdYF06IHtcbiAgICAgICAgICAnLS1iYWNrZ3JvdW5kJzogdmFsdWUuYmFja2dyb3VuZCxcbiAgICAgICAgICAnLS1mb3JlZ3JvdW5kJzogdmFsdWUuZm9yZWdyb3VuZCxcbiAgICAgICAgICAnLS1jYXJkJzogdmFsdWUuY2FyZCxcbiAgICAgICAgICAnLS1jYXJkLWZvcmVncm91bmQnOiB2YWx1ZS5jYXJkRm9yZWdyb3VuZCxcbiAgICAgICAgICAnLS1wb3BvdmVyJzogdmFsdWUucG9wb3ZlcixcbiAgICAgICAgICAnLS1wb3BvdmVyLWZvcmVncm91bmQnOiB2YWx1ZS5wb3BvdmVyRm9yZWdyb3VuZCxcbiAgICAgICAgICAnLS1wcmltYXJ5JzogdmFsdWUucHJpbWFyeS5ERUZBVUxULFxuICAgICAgICAgICctLXByaW1hcnktZm9yZWdyb3VuZCc6IHZhbHVlLnByaW1hcnlGb3JlZ3JvdW5kLFxuICAgICAgICAgICctLXNlY29uZGFyeSc6IHZhbHVlLnNlY29uZGFyeSxcbiAgICAgICAgICAnLS1zZWNvbmRhcnktZm9yZWdyb3VuZCc6IHZhbHVlLnNlY29uZGFyeUZvcmVncm91bmQsXG4gICAgICAgICAgJy0tbXV0ZWQnOiB2YWx1ZS5tdXRlZCxcbiAgICAgICAgICAnLS1tdXRlZC1mb3JlZ3JvdW5kJzogdmFsdWUubXV0ZWRGb3JlZ3JvdW5kLFxuICAgICAgICAgICctLWFjY2VudCc6IHZhbHVlLmFjY2VudCxcbiAgICAgICAgICAnLS1hY2NlbnQtZm9yZWdyb3VuZCc6IHZhbHVlLmFjY2VudEZvcmVncm91bmQsXG4gICAgICAgICAgJy0tZGVzdHJ1Y3RpdmUnOiB2YWx1ZS5kZXN0cnVjdGl2ZSxcbiAgICAgICAgICAnLS1kZXN0cnVjdGl2ZS1mb3JlZ3JvdW5kJzogdmFsdWUuZGVzdHJ1Y3RpdmVGb3JlZ3JvdW5kLFxuICAgICAgICAgICctLWJvcmRlcic6IHZhbHVlLmJvcmRlcixcbiAgICAgICAgICAnLS1pbnB1dCc6IHZhbHVlLmlucHV0LFxuICAgICAgICAgICctLXJpbmcnOiB2YWx1ZS5yaW5nLFxuICAgICAgICAgICctLXJhZGl1cyc6IHZhbHVlLnJhZGl1cyxcbiAgICAgICAgICAnLS1zdWNjZXNzJzogdmFsdWUuc3VjY2VzcyxcbiAgICAgICAgICAnLS1zdWNjZXNzLWZvcmVncm91bmQnOiB2YWx1ZS5zdWNjZXNzRm9yZWdyb3VuZCxcbiAgICAgICAgICAnLS13YXJuaW5nJzogdmFsdWUud2FybmluZyxcbiAgICAgICAgICAnLS13YXJuaW5nLWZvcmVncm91bmQnOiB2YWx1ZS53YXJuaW5nRm9yZWdyb3VuZCxcbiAgICAgICAgICAnLS1mb3InOiB2YWx1ZS5mb3IsXG4gICAgICAgICAgJy0tZm9yLWZvcmVncm91bmQnOiB2YWx1ZS5mb3JGb3JlZ3JvdW5kLFxuICAgICAgICAgICctLWFnYWluc3QnOiB2YWx1ZS5hZ2FpbnN0LFxuICAgICAgICAgICctLWFnYWluc3QtZm9yZWdyb3VuZCc6IHZhbHVlLmFnYWluc3RGb3JlZ3JvdW5kLFxuICAgICAgICAgICctLXNvY2lhbCc6IHZhbHVlLnNvY2lhbCxcbiAgICAgICAgICAnLS1zb2NpYWwtZm9yZWdyb3VuZCc6IHZhbHVlLnNvY2lhbEZvcmVncm91bmQsXG4gICAgICAgICAgLy8gcHJpbWFyeVxuICAgICAgICAgICctLXByaW1hcnktNTAnOiB2YWx1ZS5wcmltYXJ5WzUwXSxcbiAgICAgICAgICAnLS1wcmltYXJ5LTEwMCc6IHZhbHVlLnByaW1hcnlbMTAwXSxcbiAgICAgICAgICAnLS1wcmltYXJ5LTIwMCc6IHZhbHVlLnByaW1hcnlbMjAwXSxcbiAgICAgICAgICAnLS1wcmltYXJ5LTMwMCc6IHZhbHVlLnByaW1hcnlbMzAwXSxcbiAgICAgICAgICAnLS1wcmltYXJ5LTQwMCc6IHZhbHVlLnByaW1hcnlbNDAwXSxcbiAgICAgICAgICAnLS1wcmltYXJ5LTUwMCc6IHZhbHVlLnByaW1hcnlbNTAwXSxcbiAgICAgICAgICAnLS1wcmltYXJ5LTYwMCc6IHZhbHVlLnByaW1hcnlbNjAwXSxcbiAgICAgICAgICAnLS1wcmltYXJ5LTcwMCc6IHZhbHVlLnByaW1hcnlbNzAwXSxcbiAgICAgICAgICAnLS1wcmltYXJ5LTgwMCc6IHZhbHVlLnByaW1hcnlbODAwXSxcbiAgICAgICAgICAnLS1wcmltYXJ5LTkwMCc6IHZhbHVlLnByaW1hcnlbOTAwXSxcbiAgICAgICAgICAnLS1wcmltYXJ5LTk1MCc6IHZhbHVlLnByaW1hcnlbOTUwXSxcbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgfSlcblxuICAgIGFkZEJhc2Uoe1xuICAgICAgYm9keToge1xuICAgICAgICAnQGFwcGx5IGJnLWJhY2tncm91bmQgdGV4dC1mb3JlZ3JvdW5kJzoge30sXG4gICAgICAgICdmb250LWZlYXR1cmUtc2V0dGluZ3MnOiAnXCJybGlnXCIgMSwgXCJjYWx0XCIgMScsXG4gICAgICB9LFxuICAgICAgJy50aGVtZS1ib3JkZXInOiB7XG4gICAgICAgICdAYXBwbHkgYm9yZGVyIGJvcmRlci1ib3JkZXIvMTAnOiB7fSxcbiAgICAgIH0sXG4gICAgICAnLmluLW91dC1ncmFkaWVudCc6IHtcbiAgICAgICAgJ0BhcHBseSBiZy1ncmFkaWVudC10by1yIGZyb20tYm9yZGVyLzUgZnJvbS0xMCUgdmlhLWJvcmRlci8yMCB2aWEtNTAlIHRvLWJvcmRlci81IHRvLTkwJSc6XG4gICAgICAgICAge30sXG4gICAgICB9LFxuICAgICAgJy5pbi1vdXQtZ3JhZGllbnQtc3Ryb25nJzoge1xuICAgICAgICAnQGFwcGx5IGJnLWdyYWRpZW50LXRvLXIgZnJvbS10cmFuc3BhcmVudCBmcm9tLTEwJSB2aWEtYm9yZGVyLzIwIHZpYS01MCUgdG8tdHJhbnNwYXJlbnQgdG8tOTAlJzpcbiAgICAgICAgICB7fSxcbiAgICAgIH0sXG4gICAgfSlcblxuICAgIGFkZFV0aWxpdGllcyh7XG4gICAgICAvLyBHcmFkaWVudHNcbiAgICAgICcucHJpbWFyeS1ncmFkaWVudC1zdWJ0bGUnOiB7XG4gICAgICAgIGJhY2tncm91bmQ6IGBsaW5lYXItZ3JhZGllbnQoJHtjb2xvck1peCgncHJpbWFyeScsIDAuMSl9LCAke2NvbG9yTWl4KCdwcmltYXJ5JywgMC4wNSl9KWAsXG4gICAgICB9LFxuICAgICAgJy5wcmltYXJ5LWdyYWRpZW50Jzoge1xuICAgICAgICBiYWNrZ3JvdW5kOiBgbGluZWFyLWdyYWRpZW50KCR7Y29sb3JNaXgoJ3ByaW1hcnknLCAwLjQpfSwgJHtjb2xvck1peCgncHJpbWFyeScsIDAuMil9KWAsXG4gICAgICB9LFxuICAgICAgJy5wcmltYXJ5LWdyYWRpZW50LXN0cm9uZyc6IHtcbiAgICAgICAgYmFja2dyb3VuZDogYGxpbmVhci1ncmFkaWVudCgke2NvbG9yTWl4KCdwcmltYXJ5JywgMC44KX0sICR7Y29sb3JNaXgoJ3ByaW1hcnknLCAwLjUpfSlgLFxuICAgICAgfSxcbiAgICB9KVxuICB9LFxuXG4gIC8vIDIuIEV4dGVuZCB0aGUgdGFpbHdpbmQgdGhlbWUgd2l0aCAndGhlbWFibGUnIHV0aWxpdGllc1xuICB7XG4gICAgdGhlbWU6IHtcbiAgICAgIGNvbnRhaW5lcjoge1xuICAgICAgICBjZW50ZXI6IHRydWUsXG4gICAgICAgIHBhZGRpbmc6ICcycmVtJyxcbiAgICAgIH0sXG4gICAgICBleHRlbmQ6IHtcbiAgICAgICAgZm9udEZhbWlseToge1xuICAgICAgICAgIHNhbnM6IFsnR2Vpc3QnLCAuLi5kZWZhdWx0VGhlbWUuZm9udEZhbWlseS5zYW5zXSxcbiAgICAgICAgfSxcbiAgICAgICAgYm9yZGVyV2lkdGg6IHtcbiAgICAgICAgICBERUZBVUxUOiAnMXB4JyxcbiAgICAgICAgICBweDogJzFweCcsXG4gICAgICAgIH0sXG4gICAgICAgIGZvbnRTaXplOiB7XG4gICAgICAgICAgeHM6IFsnMC42MjVyZW0nLCAnMXJlbSddLCAvLyBzbWFsbFxuICAgICAgICAgIHNtOiBbJzAuNzVyZW0nLCAnMS4xMjVyZW0nXSwgLy8gY2FwdGlvbiAmIGZvb3Rub3RlXG4gICAgICAgICAgYmFzZTogWycwLjg3NXJlbScsICcxLjI1cmVtJ10sIC8vIGJvZHlcbiAgICAgICAgICBsZzogWycxcmVtJywgJzEuODc1cmVtJ10sIC8vIGJvZHlMYXJnZVxuICAgICAgICAgIHhsOiBbJzEuMjVyZW0nLCAnMS44NzVyZW0nXSwgLy8gaGVhZGxpbmVcbiAgICAgICAgICAnMnhsJzogJzEuNXJlbScsIC8vIGhlYWRpbmc1XG4gICAgICAgICAgJzN4bCc6ICcxLjg3NXJlbScsIC8vIGhlYWRpbmc0XG4gICAgICAgICAgJzR4bCc6ICcyLjVyZW0nLCAvLyBoZWFkaW5nM1xuICAgICAgICAgICc1eGwnOiAnMy4xMjVyZW0nLCAvLyBoZWFkaW5nMlxuICAgICAgICAgICc2eGwnOiAnMy43NXJlbScsIC8vIGhlYWRpbmcxXG4gICAgICAgIH0sXG4gICAgICAgIGNvbG9yczoge1xuICAgICAgICAgIGJvcmRlcjogY29sb3JNaXgoJ2JvcmRlcicpLFxuICAgICAgICAgIGlucHV0OiBjb2xvck1peCgnaW5wdXQnKSxcbiAgICAgICAgICByaW5nOiBjb2xvck1peCgncmluZycpLFxuICAgICAgICAgIGJhY2tncm91bmQ6IGNvbG9yTWl4KCdiYWNrZ3JvdW5kJyksXG4gICAgICAgICAgZm9yZWdyb3VuZDogY29sb3JNaXgoJ2ZvcmVncm91bmQnKSxcbiAgICAgICAgICBwcmltYXJ5OiB7XG4gICAgICAgICAgICBERUZBVUxUOiBjb2xvck1peCgncHJpbWFyeScpLFxuICAgICAgICAgICAgZm9yZWdyb3VuZDogY29sb3JNaXgoJ3ByaW1hcnktZm9yZWdyb3VuZCcpLFxuICAgICAgICAgICAgNTA6IGNvbG9yTWl4KCdwcmltYXJ5LTUwJyksXG4gICAgICAgICAgICAxMDA6IGNvbG9yTWl4KCdwcmltYXJ5LTEwMCcpLFxuICAgICAgICAgICAgMjAwOiBjb2xvck1peCgncHJpbWFyeS0yMDAnKSxcbiAgICAgICAgICAgIDMwMDogY29sb3JNaXgoJ3ByaW1hcnktMzAwJyksXG4gICAgICAgICAgICA0MDA6IGNvbG9yTWl4KCdwcmltYXJ5LTQwMCcpLFxuICAgICAgICAgICAgNTAwOiBjb2xvck1peCgncHJpbWFyeS01MDAnKSxcbiAgICAgICAgICAgIDYwMDogY29sb3JNaXgoJ3ByaW1hcnktNjAwJyksXG4gICAgICAgICAgICA3MDA6IGNvbG9yTWl4KCdwcmltYXJ5LTcwMCcpLFxuICAgICAgICAgICAgODAwOiBjb2xvck1peCgncHJpbWFyeS04MDAnKSxcbiAgICAgICAgICAgIDkwMDogY29sb3JNaXgoJ3ByaW1hcnktOTAwJyksXG4gICAgICAgICAgICA5NTA6IGNvbG9yTWl4KCdwcmltYXJ5LTk1MCcpLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgc2Vjb25kYXJ5OiB7XG4gICAgICAgICAgICBERUZBVUxUOiBjb2xvck1peCgnc2Vjb25kYXJ5JyksXG4gICAgICAgICAgICBmb3JlZ3JvdW5kOiBjb2xvck1peCgnc2Vjb25kYXJ5LWZvcmVncm91bmQnKSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGRlc3RydWN0aXZlOiB7XG4gICAgICAgICAgICBERUZBVUxUOiBjb2xvck1peCgnZGVzdHJ1Y3RpdmUnKSxcbiAgICAgICAgICAgIGZvcmVncm91bmQ6IGNvbG9yTWl4KCdkZXN0cnVjdGl2ZS1mb3JlZ3JvdW5kJyksXG4gICAgICAgICAgfSxcbiAgICAgICAgICBtdXRlZDoge1xuICAgICAgICAgICAgREVGQVVMVDogY29sb3JNaXgoJ211dGVkJyksXG4gICAgICAgICAgICBmb3JlZ3JvdW5kOiBjb2xvck1peCgnbXV0ZWQtZm9yZWdyb3VuZCcpLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgYWNjZW50OiB7XG4gICAgICAgICAgICBERUZBVUxUOiBjb2xvck1peCgnYWNjZW50JyksXG4gICAgICAgICAgICBmb3JlZ3JvdW5kOiBjb2xvck1peCgnYWNjZW50LWZvcmVncm91bmQnKSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHdhcm5pbmc6IHtcbiAgICAgICAgICAgIERFRkFVTFQ6IGNvbG9yTWl4KCd3YXJuaW5nJyksXG4gICAgICAgICAgICBmb3JlZ3JvdW5kOiBjb2xvck1peCgnd2FybmluZy1mb3JlZ3JvdW5kJyksXG4gICAgICAgICAgfSxcbiAgICAgICAgICBzdWNjZXNzOiB7XG4gICAgICAgICAgICBERUZBVUxUOiBjb2xvck1peCgnc3VjY2VzcycpLFxuICAgICAgICAgICAgZm9yZWdyb3VuZDogY29sb3JNaXgoJ3N1Y2Nlc3MtZm9yZWdyb3VuZCcpLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgcG9wb3Zlcjoge1xuICAgICAgICAgICAgREVGQVVMVDogY29sb3JNaXgoJ3BvcG92ZXInKSxcbiAgICAgICAgICAgIGZvcmVncm91bmQ6IGNvbG9yTWl4KCdwb3BvdmVyLWZvcmVncm91bmQnKSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGNhcmQ6IHtcbiAgICAgICAgICAgIERFRkFVTFQ6IGNvbG9yTWl4KCdjYXJkJyksXG4gICAgICAgICAgICBmb3JlZ3JvdW5kOiBjb2xvck1peCgnY2FyZC1mb3JlZ3JvdW5kJyksXG4gICAgICAgICAgfSxcbiAgICAgICAgICBmb3I6IHtcbiAgICAgICAgICAgIERFRkFVTFQ6IGNvbG9yTWl4KCdmb3InKSxcbiAgICAgICAgICAgIGZvcmVncm91bmQ6IGNvbG9yTWl4KCdmb3ItZm9yZWdyb3VuZCcpLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgYWdhaW5zdDoge1xuICAgICAgICAgICAgREVGQVVMVDogY29sb3JNaXgoJ2FnYWluc3QnKSxcbiAgICAgICAgICAgIGZvcmVncm91bmQ6IGNvbG9yTWl4KCdhZ2FpbnN0LWZvcmVncm91bmQnKSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHNvY2lhbDoge1xuICAgICAgICAgICAgREVGQVVMVDogY29sb3JNaXgoJ3NvY2lhbCcpLFxuICAgICAgICAgICAgZm9yZWdyb3VuZDogY29sb3JNaXgoJ3NvY2lhbC1mb3JlZ3JvdW5kJyksXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAga2V5ZnJhbWVzOiB7XG4gICAgICAgICAgJ2FjY29yZGlvbi1kb3duJzoge1xuICAgICAgICAgICAgZnJvbTogeyBoZWlnaHQ6ICcwJyB9LFxuICAgICAgICAgICAgdG86IHsgaGVpZ2h0OiAndmFyKC0tcmFkaXgtYWNjb3JkaW9uLWNvbnRlbnQtaGVpZ2h0KScgfSxcbiAgICAgICAgICB9LFxuICAgICAgICAgICdhY2NvcmRpb24tdXAnOiB7XG4gICAgICAgICAgICBmcm9tOiB7IGhlaWdodDogJ3ZhcigtLXJhZGl4LWFjY29yZGlvbi1jb250ZW50LWhlaWdodCknIH0sXG4gICAgICAgICAgICB0bzogeyBoZWlnaHQ6ICcwJyB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGFuaW1hdGlvbjoge1xuICAgICAgICAgICdhY2NvcmRpb24tZG93bic6ICdhY2NvcmRpb24tZG93biAwLjJzIGVhc2Utb3V0JyxcbiAgICAgICAgICAnYWNjb3JkaW9uLXVwJzogJ2FjY29yZGlvbi11cCAwLjJzIGVhc2Utb3V0JyxcbiAgICAgICAgICAncHVsc2Utc2xvdyc6ICdwdWxzZSAxLjZzIGN1YmljLWJlemllcigwLjYsIDAsIDAuNywgMSkgaW5maW5pdGUnLFxuICAgICAgICAgICdzcGluLXNsb3cnOiAnc3BpbiAzLjJzIGxpbmVhciBpbmZpbml0ZScsXG4gICAgICAgIH0sXG4gICAgICAgIGJveFNoYWRvdzoge1xuICAgICAgICAgICdzbS1zdWJ0bGUnOlxuICAgICAgICAgICAgJzBweCA1cHggNXB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMDUpLCAwcHggMnB4IDJweCAwcHggcmdiYSgwLCAwLCAwLCAwLjAzKSwgMHB4IDFweCAwcHggMHB4IHJnYmEoMCwgMCwgMCwgMC4wMyknLFxuICAgICAgICAgICdtZC1zdWJ0bGUnOlxuICAgICAgICAgICAgJzBweCA4cHggOHB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMDUpLCAwcHggNHB4IDRweCAwcHggcmdiYSgwLCAwLCAwLCAwLjA1KSwgMHB4IDFweCAwcHggMHB4IHJnYmEoMCwgMCwgMCwgMC4wMyknLFxuICAgICAgICAgICdsZy1zdWJ0bGUnOlxuICAgICAgICAgICAgJzBweCAxMHB4IDEwcHggMHB4IHJnYmEoMCwgMCwgMCwgMC4wNSksIDBweCA2cHggNnB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMDUpLCAwcHggMXB4IDBweCAwcHggcmdiYSgwLCAwLCAwLCAwLjAzKScsXG4gICAgICAgICAgJ3hsLXN1YnRsZSc6XG4gICAgICAgICAgICAnMHB4IDEycHggMTJweCAwcHggcmdiYSgwLCAwLCAwLCAwLjA2KSwgMHB4IDhweCA4cHggMHB4IHJnYmEoMCwgMCwgMCwgMC4wNSksIDBweCAxcHggMHB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMDMpJyxcbiAgICAgICAgICBzbTogJzBweCAxMHB4IDEwcHggMHB4IHJnYmEoMCwgMCwgMCwgMC4xMCksIDBweCA0cHggNHB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMDUpLCAwcHggMXB4IDBweCAwcHggcmdiYSgwLCAwLCAwLCAwLjA1KScsXG4gICAgICAgICAgbWQ6ICcwcHggMTVweCAzMHB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMTUpLCAwcHggNXB4IDEwcHggMHB4IHJnYmEoMCwgMCwgMCwgMC4xMCksIDBweCAycHggNHB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMTApJyxcbiAgICAgICAgICBsZzogJzBweCAxNXB4IDMwcHggMHB4IHJnYmEoMCwgMCwgMCwgMC4xNSksIDBweCAxMHB4IDIwcHggMHB4IHJnYmEoMCwgMCwgMCwgMC4xMCksIDBweCAzcHggNnB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMTApJyxcbiAgICAgICAgICB4bDogJzBweCAyMHB4IDQwcHggMHB4IHJnYmEoMCwgMCwgMCwgMC4xNSksIDBweCAxNXB4IDMwcHggMHB4IHJnYmEoMCwgMCwgMCwgMC4xMCksIDBweCA1cHggMTBweCAwcHggcmdiYSgwLCAwLCAwLCAwLjEwKScsXG4gICAgICAgICAgJ3NtLXN0cm9uZyc6XG4gICAgICAgICAgICAnMHB4IDEwcHggMTBweCAwcHggcmdiYSgwLCAwLCAwLCAwLjE1KSwgMHB4IDRweCA0cHggMHB4IHJnYmEoMCwgMCwgMCwgMC4xMCksIDBweCAxcHggMHB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMDUpJyxcbiAgICAgICAgICAnbWQtc3Ryb25nJzpcbiAgICAgICAgICAgICcwcHggMTBweCAyMHB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMjApLCAwcHggNXB4IDEwcHggMHB4IHJnYmEoMCwgMCwgMCwgMC4xMCksIDBweCAycHggNHB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMTApJyxcbiAgICAgICAgICAnbGctc3Ryb25nJzpcbiAgICAgICAgICAgICcwcHggMTVweCAzMHB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMjApLCAwcHggMTBweCAyMHB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMTUpLCAwcHggM3B4IDZweCAwcHggcmdiYSgwLCAwLCAwLCAwLjEwKScsXG4gICAgICAgICAgJ3hsLXN0cm9uZyc6XG4gICAgICAgICAgICAnMHB4IDIwcHggNDBweCAwcHggcmdiYSgwLCAwLCAwLCAwLjI1KSwgMHB4IDE1cHggMzBweCAwcHggcmdiYSgwLCAwLCAwLCAwLjE1KSwgMHB4IDVweCAxMHB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMDUpJyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbilcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL21ldGFzdWRvL3dvcmtzcGFjZS9pbnR1dGlvbi92Mi9pbnR1aXRpb24tdHMvcGFja2FnZXMvMXVpL3NyYy9zdHlsZXNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9tZXRhc3Vkby93b3Jrc3BhY2UvaW50dXRpb24vdjIvaW50dWl0aW9uLXRzL3BhY2thZ2VzLzF1aS9zcmMvc3R5bGVzL3RoZW1lcy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvbWV0YXN1ZG8vd29ya3NwYWNlL2ludHV0aW9uL3YyL2ludHVpdGlvbi10cy9wYWNrYWdlcy8xdWkvc3JjL3N0eWxlcy90aGVtZXMudHNcIjtpbXBvcnQgeyBwYWxldHRlIH0gZnJvbSAnLi9wYWxldHRlJ1xuXG5jb25zdCByYWRpdXNWYWx1ZSA9ICcwLjVyZW0nXG5cbmV4cG9ydCBjb25zdCB0aGVtZXMgPSB7XG4gIGxpZ2h0OiB7XG4gICAgYmFja2dyb3VuZDogJzAgMCUgMTAwJScsXG4gICAgZm9yZWdyb3VuZDogJzIyNCA3MS40JSA0LjElJyxcbiAgICBjYXJkOiAnMCAwJSAxMDAlJyxcbiAgICBjYXJkRm9yZWdyb3VuZDogJzIyNCA3MS40JSA0LjElJyxcbiAgICBwb3BvdmVyOiAnMCAwJSAxMDAlJyxcbiAgICBwb3BvdmVyRm9yZWdyb3VuZDogJzIyNCA3MS40JSA0LjElJyxcbiAgICBwcmltYXJ5OiB7XG4gICAgICBERUZBVUxUOiAnIzAwNTJGRicsXG4gICAgICA1MDogJyNmMGYyZmYnLFxuICAgICAgMTAwOiAnI2RkZTFmZicsXG4gICAgICAyMDA6ICcjYzBjN2ZmJyxcbiAgICAgIDMwMDogJyM5NGEwZmYnLFxuICAgICAgNDAwOiAnIzU3NmFmZicsXG4gICAgICA1MDA6ICcjMjMzY2ZmJyxcbiAgICAgIDYwMDogJyMwNDIwZmYnLFxuICAgICAgNzAwOiAnIzAwMThkNycsXG4gICAgICA4MDA6ICcjMDAxMGE2JyxcbiAgICAgIDkwMDogJyMwMDBiN2YnLFxuICAgICAgOTUwOiAnIzAwMDY0YycsXG4gICAgfSxcbiAgICBwcmltYXJ5Rm9yZWdyb3VuZDogJzIyNCA3MS40JSA0LjElJyxcbiAgICBzZWNvbmRhcnk6ICcyMjAgMTQuMyUgOTUuOSUnLFxuICAgIHNlY29uZGFyeUZvcmVncm91bmQ6ICcyMjAuOSAzOS4zJSAxMSUnLFxuICAgIG11dGVkOiAnMjIwIDE0LjMlIDk1LjklJyxcbiAgICBtdXRlZEZvcmVncm91bmQ6ICcyMjAgOC45JSA0Ni4xJScsXG4gICAgYWNjZW50OiAnMjIwIDE0LjMlIDk1LjklJyxcbiAgICBhY2NlbnRGb3JlZ3JvdW5kOiAnMjIwLjkgMzkuMyUgMTElJyxcbiAgICBkZXN0cnVjdGl2ZTogJzAgODQuMiUgNjAuMiUnLFxuICAgIGRlc3RydWN0aXZlRm9yZWdyb3VuZDogJzIxMCAyMCUgOTglJyxcbiAgICBib3JkZXI6ICcyMTUgMjcuOSUgMTYuOSUnLFxuICAgIGlucHV0OiAnMjE1IDI3LjklIDE2LjklJyxcbiAgICByaW5nOiAnMjE2IDEyLjIlIDgzLjklJyxcbiAgICByYWRpdXM6IHJhZGl1c1ZhbHVlLFxuICAgIC8vIGN1c3RvbSBhdHRyaWJ1dGVzXG4gICAgc3VjY2VzczogcGFsZXR0ZS5ncmVlbls1MDBdLFxuICAgIHN1Y2Nlc3NGb3JlZ3JvdW5kOiBwYWxldHRlLmJsYWNrLmJhc2UsXG4gICAgd2FybmluZzogcGFsZXR0ZS55ZWxsb3dbNjAwXSxcbiAgICB3YXJuaW5nRm9yZWdyb3VuZDogcGFsZXR0ZS5ibGFjay5iYXNlLFxuICAgIGZvcjogcGFsZXR0ZS5ibHVlWzUwMF0sXG4gICAgZm9yRm9yZWdyb3VuZDogcGFsZXR0ZS53aGl0ZS5iYXNlLFxuICAgIGFnYWluc3Q6IHBhbGV0dGUub3JhbmdlWzUwMF0sXG4gICAgYWdhaW5zdEZvcmVncm91bmQ6IHBhbGV0dGUuYmxhY2suYmFzZSxcbiAgICBzb2NpYWw6IHBhbGV0dGUucHVycGxlWzYwMF0sXG4gICAgc29jaWFsRm9yZWdyb3VuZDogcGFsZXR0ZS5ibGFjay5iYXNlLFxuICB9LFxuICBkYXJrOiB7XG4gICAgYmFja2dyb3VuZDogcGFsZXR0ZS5ibGFjay5iYXNlLFxuICAgIGZvcmVncm91bmQ6IHBhbGV0dGUud2hpdGUuYmFzZSxcbiAgICBjYXJkOiBwYWxldHRlLmJsYWNrLmJhc2UsXG4gICAgY2FyZEZvcmVncm91bmQ6IHBhbGV0dGUud2hpdGUuYmFzZSxcbiAgICBwb3BvdmVyOiBwYWxldHRlLmJsYWNrLmJhc2UsXG4gICAgcG9wb3ZlckZvcmVncm91bmQ6IHBhbGV0dGUud2hpdGUuYmFzZSxcbiAgICBwcmltYXJ5OiB7XG4gICAgICBERUZBVUxUOiBwYWxldHRlLmdyYXlbNTBdLFxuICAgICAgLi4ucGFsZXR0ZS5ncmF5LFxuICAgIH0sXG4gICAgcHJpbWFyeUZvcmVncm91bmQ6IHBhbGV0dGUuYmxhY2suYmFzZSxcbiAgICBzZWNvbmRhcnk6IHBhbGV0dGUud2hpdGUuYmFzZSxcbiAgICBzZWNvbmRhcnlGb3JlZ3JvdW5kOiBwYWxldHRlLmdyYXlbNDAwXSxcbiAgICBtdXRlZDogcGFsZXR0ZS5ncmF5WzgwMF0sXG4gICAgbXV0ZWRGb3JlZ3JvdW5kOiBwYWxldHRlLmdyYXlbNTAwXSxcbiAgICBhY2NlbnQ6IHBhbGV0dGUuYmx1ZVs1MDBdLFxuICAgIGFjY2VudEZvcmVncm91bmQ6IHBhbGV0dGUud2hpdGUuYmFzZSxcbiAgICBkZXN0cnVjdGl2ZTogcGFsZXR0ZS5yZWRbNTAwXSxcbiAgICBkZXN0cnVjdGl2ZUZvcmVncm91bmQ6IHBhbGV0dGUud2hpdGUuYmFzZSxcbiAgICBib3JkZXI6IHBhbGV0dGUud2hpdGUuYmFzZSxcbiAgICBpbnB1dDogcGFsZXR0ZS53aGl0ZS5iYXNlLFxuICAgIHJpbmc6IHBhbGV0dGUud2hpdGUuYmFzZSxcbiAgICByYWRpdXM6IHJhZGl1c1ZhbHVlLFxuICAgIC8vIGN1c3RvbSBhdHRyaWJ1dGVzXG4gICAgc3VjY2VzczogcGFsZXR0ZS5ncmVlbls1MDBdLFxuICAgIHN1Y2Nlc3NGb3JlZ3JvdW5kOiBwYWxldHRlLmJsYWNrLmJhc2UsXG4gICAgd2FybmluZzogcGFsZXR0ZS55ZWxsb3dbNjAwXSxcbiAgICB3YXJuaW5nRm9yZWdyb3VuZDogcGFsZXR0ZS5ibGFjay5iYXNlLFxuICAgIGZvcjogcGFsZXR0ZS5ibHVlWzYwMF0sXG4gICAgZm9yRm9yZWdyb3VuZDogcGFsZXR0ZS53aGl0ZS5iYXNlLFxuICAgIGFnYWluc3Q6IHBhbGV0dGUub3JhbmdlWzYwMF0sXG4gICAgYWdhaW5zdEZvcmVncm91bmQ6IHBhbGV0dGUuYmxhY2suYmFzZSxcbiAgICBzb2NpYWw6IHBhbGV0dGUucHVycGxlWzYwMF0sXG4gICAgc29jaWFsRm9yZWdyb3VuZDogcGFsZXR0ZS5ibGFjay5iYXNlLFxuICB9LFxufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbWV0YXN1ZG8vd29ya3NwYWNlL2ludHV0aW9uL3YyL2ludHVpdGlvbi10cy9wYWNrYWdlcy8xdWkvc3JjL3N0eWxlc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL21ldGFzdWRvL3dvcmtzcGFjZS9pbnR1dGlvbi92Mi9pbnR1aXRpb24tdHMvcGFja2FnZXMvMXVpL3NyYy9zdHlsZXMvdXRpbHMudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL21ldGFzdWRvL3dvcmtzcGFjZS9pbnR1dGlvbi92Mi9pbnR1aXRpb24tdHMvcGFja2FnZXMvMXVpL3NyYy9zdHlsZXMvdXRpbHMudHNcIjtpbXBvcnQgeyBjbHN4LCB0eXBlIENsYXNzVmFsdWUgfSBmcm9tICdjbHN4J1xuaW1wb3J0IHsgdHdNZXJnZSB9IGZyb20gJ3RhaWx3aW5kLW1lcmdlJ1xuXG5leHBvcnQgZnVuY3Rpb24gY24oLi4uaW5wdXRzOiBDbGFzc1ZhbHVlW10pIHtcbiAgcmV0dXJuIHR3TWVyZ2UoY2xzeChpbnB1dHMpKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY29sb3JNaXgoY29sb3I6IHN0cmluZywgb3BhY2l0eT86IG51bWJlcikge1xuICByZXR1cm4gYGNvbG9yLW1peChpbiBzcmdiLCB2YXIoLS0ke2NvbG9yfSkgY2FsYygke29wYWNpdHkgfHwgJzxhbHBoYS12YWx1ZT4nfSAqIDEwMCUpLCB0cmFuc3BhcmVudClgXG59XG5cbmV4cG9ydCBlbnVtIFRoZW1lIHtcbiAgREFSSyA9ICdkYXJrJyxcbiAgTElHSFQgPSAnbGlnaHQnLFxuICBTWVNURU0gPSAnc3lzdGVtJyxcbn1cblxuZXhwb3J0IGNvbnN0IHRoZW1lc0xpc3Q6IEFycmF5PFRoZW1lPiA9IE9iamVjdC52YWx1ZXMoVGhlbWUpXG5cbmV4cG9ydCBmdW5jdGlvbiBpc1RoZW1lKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgVGhlbWUge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiB0aGVtZXNMaXN0LmluY2x1ZGVzKHZhbHVlIGFzIFRoZW1lKVxufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbWV0YXN1ZG8vd29ya3NwYWNlL2ludHV0aW9uL3YyL2ludHVpdGlvbi10cy9wYWNrYWdlcy8xdWkvc3JjL3N0eWxlc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL21ldGFzdWRvL3dvcmtzcGFjZS9pbnR1dGlvbi92Mi9pbnR1aXRpb24tdHMvcGFja2FnZXMvMXVpL3NyYy9zdHlsZXMvdGhlbWUtcHJlc2V0LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9tZXRhc3Vkby93b3Jrc3BhY2UvaW50dXRpb24vdjIvaW50dWl0aW9uLXRzL3BhY2thZ2VzLzF1aS9zcmMvc3R5bGVzL3RoZW1lLXByZXNldC50c1wiO2ltcG9ydCBjb250YWluZXJRdWVyaWVzIGZyb20gJ0B0YWlsd2luZGNzcy9jb250YWluZXItcXVlcmllcydcbmltcG9ydCB0eXBlIHsgQ29uZmlnIH0gZnJvbSAndGFpbHdpbmRjc3MnXG5pbXBvcnQgYW5pbWF0ZVBsdWdpbiBmcm9tICd0YWlsd2luZGNzcy1hbmltYXRlJ1xuXG5pbXBvcnQgeyB0aGVtZVBsdWdpbiB9IGZyb20gJy4vdGhlbWUtcGx1Z2luJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGRhcmtNb2RlOiBbJ2NsYXNzJ10sXG4gIGNvbnRlbnQ6IFtcbiAgICAnLi9jb21wb25lbnRzLyoqLyoue3RzLHRzeH0nLCAvLyBJbmNsdWRlIGFsbCBUeXBlU2NyaXB0IGFuZCBUU1ggZmlsZXMgaW4gY29tcG9uZW50c1xuICAgICcuL2NvbXBvbmVudHMvKiovKi57dHMsdHN4fScsIC8vIEluY2x1ZGUgYWxsIFR5cGVTY3JpcHQgYW5kIFRTWCBmaWxlcyBpbiB0aGUgdWkgZGlyZWN0b3J5XG4gICAgJy4vKiovKi50c3gnLCAvLyBJbmNsdWRlIGFsbCBUU1ggZmlsZXMgaW4gdGhlIGVudGlyZSBwYWNrYWdlXG4gICAgJy4vaW5kZXgudHMnLCAvLyBJbmNsdWRlIHRoZSBpbmRleCBmaWxlIGlmIGl0J3MgdXNlZCBmb3IgZXhwb3J0c1xuICBdLFxuICBwbHVnaW5zOiBbdGhlbWVQbHVnaW4sIGFuaW1hdGVQbHVnaW4sIGNvbnRhaW5lclF1ZXJpZXNdLFxufSBzYXRpc2ZpZXMgQ29uZmlnXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQW9ZLFNBQVMsY0FBYyxhQUFhO0FBQ3hhLFNBQVMsc0JBQXNCO0FBQy9CLE9BQU8sa0JBQWtCO0FBQ3pCLFNBQVMsa0JBQWtCO0FBQzNCLE9BQU8saUJBQWlCO0FBQ3hCLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sYUFBYTtBQUNwQixPQUFPLG1CQUFtQjs7O0FDUDhXLElBQU0sUUFBUTtBQUN0WixJQUFNLFFBQVE7QUFFUCxJQUFNLFVBQVU7QUFBQSxFQUNyQixPQUFPO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixLQUFLLFFBQVEsS0FBSztBQUFBLElBQ2xCLEtBQUssUUFBUSxLQUFLO0FBQUEsSUFDbEIsS0FBSyxRQUFRLEtBQUs7QUFBQSxJQUNsQixLQUFLLFFBQVEsS0FBSztBQUFBLElBQ2xCLEtBQUssUUFBUSxLQUFLO0FBQUEsSUFDbEIsS0FBSyxRQUFRLEtBQUs7QUFBQSxJQUNsQixLQUFLLFFBQVEsS0FBSztBQUFBLElBQ2xCLEtBQUssUUFBUSxLQUFLO0FBQUEsSUFDbEIsS0FBSyxRQUFRLEtBQUs7QUFBQSxJQUNsQixJQUFJLFFBQVEsS0FBSztBQUFBLElBQ2pCLElBQUksUUFBUSxLQUFLO0FBQUEsRUFDbkI7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLEtBQUssUUFBUSxLQUFLO0FBQUEsSUFDbEIsS0FBSyxRQUFRLEtBQUs7QUFBQSxJQUNsQixLQUFLLFFBQVEsS0FBSztBQUFBLElBQ2xCLEtBQUssUUFBUSxLQUFLO0FBQUEsSUFDbEIsS0FBSyxRQUFRLEtBQUs7QUFBQSxJQUNsQixLQUFLLFFBQVEsS0FBSztBQUFBLElBQ2xCLEtBQUssUUFBUSxLQUFLO0FBQUEsSUFDbEIsS0FBSyxRQUFRLEtBQUs7QUFBQSxJQUNsQixLQUFLLFFBQVEsS0FBSztBQUFBLElBQ2xCLElBQUksUUFBUSxLQUFLO0FBQUEsSUFDakIsSUFBSSxRQUFRLEtBQUs7QUFBQSxFQUNuQjtBQUFBLEVBQ0EsTUFBTTtBQUFBLElBQ0osSUFBSTtBQUFBLElBQ0osS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLEVBQ1A7QUFBQSxFQUNBLEtBQUs7QUFBQSxJQUNILElBQUk7QUFBQSxJQUNKLEtBQUs7QUFBQSxJQUNMLEtBQUs7QUFBQSxJQUNMLEtBQUs7QUFBQSxJQUNMLEtBQUs7QUFBQSxJQUNMLEtBQUs7QUFBQSxJQUNMLEtBQUs7QUFBQSxJQUNMLEtBQUs7QUFBQSxJQUNMLEtBQUs7QUFBQSxJQUNMLEtBQUs7QUFBQSxJQUNMLEtBQUs7QUFBQSxFQUNQO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixJQUFJO0FBQUEsSUFDSixLQUFLO0FBQUEsSUFDTCxLQUFLO0FBQUEsSUFDTCxLQUFLO0FBQUEsSUFDTCxLQUFLO0FBQUEsSUFDTCxLQUFLO0FBQUEsSUFDTCxLQUFLO0FBQUEsSUFDTCxLQUFLO0FBQUEsSUFDTCxLQUFLO0FBQUEsSUFDTCxLQUFLO0FBQUEsSUFDTCxLQUFLO0FBQUEsRUFDUDtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sSUFBSTtBQUFBLElBQ0osS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLEVBQ1A7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLElBQUk7QUFBQSxJQUNKLEtBQUs7QUFBQSxJQUNMLEtBQUs7QUFBQSxJQUNMLEtBQUs7QUFBQSxJQUNMLEtBQUs7QUFBQSxJQUNMLEtBQUs7QUFBQSxJQUNMLEtBQUs7QUFBQSxJQUNMLEtBQUs7QUFBQSxJQUNMLEtBQUs7QUFBQSxJQUNMLEtBQUs7QUFBQSxJQUNMLEtBQUs7QUFBQSxFQUNQO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDSCxJQUFJO0FBQUEsSUFDSixLQUFLO0FBQUEsSUFDTCxLQUFLO0FBQUEsSUFDTCxLQUFLO0FBQUEsSUFDTCxLQUFLO0FBQUEsSUFDTCxLQUFLO0FBQUEsSUFDTCxLQUFLO0FBQUEsSUFDTCxLQUFLO0FB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
