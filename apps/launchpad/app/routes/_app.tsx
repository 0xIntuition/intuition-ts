import { Outlet } from '@remix-run/react'

import { AppShell } from '../components/layouts/AppShell'

export default function AppLayout() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  )
}
