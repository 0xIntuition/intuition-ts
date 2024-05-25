import * as React from 'react'

import { SIDEBAR_LOCAL_STORAGE_VARIABLE } from '../constants'

interface ISidebarLayoutContext {
  isCollapsed: boolean | undefined
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}

const SidebarLayoutContext = React.createContext<ISidebarLayoutContext>({
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
  const [isCollapsed, setIsCollapsed] = React.useState(
    localStorage.getItem(SIDEBAR_LOCAL_STORAGE_VARIABLE) === 'true',
  )

  return (
    <SidebarLayoutContext.Provider
      value={{ isCollapsed, setIsCollapsed }}
      {...props}
    ></SidebarLayoutContext.Provider>
  )
}
