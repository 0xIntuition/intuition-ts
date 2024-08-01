import React from 'react'

import { UserPresenter } from '@0xintuition/api'

import SidebarNav from '@components/sidebar-nav'

interface RootLayoutProps {
  userObject: UserPresenter
  children: React.ReactNode
}

const RootLayout: React.FC<RootLayoutProps> = ({ children, userObject }) => {
  return (
    <div className="h-screen flex">
      <SidebarNav userObject={userObject}>
        <div className="max-w-7xl h-max flex grow py-10">{children}</div>
      </SidebarNav>
    </div>
  )
}

export default RootLayout
