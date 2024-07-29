import * as React from 'react'

import { SIDEBAR_LOCAL_STORAGE_VARIABLE } from '../constants'

interface ISidebarLayoutContext {
  isMobileView: boolean | undefined
  isCollapsed: boolean | undefined
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}

const SidebarLayoutContext = React.createContext<ISidebarLayoutContext>({
  isMobileView: undefined,
  isCollapsed: undefined,
  setIsCollapsed: () => {},
})

export const useSidebarLayoutContext = () => {
  const context = React.useContext(SidebarLayoutContext)
  if (context.isCollapsed === undefined) {
    throw new Error('Must be used with a SidebarLayoutProvider')
  }
  return context
}

export const SidebarLayoutProvider = ({ ...props }) => {
  const [isMobileView, setIsMobileView] = React.useState(false)
  const [isCollapsed, setIsCollapsed] = React.useState(
    localStorage.getItem(SIDEBAR_LOCAL_STORAGE_VARIABLE) === 'true',
  )

  React.useEffect(() => {
    const handleScreenSizeChange = () => {
      const isViewMobile = window.innerWidth < 1000
      setIsMobileView(isViewMobile)
      if (isViewMobile) {
        setIsCollapsed(true)
      }
    }
    window.addEventListener('resize', handleScreenSizeChange)
    handleScreenSizeChange()
    return window.removeEventListener('resize', handleScreenSizeChange)
  }, [])

  return (
    <SidebarLayoutContext.Provider
      value={{ isMobileView, isCollapsed, setIsCollapsed }}
      {...props}
    ></SidebarLayoutContext.Provider>
  )
}
