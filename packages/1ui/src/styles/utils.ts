import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export enum Theme {
  DARK = 'dark',
  LIGHT = 'light',
  SYSTEM = 'system',
}

export const themesList: Array<Theme> = Object.values(Theme)

export function isTheme(value: unknown): value is Theme {
  return typeof value === 'string' && themesList.includes(value as Theme)
}
