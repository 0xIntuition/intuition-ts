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
        displayName: 'Best Crypto Trackers',
        imgSrc: 'https://avatars.githubusercontent.com/u/94311139?s=200&v=4',
        identitiesCount: 45,
        buttonWrapper: (button) => (
          <span
            role="link"
            tabIndex={0}
            onClick={() => alert('Best Crypto Trackers clicked!')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                alert('Best Crypto Portfolio Trackers clicked!')
              }
            }}
          >
            {button}
          </span>
        ),
      },
      {
        displayName: 'Top Decentralized Finance Platforms',
        imgSrc: 'https://avatars.githubusercontent.com/u/94311139?s=200&v=4',
        identitiesCount: 45,
        buttonWrapper: (button) => (
          <span
            role="link"
            tabIndex={0}
            onClick={() =>
              alert('Top Decentralized Finance Platforms clicked!')
            }
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                alert('Top Decentralized Finance Platforms clicked!')
              }
            }}
          >
            {button}
          </span>
        ),
      },
      {
        displayName: 'Best Crypto Portfolio Trackers',
        imgSrc: 'https://avatars.githubusercontent.com/u/94311139?s=200&v=4',
        identitiesCount: 45,
        buttonWrapper: (button) => (
          <span
            role="link"
            tabIndex={0}
            onClick={() => alert('Best Crypto Portfolio Trackers saved!')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                alert('Best Crypto Portfolio Trackers saved!')
              }
            }}
          >
            {button}
          </span>
        ),
      },
      {
        displayName: 'Top Decentralized Finance Platforms',
        imgSrc: 'https://avatars.githubusercontent.com/u/94311139?s=200&v=4',
        identitiesCount: 45,
        buttonWrapper: (button) => (
          <span
            role="link"
            tabIndex={0}
            onClick={() => alert('Top Decentralized Finance Platforms saved!')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                alert('Top Decentralized Finance Platforms saved!')
              }
            }}
          >
            {button}
          </span>
        ),
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
        buttonWrapper={(button) => (
          <span
            role="link"
            tabIndex={0}
            onClick={() => alert('Best Crypto Portfolio Trackers clicked!')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                alert('Best Crypto Portfolio Trackers clicked!')
              }
            }}
            className="w-full"
          >
            {button}
          </span>
        )}
      />,
      <ListCard
        key="2"
        displayName="Decentralized Finance Platforms"
        imgSrc="https://avatars.githubusercontent.com/u/94311139?s=200&v=4"
        identitiesCount={45}
        buttonWrapper={(button) => (
          <span
            role="link"
            tabIndex={0}
            onClick={() => alert('Decentralized Finance Platforms clicked!')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                alert('Decentralized Finance Platforms clicked!')
              }
            }}
            className="w-full"
          >
            {button}
          </span>
        )}
      />,
    ],
  },
  render: (args) => (
    <div className="w-[1000px]">
      <ListGrid {...args} />
    </div>
  ),
}
