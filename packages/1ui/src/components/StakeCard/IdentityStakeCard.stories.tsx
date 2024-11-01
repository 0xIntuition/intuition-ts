import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { IdentityStakeCard } from './IdentityStakeCard'

const meta: Meta<typeof IdentityStakeCard> = {
  title: 'Components/Identity/IdentityStakeCard',
  component: IdentityStakeCard,
}

export default meta

type Story = StoryObj<typeof IdentityStakeCard>

export const BasicUsage: Story = {
  args: {
    tvl: 4.928,
    holders: 69,
    identityDisplayName: '0xintuition',
  },
  render: (args) => (
    <div className="w-[250px]">
      <IdentityStakeCard
        {...args}
        onBuyClick={() => null}
        onViewAllClick={() => null}
      />
    </div>
  ),
}
