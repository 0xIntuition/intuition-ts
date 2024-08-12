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
        <div className="h-max flex-grow justify-center flex w-full">
          {children}
        </div>
      </SidebarNav>
    </div>
  )
}

export default RootLayout
