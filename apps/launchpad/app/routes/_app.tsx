import { Outlet } from '@remix-run/react'

import { AppShell } from '../components/layouts/app-shell'

export default function AppLayout() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  )
}
