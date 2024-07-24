import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'
import { Button } from 'components/Button'

import { ErrorStateCard } from './ErrorStateCard'

const meta: Meta<typeof ErrorStateCard> = {
  title: 'Components/ErrorStateCard',
  component: ErrorStateCard,
}

export default meta

type Story = StoryObj<typeof ErrorStateCard>

export const BasicUsage: Story = {
  args: {},
  render: () => (
    <div className="w-[600px]">
      <ErrorStateCard message="An error occured" />
    </div>
  ),
}

export const WithChildren: Story = {
  args: {},
  render: () => (
    <div className="w-[600px]">
      <ErrorStateCard message="An error occured">
        <Button
          size="md"
          onClick={() => console.log('Clicked')}
          variant="destructive"
        >
          Retry
        </Button>
      </ErrorStateCard>
    </div>
  ),
}
