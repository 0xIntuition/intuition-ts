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
    default: 'max-w-[1440px]',
    narrow: 'max-w-[768px]',
    wide: 'max-w-[1920px]',
  },
  padding: {
    default: 'p-10 max-lg:p-6',
    none: 'p-0',
    compact: 'p-4',
  },
}
