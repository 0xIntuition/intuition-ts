import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Icon, IconName } from '..'
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
  render: (args) => (
    <Badge {...args}>
      <Icon name={IconName.tag} className="h-3 w-3" />
      0.0005 ETH
    </Badge>
  ),
}

export const Success: Story = {
  render: () => (
    <Badge variant="success">
      <Icon name={IconName.tag} className="h-3 w-3" />
      0.0005 ETH
    </Badge>
  ),
}

export const Accent: Story = {
  render: () => (
    <Badge variant="accent">
      <Icon name={IconName.tag} className="h-3 w-3" />
      0.0005 ETH
    </Badge>
  ),
}

export const Social: Story = {
  render: () => (
    <Badge variant="social">
      <Icon name={IconName.tag} className="h-3 w-3" />
      0.0005 ETH
    </Badge>
  ),
}

export const Warning: Story = {
  render: () => (
    <Badge variant="warning">
      <Icon name={IconName.tag} className="h-3 w-3" />
      0.0005 ETH
    </Badge>
  ),
}

export const Against: Story = {
  render: () => (
    <Badge variant="against">
      <Icon name={IconName.tag} className="h-3 w-3" />
      0.0005 ETH
    </Badge>
  ),
}

export const For: Story = {
  render: () => (
    <Badge variant="for">
      <Icon name={IconName.tag} className="h-3 w-3" />
      0.0005 ETH
    </Badge>
  ),
}

export const Destructive: Story = {
  render: () => (
    <Badge variant="destructive">
      <Icon name={IconName.tag} className="h-3 w-3" />
      0.0005 ETH
    </Badge>
  ),
}
