import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { ListIdentityCard } from './ListIdentityCard'

const meta: Meta<typeof ListIdentityCard> = {
  title: 'Components/Lists/ListIdentityCard',
  component: ListIdentityCard,
}

export default meta

type Story = StoryObj<typeof ListIdentityCard>

export const BasicUsage: Story = {
  args: {
    displayName: 'Best Crypto Portfolio Trackers',
    imgSrc: 'https://avatars.githubusercontent.com/u/94311139?s=200&v=4',
    identitiesCount: 45,
    savedAmount: '0.047',
    onSaveClick: () => alert('Best Crypto Portfolio Trackers saved!'),
    isSaved: true,
  },
  render: (args) => (
    <div className="w-[250px]">
      <ListIdentityCard {...args} />
    </div>
  ),
}
