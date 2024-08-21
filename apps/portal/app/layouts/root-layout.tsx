import React from 'react'

import { UserPresenter } from '@0xintuition/api'

import SidebarNav from '@components/sidebar-nav'
import SiteWideBanner from '@components/site-wide-banner'
import { featureFlagsSchema } from '@server/env'
import { z } from 'zod'

interface RootLayoutProps {
  userObject: UserPresenter
  children: React.ReactNode
  featureFlags: z.infer<typeof featureFlagsSchema>
}

const RootLayout: React.FC<RootLayoutProps> = ({
  children,
  userObject,
  featureFlags,
}) => {
  return (
    <div className="h-screen flex">
      <SidebarNav userObject={userObject}>
        <div className="flex flex-col w-screen">
          <SiteWideBanner featureFlags={featureFlags} />
          <div className="pb-6 flex-grow justify-center flex w-full md:pb-10">
            {children}
          </div>
        </div>
      </SidebarNav>
    </div>
  )
}

export default RootLayout
