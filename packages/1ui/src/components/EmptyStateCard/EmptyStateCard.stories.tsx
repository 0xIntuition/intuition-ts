import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'
import { Button } from 'components/Button'

import { EmptyStateCard } from './EmptyStateCard'

const meta: Meta<typeof EmptyStateCard> = {
  title: 'Components/EmptyStateCard',
  component: EmptyStateCard,
}

export default meta

type Story = StoryObj<typeof EmptyStateCard>

export const BasicUsage: Story = {
  args: {},
  render: () => (
    <div className="w-[600px]">
      <EmptyStateCard message="You have no stake positions." />
    </div>
  ),
}

export const WithChildren: Story = {
  args: {},
  render: () => (
    <div className="w-[600px]">
      <EmptyStateCard message="You have no stake positions.">
        <Button size="md" onClick={() => console.log('Clicked')}>
          Add Stake
        </Button>
      </EmptyStateCard>
    </div>
  ),
}
