import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Switch } from '.'
import { Label } from '..'

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
}

export default meta

type Story = StoryObj<typeof Switch>

export const BasicUsage: Story = {
  args: {},
  render: (args) => (
    <div className="flex items-center space-x-3">
      <Switch id="airplane-mode" {...args} />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  ),
}
