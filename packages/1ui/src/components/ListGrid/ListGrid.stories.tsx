import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { ListGrid } from './ListGrid'

const meta: Meta<typeof ListGrid> = {
  title: 'Components/Lists/ListGrid',
  component: ListGrid,
}

export default meta

type Story = StoryObj<typeof ListGrid>

export const BasicUsage: Story = {
  args: {
    identities: [
      {
        displayName: 'Best Crypto Portfolio Trackers',
        image: 'https://avatars.githubusercontent.com/u/94311139?s=200&v=4"',
        identitiesCount: 45,
        savedAmount: '0.047',
      },
      {
        displayName: 'Top Decentralized Finance Platforms',
        image: 'https://avatars.githubusercontent.com/u/94311139?s=200&v=4"',
        identitiesCount: 45,
        savedAmount: '0.047',
      },
      {
        displayName: 'Best Crypto Portfolio Trackers',
        image: 'https://avatars.githubusercontent.com/u/94311139?s=200&v=4"',
        identitiesCount: 45,
        savedAmount: '0.047',
      },
      {
        displayName: 'Top Decentralized Finance Platforms',
        image: 'https://avatars.githubusercontent.com/u/94311139?s=200&v=4"',
        identitiesCount: 45,
        savedAmount: '0.047',
      },
    ],
  },
  render: (args) => (
    <div className="w-[800px]">
      <ListGrid {...args} />
    </div>
  ),
}
