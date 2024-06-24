import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { IdentityPosition } from './IdentityPosition'

const meta: Meta<typeof IdentityPosition> = {
  title: 'Components/IdentityPosition',
  component: IdentityPosition,
}

export default meta

type Story = StoryObj<typeof IdentityPosition>

// Example story for the default state
export const UserVariant: Story = {
  args: {
    variant: 'user',
    name: 'John Doe',
    walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
    avatarSrc: 'https://avatars.githubusercontent.com/u/94311139?s=200&v=4"',
    amount: 1.21,
    updatedAt: '2021-10-01T16:00:00Z',
  },
  render: (args) => (
    <div className="w-[800px]">
      <IdentityPosition {...args}></IdentityPosition>
    </div>
  ),
}

export const IdentityVariant: Story = {
  args: {
    variant: 'identity',
    name: 'Amazon',
    walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
    amount: 1.21,
    tags: [
      { label: 'keyboard', value: 34 },
      { label: 'ergonomic', value: 56 },
      { label: 'wireless', value: 12 },
      { label: 'gaming', value: 77 },
      { label: 'work', value: 11 },
      { label: 'home', value: 34 },
    ],
  },
  render: (args) => (
    <div className="w-[800px]">
      <IdentityPosition {...args}></IdentityPosition>
    </div>
  ),
}
