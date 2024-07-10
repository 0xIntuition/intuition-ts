import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'
import { Currency, Identity } from 'types'

import { IdentityCard } from './IdentityCard'

const meta: Meta<typeof IdentityCard> = {
  title: 'Components/Identity/IdentityCard',
  component: IdentityCard,
  argTypes: {
    variant: {
      description: 'Variant of avatar',
      options: Object.values(Identity),
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'user' },
      },
      control: 'select',
    },
    avatarSrc: {
      type: 'string',
      description: 'Avatar image source',
    },
    name: {
      type: 'string',
      description: 'Name of the identity',
    },
    value: {
      type: 'number',
      description: 'Value associated to identity',
    },
    currency: {
      description: 'Currency of the value provided',
      options: Object.values(Currency),
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'ETH' },
      },
      control: 'select',
    },
    walletAddress: {
      type: 'string',
      description: 'Wallet address of identity',
    },
  },
}

export default meta

type Story = StoryObj<typeof IdentityCard>

export const BasicUsage: Story = {
  args: {
    variant: 'user',
    avatarSrc:
      'https://m.media-amazon.com/images/M/MV5BNDhiMWYzMjgtNTRiYi00ZTA3LThlODctNDRkMDk0NzFkMWI3L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNTg0MTkzMzA@._V1_.jpg',
    name: 'Super Dave',
    value: 4.123,
    currency: 'ETH',
    walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
  },
  render: (args) => <IdentityCard {...args} />,
}

export const Entity: Story = {
  render: () => (
    <IdentityCard
      variant="non-user"
      avatarSrc="https://avatars.githubusercontent.com/u/94311139?s=200&v=4"
      name="Intuition"
      value={7.892}
      currency="ETH"
      walletAddress="0x1234567890abcdef1234567890abcdef12345678"
    />
  ),
}
