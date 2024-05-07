import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Avatar, AvatarImage, AvatarFallback } from './Avatar'

const meta = {
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
      description: 'Image URL',
      control: false,
    },
    alt: {
      type: 'string',
      description: 'Alternate text',
      control: false,
    },
  },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const BasicUsage: Story = {
  // Leave the curly braces, even if empty (needed for code-gen)
  // eslint-disable-next-line
  render: ({}) => (
    <Avatar>
      <AvatarImage
        src="https://avatars.githubusercontent.com/u/94311139?s=200&v=4"
        alt="intuition"
      />
      <AvatarFallback>IN</AvatarFallback>
    </Avatar>
  ),
}

export const Fallback: Story = {
  // Leave the curly braces, even if empty (needed for code-gen)
  // eslint-disable-next-line
  render: ({}) => (
    <Avatar>
      <AvatarImage src="broken-link" alt="broken-link" />
      <AvatarFallback>IN</AvatarFallback>
    </Avatar>
  ),
}
