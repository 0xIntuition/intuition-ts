import * as React from 'react'

import { cn, SidebarInset, SidebarProvider } from '@0xintuition/1ui'

import { ClientOnly } from 'remix-utils/client-only'

import { AppSidebar } from '../app-sidebar'
import { AppShellProvider, useAppShell } from './app-shell-context'
import { BaseLayoutProps, layoutConfig } from './types'

interface AppShellContentProps extends BaseLayoutProps {}

function AppShellContent({ children }: AppShellContentProps) {
  const { layoutVariant, paddingVariant } = useAppShell()

  return (
    <div className="flex justify-center w-full max-w-screen-xl mx-auto mt-14 md:mt-6">
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
}

function AppShellInner({ children }: BaseLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <SidebarProvider
        style={
          {
            '--sidebar-width': '16rem',
          } as React.CSSProperties
        }
      >
        <ClientOnly>{() => <AppSidebar />}</ClientOnly>
        <SidebarInset>
          <AppShellContent>{children}</AppShellContent>
        </SidebarInset>
      </SidebarProvider>
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
