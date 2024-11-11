import type { Meta, StoryObj } from '@storybook/react'

import { FeaturedListCard } from './FeaturedListCard'

const meta: Meta<typeof FeaturedListCard> = {
  title: 'Components/Lists/FeaturedListCard',
  component: FeaturedListCard,
}

export default meta

type Story = StoryObj<typeof FeaturedListCard>

export const BasicUsage: Story = {
  args: {
    displayName: 'Featured Claims Collection',
    imgSrc: 'https://avatars.githubusercontent.com/u/94311139?s=200&v=4',
    identitiesCount: 42,
    tvl: '4.928',
    holdersCount: 69,
    stakeholders: [
      {
        name: 'John Doe',
        avatar: 'https://avatars.githubusercontent.com/u/94311139?s=200&v=4',
      },
      {
        name: 'Jane Smith',
        avatar: 'https://avatars.githubusercontent.com/u/94311139?s=200&v=4',
      },
    ],
  },
  render: (args) => (
    <div className="w-[600px]">
      <FeaturedListCard {...args} />
    </div>
  ),
}

export const NoStakeholders: Story = {
  args: {
    displayName: 'Featured Claims Without Stakeholders',
    imgSrc: 'https://avatars.githubusercontent.com/u/94311139?s=200&v=4',
    identitiesCount: 42,
    tvl: '4.928',
    holdersCount: 69,
  },
}

export const LongTitle: Story = {
  args: {
    displayName:
      'This is a very long featured list title that should be truncated properly using the Trunctacular component',
    imgSrc: 'https://avatars.githubusercontent.com/u/94311139?s=200&v=4',
    identitiesCount: 42,
    tvl: '4.928',
    holdersCount: 69,
    stakeholders: [
      {
        name: 'John Doe',
        avatar: 'https://avatars.githubusercontent.com/u/94311139?s=200&v=4',
      },
    ],
  },
}
