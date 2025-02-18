import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

import { useIsMobile } from '@0xintuition/1ui'

import { LayoutVariant, PaddingVariant } from './types'

interface AppShellContextType {
  isSidebarOpen: boolean
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
  layoutVariant: LayoutVariant
  setLayoutVariant: (variant: LayoutVariant) => void
  paddingVariant: PaddingVariant
  setPaddingVariant: (variant: PaddingVariant) => void
  isLargeScreen: boolean
}

const AppShellContext = createContext<AppShellContextType | undefined>(
  undefined,
)

export function AppShellProvider({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [layoutVariant, setLayoutVariant] = useState<LayoutVariant>('default')
  const [paddingVariant, setPaddingVariant] =
    useState<PaddingVariant>('default')
  const isMobile = useIsMobile()
  const isLargeScreen = !isMobile

  // Handle responsive states
  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false)
      setLayoutVariant('narrow')
      setPaddingVariant('narrow')
    } else {
      setIsSidebarOpen(true)
      setLayoutVariant('default')
      setPaddingVariant('default')
    }
  }, [isMobile])

  const value = {
    isSidebarOpen,
    toggleSidebar: () => setIsSidebarOpen((prev) => !prev),
    setSidebarOpen: setIsSidebarOpen,
    layoutVariant,
    setLayoutVariant,
    paddingVariant,
    setPaddingVariant,
    isLargeScreen,
  }

  return (
    <AppShellContext.Provider value={value}>
      {children}
    </AppShellContext.Provider>
  )
}

export function useAppShell() {
  const context = useContext(AppShellContext)
  if (context === undefined) {
    throw new Error('useAppShell must be used within an AppShellProvider')
  }
  return context
}
