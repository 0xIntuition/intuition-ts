// Import React
import React from 'react'

// Import Storybook meta and StoryObj type
import type { Meta, StoryObj } from '@storybook/react'

// Import your actual component
import { IdentityContentRow } from './IdentityContentRow'

// Setup meta for the Storybook
const meta: Meta<typeof IdentityContentRow> = {
  title: 'Components/IdentityContentRow',
  component: IdentityContentRow,
}

export default meta

// Define types for your stories
type Story = StoryObj<typeof IdentityContentRow>

// Example story for the default state
export const BasicUsage: Story = {
  args: {
    // Define default props here, if any
  },
  render: (args) => <IdentityContentRow {...args} />,
}
