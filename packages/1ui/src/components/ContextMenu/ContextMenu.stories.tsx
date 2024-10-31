import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '..'
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
        <Button size="lg">Right click me</Button>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Profile</ContextMenuItem>
        <ContextMenuItem>Settings</ContextMenuItem>
        <ContextMenuItem>Logout</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
}
