import * as React from 'react'

import { SIDEBAR_LOCAL_STORAGE_VARIABLE } from '../constants'

interface ISidebarLayoutContext {
  isMobileView: boolean | undefined
  setIsMobileView: React.Dispatch<React.SetStateAction<boolean>>
  isCollapsed: boolean | undefined
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}

const SidebarLayoutContext = React.createContext<ISidebarLayoutContext>({
  isMobileView: undefined,
  setIsMobileView: () => {},
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
    const eventListenerType = 'resize'
    // TODO: Figure out why resize listener is not working
    // TODO: Finalize the width at which to set mobile view
    const handleScreenResize = () => {
      console.log('screen resized')
      const isMobileSizing = window.innerWidth < 1000
      setIsMobileView(isMobileSizing)
      isMobileSizing && setIsCollapsed(true)
    }
    console.log(window)
    window.addEventListener(eventListenerType, handleScreenResize)
    handleScreenResize() // call once to initialize value
    return window.removeEventListener(eventListenerType, handleScreenResize)
  }, [])

  return (
    <SidebarLayoutContext.Provider
      value={{ isMobileView, setIsMobileView, isCollapsed, setIsCollapsed }}
      {...props}
    ></SidebarLayoutContext.Provider>
  )
}
