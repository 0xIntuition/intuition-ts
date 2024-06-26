import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { ClaimPosition } from './ClaimPosition'

const meta: Meta<typeof ClaimPosition> = {
  title: 'Components/ClaimPosition',
  component: ClaimPosition,
}

export default meta

type Story = StoryObj<typeof ClaimPosition>

// Example story for the default state
export const UserVariant: Story = {
  args: {
    variant: 'user',
    position: 'claimFor',
    name: 'John Doe',
    walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
    avatarSrc: 'https://avatars.githubusercontent.com/u/94311139?s=200&v=4"',
    amount: 1.21,
    feesAccrued: 0.005,
    updatedAt: '2021-10-01T16:00:00Z',
  },
  render: (args) => (
    <div className="w-[800px]">
      <ClaimPosition {...args}></ClaimPosition>
    </div>
  ),
}

export const IdentityVariant: Story = {
  args: {
    variant: 'claim',
    position: 'claimAgainst',
    name: 'Amazon',
    walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
    amount: 1.21,
    feesAccrued: 0.005,
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
      <ClaimPosition {...args}></ClaimPosition>
    </div>
  ),
}
