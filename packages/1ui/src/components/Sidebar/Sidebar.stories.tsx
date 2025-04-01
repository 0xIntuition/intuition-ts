import type { Meta, StoryObj } from '@storybook/react'
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

const meta: Meta<typeof Sidebar> = {
  title: 'Components/Navigation/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
    },
  },
}

export default meta

type Story = StoryObj<typeof Sidebar>

const navigation = [
  { name: 'Home', icon: IconName.circle },
  { name: 'Dashboard', icon: IconName.circle },
  { name: 'Discover', icon: IconName.circle },
  { name: 'Network', icon: IconName.circle },
]

const bottomNav = [
  { name: 'Developer Docs', icon: IconName.circle },
  { name: 'Github', icon: IconName.circle },
  { name: 'Bulk Uploader', icon: IconName.circle },
  { name: 'Ecosystem', icon: IconName.circle },
]

const SidebarExample = () => {
  return (
    <>
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
                isActive={item.name === 'Network'}
                tooltip={item.name}
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
              <SidebarMenuButton tooltip={item.name}>
                <Icon name={item.icon} className="h-4 w-4" />
                <span>{item.name}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </>
  )
}

export const Default: Story = {
  decorators: [
    (Story) => (
      <SidebarProvider>
        <Story />
      </SidebarProvider>
    ),
  ],
  args: {
    children: <SidebarExample />,
  },
}

export const Collapsible: Story = {
  decorators: [
    (Story) => (
      <SidebarProvider defaultOpen={false}>
        <Story />
      </SidebarProvider>
    ),
  ],
  args: {
    collapsible: 'icon',
    children: <SidebarExample />,
  },
  parameters: {
    docs: {
      description: {
        story:
          'The Sidebar can be configured to collapse into an icon-only mode. Use keyboard shortcut ⌘B/Ctrl+B to toggle.',
      },
    },
  },
}
