import * as React from 'react'

import { SidebarProvider } from '@0xintuition/1ui'

import { Outlet } from '@remix-run/react'

import { AppSidebar } from '../components/AppSidebar'

export default function AppLayout() {
  return (
    <SidebarProvider>
      <div className="flex">
        <AppSidebar />
        <main className="relative ml-[16rem] flex min-h-screen w-[calc(100%-16rem)] flex-col antialiased bg-[#131313]">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  )
}
