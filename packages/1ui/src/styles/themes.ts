import { palette } from './palette'

const radiusValue = '0.5rem'

export const themes = {
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
  },
}
