import type { Meta, StoryObj } from '@storybook/react'
import { ListCard } from 'components/ListCard'

import { ListGrid } from './ListGrid'

const meta: Meta<typeof ListGrid> = {
  title: 'Components/Lists/ListGrid',
  component: ListGrid,
}

export default meta

type Story = StoryObj<typeof ListGrid>

const MockLink = ({ children }: { children: React.ReactNode }) => (
  <span className="w-full cursor-pointer">{children}</span>
)

export const BasicUsage: Story = {
  args: {},
  render: (args) => (
    <ListGrid {...args}>
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
    </ListGrid>
  ),
}
