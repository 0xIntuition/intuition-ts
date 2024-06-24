import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { StakeCard } from './StakeCard'

const meta: Meta<typeof StakeCard> = {
  title: 'Components/StakeCard',
  component: StakeCard,
}

export default meta

type Story = StoryObj<typeof StakeCard>

export const BasicUsage: Story = {
  args: {
    tvl: 4.928,
    holders: 69,
  },
  render: (args) => (
    <div className="w-[250px]">
      <StakeCard
        {...args}
        onBuyClick={() => null}
        onViewAllClick={() => null}
      />
    </div>
  ),
}
