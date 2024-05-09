import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Avatar, AvatarImage, AvatarFallback } from './Avatar'

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    controls: {
      exclude: ['className', 'style'],
    },
    docs: {
      description: {
        component:
          'An image element with a fallback for representing the user.',
      },
    },
  },
  argTypes: {
    // eslint-disable-next-line
    // @ts-ignore
    src: {
      type: 'string',
      description: 'Image URL (for AvatarImage)',
      control: false,
    },
    alt: {
      type: 'string',
      description: 'Alternate text (for AvatarImage)',
      control: false,
    },
  },
}

export default meta

type Story = StoryObj<typeof Avatar>

export const BasicUsage: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage
        src="https://avatars.githubusercontent.com/u/94311139?s=200&v=4"
        alt="intuition"
      />
      <AvatarFallback>IN</AvatarFallback>
    </Avatar>
  ),
}

export const Fallback: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="broken-link" alt="broken-link" />
      <AvatarFallback>IN</AvatarFallback>
    </Avatar>
  ),
}
