import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Badge } from './Badge'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  argTypes: {
    variant: {
      description: 'Variant of badge',
      options: ['default', 'secondary', 'destructive', 'outline'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
      control: 'select',
    },
  },
}

export default meta

type Story = StoryObj<typeof Badge>

export const BasicUsage: Story = {
  args: {
    variant: 'default',
  },
  render: (args) => <Badge {...args}>Badge</Badge>,
}

export const Secondary: Story = {
  render: () => <Badge variant="secondary">Badge</Badge>,
}

export const Destructive: Story = {
  render: () => <Badge variant="destructive">Badge</Badge>,
}

export const Outline: Story = {
  render: () => <Badge variant="outline">Badge</Badge>,
}
