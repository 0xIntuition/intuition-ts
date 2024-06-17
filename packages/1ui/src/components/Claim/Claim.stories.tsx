// Import React
import React from 'react'

// Import Storybook meta and StoryObj type
import type { Meta, StoryObj } from '@storybook/react'

// Import your actual component
import { Claim } from './Claim'

// Setup meta for the Storybook
const meta: Meta<typeof Claim> = {
  title: 'Components/Claim',
  component: Claim,
  argTypes: {
    subject: {
      description: 'Subject of the claim',
      table: {
        type: { summary: 'string' },
      },
    },
    predicate: {
      description: 'Predicate of the claim',
      table: {
        type: { summary: 'string' },
      },
    },
    object: {
      description: 'Object of the claim',
      table: {
        type: { summary: 'string' },
      },
    },
    variant: {
      description: 'Variant of component',
      options: ['default', 'user'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
      control: 'select',
    },
    size: {
      description: 'Size of component',
      options: ['sm', 'default', 'md', 'lg', 'xl'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
      control: 'select',
    },
  },
}

export default meta

// Define types for your stories
type Story = StoryObj<typeof Claim>

// Example story for the default state
export const BasicUsage: Story = {
  args: {
    subject: '0xintuition',
    predicate: 'is really',
    object: 'cool',
    variant: 'default',
    size: 'default',
  },
  render: (args) => <Claim {...args} />,
}
