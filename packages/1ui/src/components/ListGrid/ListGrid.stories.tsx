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
        imgSrc: 'https://avatars.githubusercontent.com/u/94311139?s=200&v=4',
        identitiesCount: 45,
        savedAmount: '0.047',
        onSaveClick: () => alert('Best Crypto Portfolio Trackers saved!'),
      },
      {
        displayName: 'Top Decentralized Finance Platforms',
        imgSrc: 'https://avatars.githubusercontent.com/u/94311139?s=200&v=4',
        identitiesCount: 45,
        savedAmount: '0.047',
        onSaveClick: () => alert('Top Decentralized Finance Platforms saved!'),
      },
      {
        displayName: 'Best Crypto Portfolio Trackers',
        imgSrc: 'https://avatars.githubusercontent.com/u/94311139?s=200&v=4',
        identitiesCount: 45,
        savedAmount: '0.047',
        onSaveClick: () => alert('Best Crypto Portfolio Trackers saved!'),
      },
      {
        displayName: 'Top Decentralized Finance Platforms',
        imgSrc: 'https://avatars.githubusercontent.com/u/94311139?s=200&v=4',
        identitiesCount: 45,
        savedAmount: '0.047',
        onSaveClick: () => alert('Top Decentralized Finance Platforms saved!'),
      },
    ],
  },
  render: (args) => (
    <div className="w-[1000px]">
      <ListGrid {...args} />
    </div>
  ),
}

export const UsageWithChildren: Story = {
  args: {
    children: [
      <div key="1" className="flex flex-col items-center">
        <img
          src="https://avatars.githubusercontent.com/u/94311139?s=200&v=4"
          alt="Best Crypto Portfolio Trackers"
          className="mb-4 w-16 h-16"
        />
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">
            Best Crypto Portfolio Trackers
          </h2>
          <p className="text-secondary/50 mb-2">45 identities</p>
        </div>
      </div>,
      <div key="2" className="flex flex-col items-center">
        <img
          src="https://avatars.githubusercontent.com/u/94311139?s=200&v=4"
          alt="Decentralized Finance Platforms"
          className="mb-4 w-16 h-16"
        />
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">
            Decentralized Finance Platforms
          </h2>
          <p className="text-secondary/50 mb-2">45 identities</p>
        </div>
      </div>,
    ],
  },
  render: (args) => (
    <div className="w-[1000px]">
      <ListGrid {...args} />
    </div>
  ),
}
