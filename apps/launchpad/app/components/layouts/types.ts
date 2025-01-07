import { ReactNode } from 'react'

export interface BaseLayoutProps {
  children: ReactNode
  fillWidth?: boolean
}

export type LayoutVariant = 'default' | 'narrow' | 'wide'
export type PaddingVariant = 'default' | 'none' | 'compact'

export interface LayoutConfig {
  maxWidth: {
    default: string
    narrow: string
    wide: string
  }
  padding: {
    default: string
    none: string
    compact: string
  }
}

export const layoutConfig: LayoutConfig = {
  maxWidth: {
    default: 'max-w-screen-xl',
    narrow: 'max-w-screen-md',
    wide: 'max-w-screen-2xl',
  },
  padding: {
    default: 'px-4 sm:px-6 lg:px-8 py-6',
    none: 'p-0',
    compact: 'p-4',
  },
}
