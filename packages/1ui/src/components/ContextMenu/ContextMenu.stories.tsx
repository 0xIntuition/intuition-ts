import type { Meta, StoryObj } from '@storybook/react'

import { Button, ButtonSize, ButtonVariant, Icon, IconName } from '..'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from './ContextMenu'

const meta: Meta<typeof ContextMenu> = {
  title: 'Components/ContextMenu',
  component: ContextMenu,
  parameters: {
    docs: {
      description: {
        component: 'Displays a context menu triggered by right click.',
      },
    },
    controls: {
      exclude: ['className', 'style', 'asChild'],
    },
  },
}

export default meta

type Story = StoryObj<typeof ContextMenu>

export const BasicUsage: Story = {
  render: (args) => (
    <ContextMenu {...args}>
      <ContextMenuTrigger>
        <Button variant={ButtonVariant.navigation} size={ButtonSize.icon}>
          <Icon name={IconName.context} className="h-4 w-4" />
        </Button>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Profile</ContextMenuItem>
        <ContextMenuItem>Settings</ContextMenuItem>
        <ContextMenuItem>Logout</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
}
