import type { Meta, StoryObj } from '@storybook/react'
import { ListCard } from 'components/ListCard'

import { ExploreListGrid } from './ExploreListGrid'

const meta: Meta<typeof ExploreListGrid> = {
  title: 'Components/Lists/ExploreListGrid',
  component: ExploreListGrid,
}

export default meta

type Story = StoryObj<typeof ExploreListGrid>

const MockLink = ({ children }: { children: React.ReactNode }) => (
  <span className="w-full cursor-pointer">{children}</span>
)

export const BasicUsage: Story = {
  args: {},
  render: (args) => (
    <div className="w-full max-w-[1400px]">
      <ExploreListGrid {...args}>
        <ListCard
          displayName="Best Crypto Trackers"
          imgSrc="https://avatars.githubusercontent.com/u/94311139?s=200&v=4"
          identitiesCount={45}
          buttonWrapper={(button) => <MockLink>{button}</MockLink>}
        />
        <ListCard
          displayName="Top DeFi Platforms"
          imgSrc="https://avatars.githubusercontent.com/u/94311139?s=200&v=4"
          identitiesCount={45}
          buttonWrapper={(button) => <MockLink>{button}</MockLink>}
        />
      </ExploreListGrid>
    </div>
  ),
}
