import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'
import { Claim } from 'components'

import { ListHeaderCard } from './ListHeaderCard'

const meta: Meta<typeof ListHeaderCard> = {
  title: 'Components/Lists/ListHeaderCard',
  component: ListHeaderCard,
}

export default meta

type Story = StoryObj<typeof ListHeaderCard>

export const BasicUsage: Story = {
  args: {
    label: 'Identities',
    value: 35,
    children: (
      <Claim
        subject={{
          variant: 'non-user',
          label: '0xintuition',
        }}
        predicate={{
          variant: 'non-user',
          label: 'is really',
        }}
        object={{
          variant: 'non-user',
          label: 'cool',
        }}
      />
    ),
  },
  render: (args) => (
    <div className="w-[600px]">
      <ListHeaderCard {...args} />
    </div>
  ),
}
