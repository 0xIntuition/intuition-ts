import * as React from 'react'

import { cn, SidebarInset, SidebarProvider } from '@0xintuition/1ui'

import { AppSidebar } from '../app-sidebar'
import { AppShellProvider, useAppShell } from './app-shell-context'
import { BaseLayoutProps, layoutConfig } from './types'

function LoadingSpinner() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-accent border-t-transparent" />
    </div>
  )
}

interface AppShellContentProps extends BaseLayoutProps {
  suspense?: boolean
}

function AppShellContent({ children, suspense = true }: AppShellContentProps) {
  const { layoutVariant, paddingVariant } = useAppShell()

  const content = (
    <main className="flex min-h-screen flex-1 bg-[#131313] transition-all duration-200">
      <div className="flex w-full flex-col">
        <div
          className={cn(
            'flex flex-col w-full max-w-[1440px] mx-auto space-y-6',
            layoutConfig.maxWidth[layoutVariant],
            layoutConfig.padding[paddingVariant],
          )}
        >
          {children}
        </div>
      </div>
    </main>
  )

  if (suspense) {
    return (
      <React.Suspense fallback={<LoadingSpinner />}>{content}</React.Suspense>
    )
  }

  return content
}

function AppShellInner({ children }: BaseLayoutProps) {
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': '16rem',
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset>
        <AppShellContent>{children}</AppShellContent>
      </SidebarInset>
    </SidebarProvider>
  )
}

export function AppShell({ children }: BaseLayoutProps) {
  return (
    <AppShellProvider>
      <AppShellInner>{children}</AppShellInner>
    </AppShellProvider>
  )
}
