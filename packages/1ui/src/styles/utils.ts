import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function colorMix(color: string, opacity?: number) {
  return `color-mix(in srgb, var(--${color}) calc(${opacity || '<alpha-value>'} * 100%), transparent)`
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
