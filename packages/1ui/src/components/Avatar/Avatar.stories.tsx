import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'
import { Subject } from 'types'

import { Avatar } from './Avatar'

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    controls: {
      exclude: ['className', 'style'],
    },
  },
  argTypes: {
    variant: {
      description: 'Variant of avatar',
      options: Object.values(Subject),
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'identity' },
      },
      control: 'select',
    },
    src: {
      type: 'string',
      description: 'Image source',
    },
    name: {
      type: 'string',
      description: 'Name of the identity/entity',
    },
  },
}

export default meta

type Story = StoryObj<typeof Avatar>

export const BasicUsage: Story = {
  args: {
    variant: 'identity',
    src: 'https://m.media-amazon.com/images/M/MV5BNDhiMWYzMjgtNTRiYi00ZTA3LThlODctNDRkMDk0NzFkMWI3L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNTg0MTkzMzA@._V1_.jpg',
    name: 'Super Dave',
  },
  render: (args) => <Avatar {...args} />,
}

export const Entity: Story = {
  render: () => (
    <Avatar
      variant="entity"
      src="https://avatars.githubusercontent.com/u/94311139?s=200&v=4"
      name="Intuition"
    />
  ),
}

export const UserFallback: Story = {
  render: () => <Avatar name="Super Dave" />,
}

export const EntityFallback: Story = {
  render: () => <Avatar variant="entity" name="Intuition" />,
}
