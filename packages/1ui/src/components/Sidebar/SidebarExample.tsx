import React from 'react'

import { Avatar } from 'components/Avatar'
import { Icon, IconName } from 'components/Icon'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from './Sidebar'

const navigation = [
  { name: 'Home', icon: IconName.circle },
  { name: 'Dashboard', icon: IconName.circle },
  { name: 'Discover', icon: IconName.circle },
  { name: 'Network', icon: IconName.circle },
]

const bottomNav = [
  { name: 'Developer Docs', icon: IconName.circle },
  { name: 'Github', icon: IconName.github },
  { name: 'Bulk Uploader', icon: IconName.circle },
  { name: 'Ecosystem', icon: IconName.circle },
]

export const SidebarExample = () => {
  const [activeItem, setActiveItem] = React.useState('Network')

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 px-3 py-2">
            <Avatar
              src="https://github.com/shadcn.png"
              name="jojikun.eth"
              className="h-8 w-8"
            />
            <span className="text-sm font-medium">jojikun.eth</span>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarMenu>
            {navigation.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton
                  isActive={activeItem === item.name}
                  onClick={() => setActiveItem(item.name)}
                >
                  <Icon name={item.icon} className="h-4 w-4" />
                  <span>{item.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            {bottomNav.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton>
                  <Icon name={item.icon} className="h-4 w-4" />
                  <span>{item.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  )
}
