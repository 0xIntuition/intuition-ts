import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Badge, BadgeVariant } from './Badge'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  argTypes: {
    variant: {
      description: 'Variant of badge',
      options: Object.values(BadgeVariant),
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
  render: (args) => <Badge {...args}>0.0005 ETH</Badge>,
}

export const Success: Story = {
  render: () => <Badge variant="success">0.0005 ETH</Badge>,
}

export const Accent: Story = {
  render: () => <Badge variant="accent">0.0005 ETH</Badge>,
}

export const Social: Story = {
  render: () => <Badge variant="social">0.0005 ETH</Badge>,
}

export const Warning: Story = {
  render: () => <Badge variant="warning">0.0005 ETH</Badge>,
}

export const Against: Story = {
  render: () => <Badge variant="against">0.0005 ETH</Badge>,
}

export const For: Story = {
  render: () => <Badge variant="for">0.0005 ETH</Badge>,
}

export const Destructive: Story = {
  render: () => <Badge variant="destructive">0.0005 ETH</Badge>,
}
