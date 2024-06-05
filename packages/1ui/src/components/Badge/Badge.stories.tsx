// Import React
import React from 'react'

// Import Storybook meta and StoryObj type
import type { Meta, StoryObj } from '@storybook/react'

// Import your actual component
import { Badge } from './Badge'

// Setup meta for the Storybook
const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
}

export default meta

// Define types for your stories
type Story = StoryObj<typeof Badge>

// Example story for the default state
export const BasicUsage: Story = {
  args: {
    // Define default props here, if any
  },
  render: (args) => <Badge {...args} />,
}
