// Import React
import React from 'react'

// Import Storybook meta and StoryObj type
import type { Meta, StoryObj } from '@storybook/react'

// Import your actual component
import { AlertDialog } from './AlertDialog'

// Setup meta for the Storybook
const meta: Meta<typeof AlertDialog> = {
  title: 'Components/AlertDialog',
  component: AlertDialog,
}

export default meta

// Define types for your stories
type Story = StoryObj<typeof AlertDialog>

// Example story for the default state
export const BasicUsage: Story = {
  args: {
    // Define default props here, if any
  },
  render: (args) => <AlertDialog {...args} />,
}
