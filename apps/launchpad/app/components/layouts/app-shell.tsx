import * as React from 'react'

import { cn, SidebarInset, SidebarProvider } from '@0xintuition/1ui'

import { AppSidebar } from '../app-sidebar'
import { StatsBar } from '../stats-bar'
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
    <div className="flex justify-center w-full max-w-screen-xl mx-auto">
      <div
        className={cn(
          'flex flex-col w-full space-y-6',
          layoutConfig.maxWidth[layoutVariant],
          layoutConfig.padding[paddingVariant],
        )}
      >
        {children}
      </div>
    </div>
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
    <div className="flex flex-col min-h-screen">
      <StatsBar />
      <div className="flex-1 pt-[52px]">
        <SidebarProvider
          style={
            {
              '--sidebar-width': '16rem',
            } as React.CSSProperties
          }
        >
          <AppSidebar />
          <SidebarInset className="bg-[#131313]">
            <AppShellContent>{children}</AppShellContent>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </div>
  )
}

export function AppShell({ children }: BaseLayoutProps) {
  return (
    <AppShellProvider>
      <AppShellInner>{children}</AppShellInner>
    </AppShellProvider>
  )
}
