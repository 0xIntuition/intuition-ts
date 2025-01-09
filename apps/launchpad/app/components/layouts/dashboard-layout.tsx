import { useEffect } from 'react'

import { useAppShell } from './app-shell-context'
import { BaseLayoutProps } from './types'

export function DashboardLayout({ children }: BaseLayoutProps) {
  const { setLayoutVariant } = useAppShell()

  useEffect(() => {
    setLayoutVariant('default')
  }, [setLayoutVariant])

  return <>{children}</>
}
