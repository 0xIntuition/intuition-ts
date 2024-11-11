import type { Meta, StoryObj } from '@storybook/react'
import { ListCard } from 'components/ListCard'

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
        isSaved: true,
      },
      {
        displayName: 'Top Decentralized Finance Platforms',
        imgSrc: 'https://avatars.githubusercontent.com/u/94311139?s=200&v=4',
        identitiesCount: 45,
        savedAmount: '0.047',
        onSaveClick: () => alert('Top Decentralized Finance Platforms saved!'),
        isSaved: false,
      },
      {
        displayName: 'Best Crypto Portfolio Trackers',
        imgSrc: 'https://avatars.githubusercontent.com/u/94311139?s=200&v=4',
        identitiesCount: 45,
        savedAmount: '0.047',
        onSaveClick: () => alert('Best Crypto Portfolio Trackers saved!'),
        isSaved: true,
      },
      {
        displayName: 'Top Decentralized Finance Platforms',
        imgSrc: 'https://avatars.githubusercontent.com/u/94311139?s=200&v=4',
        identitiesCount: 45,
        savedAmount: '0.047',
        onSaveClick: () => alert('Top Decentralized Finance Platforms saved!'),
        isSaved: false,
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
      <ListCard
        key="1"
        displayName="Best Crypto Portfolio Trackers"
        imgSrc="https://avatars.githubusercontent.com/u/94311139?s=200&v=4"
        identitiesCount={45}
        onSaveClick={() => alert('Best Crypto Portfolio Trackers saved!')}
      />,
      <ListCard
        key="2"
        displayName="Decentralized Finance Platforms"
        imgSrc="https://avatars.githubusercontent.com/u/94311139?s=200&v=4"
        identitiesCount={45}
        onSaveClick={() => alert('Decentralized Finance Platforms saved!')}
      />,
    ],
  },
  render: (args) => (
    <div className="w-[1000px]">
      <ListGrid {...args} />
    </div>
  ),
}
