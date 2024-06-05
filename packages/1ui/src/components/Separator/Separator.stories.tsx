// Import React
import React from 'react'

// Import Storybook meta and StoryObj type
import type { Meta, StoryObj } from '@storybook/react'

// Import your actual component
import { Separator } from './Separator'

// Setup meta for the Storybook
const meta: Meta<typeof Separator> = {
  title: 'Components/Separator',
  component: Separator,
}

export default meta

// Define types for your stories
type Story = StoryObj<typeof Separator>

// Example story for the default state
export const BasicUsage: Story = {
  args: {
    // Define default props here, if any
  },
  render: (args) => <Separator {...args} />,
}
