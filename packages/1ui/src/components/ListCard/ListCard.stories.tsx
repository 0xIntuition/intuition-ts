import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'
import { Currency } from 'types'

import { ListCard } from './ListCard'

const meta: Meta<typeof ListCard> = {
  title: 'Components/Lists/ListCard',
  component: ListCard,
  argTypes: {
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

type Story = StoryObj<typeof ListCard>

export const BasicUsage: Story = {
  args: {
    displayName: 'My Favorite Claims',
    imgSrc: 'https://avatars.githubusercontent.com/u/94311139?s=200&v=4',
    identitiesCount: 42,
    savedAmount: '4.928',
    currency: 'ETH',
    isSaved: false,
  },
  render: (args) => (
    <div className="w-[300px]">
      <ListCard {...args} />
    </div>
  ),
}

export const SavedList: Story = {
  args: {
    displayName: 'Top Trending Claims',
    imgSrc: 'https://avatars.githubusercontent.com/u/94311139?s=200&v=4',
    identitiesCount: 156,
    savedAmount: '12.345',
    currency: 'ETH',
    isSaved: true,
  },
  render: (args) => (
    <div className="w-[300px]">
      <ListCard {...args} />
    </div>
  ),
}
