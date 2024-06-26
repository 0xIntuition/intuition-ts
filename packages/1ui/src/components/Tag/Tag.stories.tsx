import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Icon, IconName } from '..'
import { Tag, TagSize, TagVariant } from './Tag'

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  argTypes: {
    variant: {
      description: 'Variant of tag',
      options: Object.values(TagVariant),
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
      control: 'select',
    },
    size: {
      description: 'Size of tag',
      options: Object.values(TagSize),
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
      control: 'select',
    },
  },
}

export default meta

type Story = StoryObj<typeof Tag>

export const BasicUsage: Story = {
  args: {
    variant: 'primary',
    disabled: false,
  },
  render: (args) => (
    <Tag {...args}>
      <Icon name={IconName.circle} className="h-4 w-4" />
      sophie nélisse
      <Icon name={IconName.circle} className="h-4 w-4" />
    </Tag>
  ),
}

export const Success: Story = {
  render: () => (
    <Tag variant="success">
      <Icon name={IconName.circle} className="h-4 w-4" />
      sophie nélisse
      <Icon name={IconName.circle} className="h-4 w-4" />
    </Tag>
  ),
}

export const Accent: Story = {
  render: () => (
    <Tag variant="accent">
      <Icon name={IconName.circle} className="h-4 w-4" />
      sophie nélisse
      <Icon name={IconName.circle} className="h-4 w-4" />
    </Tag>
  ),
}

export const Social: Story = {
  render: () => (
    <Tag variant="social">
      <Icon name={IconName.circle} className="h-4 w-4" />
      sophie nélisse
      <Icon name={IconName.circle} className="h-4 w-4" />
    </Tag>
  ),
}

export const Warning: Story = {
  render: () => (
    <Tag variant="warning">
      <Icon name={IconName.circle} className="h-4 w-4" />
      sophie nélisse
      <Icon name={IconName.circle} className="h-4 w-4" />
    </Tag>
  ),
}

export const Against: Story = {
  render: () => (
    <Tag variant="against">
      <Icon name={IconName.circle} className="h-4 w-4" />
      sophie nélisse
      <Icon name={IconName.circle} className="h-4 w-4" />
    </Tag>
  ),
}

export const For: Story = {
  render: () => (
    <Tag variant="for">
      <Icon name={IconName.circle} className="h-4 w-4" />
      sophie nélisse
      <Icon name={IconName.circle} className="h-4 w-4" />
    </Tag>
  ),
}

export const Destructive: Story = {
  render: () => (
    <Tag variant="destructive">
      <Icon name={IconName.circle} className="h-4 w-4" />
      sophie nélisse
      <Icon name={IconName.circle} className="h-4 w-4" />
    </Tag>
  ),
}
