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
    buttonWrapper: (button) => (
      <span
        role="link"
        tabIndex={0}
        onClick={() => console.log('View clicked')}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            console.log('View clicked')
          }
        }}
        className="w-full"
      >
        {button}
      </span>
    ),
  },
}

export const NoImage: Story = {
  args: {
    displayName: 'List Without Image',
    identitiesCount: 15,
    buttonWrapper: (button) => (
      <span
        role="link"
        tabIndex={0}
        onClick={() => console.log('View clicked')}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            console.log('View clicked')
          }
        }}
        className="w-full"
      >
        {button}
      </span>
    ),
  },
}

export const LongTitle: Story = {
  args: {
    displayName:
      'This is a very long list title that should be truncated properly using the Trunctacular component',
    imgSrc: 'https://avatars.githubusercontent.com/u/94311139?s=200&v=4',
    identitiesCount: 42,
    buttonWrapper: (button) => (
      <span
        role="link"
        tabIndex={0}
        onClick={() => console.log('View clicked')}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            console.log('View clicked')
          }
        }}
        className="w-full"
      >
        {button}
      </span>
    ),
  },
}
