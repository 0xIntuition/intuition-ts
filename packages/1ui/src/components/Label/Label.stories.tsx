import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Label } from './Label'

const meta: Meta<typeof Label> = {
  title: 'Components/Label',
  component: Label,
}

export default meta

type Story = StoryObj<typeof Label>

export const BasicUsage: Story = {
  args: {},
  render: (args) => (
    <Label htmlFor="email" {...args}>
      Your email address
    </Label>
  ),
}
