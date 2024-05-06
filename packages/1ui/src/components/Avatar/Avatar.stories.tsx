import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Avatar, AvatarImage, AvatarFallback } from './Avatar'

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  subcomponents: { AvatarImage, AvatarFallback },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
}

export const Fallback: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="unknown" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
}
