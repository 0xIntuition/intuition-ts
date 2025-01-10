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
    default: 'max-w-[1280px]',
    narrow: 'max-w-md',
    wide: 'max-w-[1440px]',
  },
  padding: {
    default: 'px-4 sm:px-6 lg:px-8 py-6',
    none: 'p-0',
    compact: 'p-4',
  },
}
