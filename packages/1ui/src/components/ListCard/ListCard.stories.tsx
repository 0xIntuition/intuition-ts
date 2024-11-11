import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { ListCard } from './ListCard'

const meta: Meta<typeof ListCard> = {
  title: 'Components/Lists/ListCard',
  component: ListCard,
}

export default meta

type Story = StoryObj<typeof ListCard>

export const BasicUsage: Story = {
  args: {
    displayName: 'My Favorite Claims',
    imgSrc: 'https://avatars.githubusercontent.com/u/94311139?s=200&v=4',
    identitiesCount: 42,
    onViewClick: () => console.log('View clicked'),
  },
  render: (args) => <ListCard {...args} />,
}

export const NoImage: Story = {
  args: {
    displayName: 'List Without Image',
    identitiesCount: 15,
    onViewClick: () => console.log('View clicked'),
  },
}

export const LongTitle: Story = {
  args: {
    displayName:
      'This is a very long list title that should be truncated properly using the Trunctacular component',
    imgSrc: 'https://avatars.githubusercontent.com/u/94311139?s=200&v=4',
    identitiesCount: 42,
    onViewClick: () => console.log('View clicked'),
  },
}
