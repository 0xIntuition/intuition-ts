// Import React
import React from 'react'

// Import Storybook meta and StoryObj type
import type { Meta, StoryObj } from '@storybook/react'

// Import your actual component
import { TransactionStatusCard } from './TransactionStatusCard'

// Setup meta for the Storybook
const meta: Meta<typeof TransactionStatusCard> = {
  title: 'Components/TransactionStatusCard',
  component: TransactionStatusCard,
}

export default meta

// Define types for your stories
type Story = StoryObj<typeof TransactionStatusCard>

// Example story for the default state
export const BasicUsage: Story = {
  args: {
    // Define default props here, if any
  },
  render: (args) => <TransactionStatusCard {...args} />,
}
