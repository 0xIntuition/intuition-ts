import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'
import { Text } from 'components/Text'

import { IdentityContentRow } from './IdentityContentRow'

const meta: Meta<typeof IdentityContentRow> = {
  title: 'Components/IdentityContentRow',
  component: IdentityContentRow,
}

export default meta

type Story = StoryObj<typeof IdentityContentRow>

// Example story for the default state
export const BasicUsage: Story = {
  args: {
    variant: 'user',
    avatarSrc: 'https://avatars.githubusercontent.com/u/94311139?s=200&v=4"',
    name: 'John Doe',
    walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
    amount: '10 ETH',
    totalFollowers: 123,
  },
  render: (args) => (
    <div className="w-[800px]">
      <IdentityContentRow {...args}>
        <Text variant="body" className="text-primary-foreground">
          Extra Content
        </Text>
      </IdentityContentRow>
    </div>
  ),
}

export const EntityVariant: Story = {
  args: {
    variant: 'entity',
    name: 'John Doe',
    walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
    amount: '10 ETH',
    totalFollowers: 123,
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
      <IdentityContentRow {...args}>
        <Text variant="body" className="text-primary-foreground">
          Extra Content
        </Text>
      </IdentityContentRow>
    </div>
  ),
}
