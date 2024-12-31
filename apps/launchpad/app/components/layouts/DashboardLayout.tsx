import { useEffect } from 'react'

import { useAppShell } from './AppShellContext'
import { BaseLayoutProps } from './types'

export function DashboardLayout({ children }: BaseLayoutProps) {
  const { setLayoutVariant } = useAppShell()

  useEffect(() => {
    setLayoutVariant('default')
  }, [setLayoutVariant])

  return <>{children}</>
}
