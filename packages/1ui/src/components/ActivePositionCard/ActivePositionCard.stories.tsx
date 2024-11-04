import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'
import { ClaimPosition, Currency } from 'types'

import { ActivePositionCard } from './ActivePositionCard'

const meta: Meta<typeof ActivePositionCard> = {
  title: 'Components/ActivePositionCard',
  component: ActivePositionCard,
  argTypes: {
    claimPosition: {
      description: 'Position of claim',
      options: Object.values(ClaimPosition),
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: undefined },
      },
      control: 'select',
    },
    currency: {
      description: 'Currency type',
      options: Object.values(Currency),
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'ETH' },
      },
      control: 'select',
    },
  },
}

export default meta

type Story = StoryObj<typeof ActivePositionCard>

export const BasicUsage: Story = {
  args: {
    value: 0.567,
  },
  render: (args) => (
    <div className="w-[500px]">
      <ActivePositionCard {...args} />
    </div>
  ),
}

export const For: Story = {
  render: () => (
    <div className="w-[500px]">
      <ActivePositionCard value={0.567} claimPosition="for" />
    </div>
  ),
}

export const Against: Story = {
  render: () => (
    <div className="w-[500px]">
      <ActivePositionCard value={0.567} claimPosition="against" />
    </div>
  ),
}
