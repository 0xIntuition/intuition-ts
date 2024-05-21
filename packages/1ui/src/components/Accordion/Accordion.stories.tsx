// Import React
import React from 'react'

// Import Storybook meta and StoryObj type
import type { Meta, StoryObj } from '@storybook/react'

// Import your actual component
import { Accordion } from './Accordion'

// Setup meta for the Storybook
const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
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
type Story = StoryObj<typeof Accordion>

// Example story for the default state
export const BasicUsage: Story = {
  render: (args) => <Accordion {...args} />,
  args: {
    // Define default props here, if any
  },
}
