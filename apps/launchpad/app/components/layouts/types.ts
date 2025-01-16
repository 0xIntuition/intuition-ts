import { ReactNode } from 'react'

export interface BaseLayoutProps {
  children: ReactNode
  fillWidth?: boolean
}

export type LayoutVariant = 'default' | 'narrow'
export type PaddingVariant = 'default' | 'narrow'

export interface LayoutConfig {
  maxWidth: {
    default: string
    narrow: string
  }
  padding: {
    default: string
    narrow: string
  }
}

export const layoutConfig = {
  maxWidth: {
    default: 'max-w-[1200px]',
    narrow: 'max-w-5xl',
  },
  padding: {
    default: 'px-8 py-6',
    narrow: 'px-4 py-4',
  },
} as const
