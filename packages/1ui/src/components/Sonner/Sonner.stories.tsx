// Import React
import React from 'react'

// Import Storybook meta and StoryObj type
import type { Meta, StoryObj } from '@storybook/react'

// Import your actual component
import { Sonner } from './Sonner'

// Setup meta for the Storybook
const meta: Meta<typeof Sonner> = {
  title: 'Components/Sonner',
  component: Sonner,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A short description of the component goes here.',
      },
    },
  },
}

export default meta

// Define types for your stories
type Story = StoryObj<typeof Sonner>

// Example story for the default state
export const BasicUsage: Story = {
  render: (args) => <Sonner {...args} />,
  args: {
    // Define default props here, if any
  },
}
