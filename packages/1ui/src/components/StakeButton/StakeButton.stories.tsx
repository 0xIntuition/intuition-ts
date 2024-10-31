// Import React

// Import Storybook meta and StoryObj type
import type { Meta, StoryObj } from '@storybook/react'

// Import your actual component
import { StakeButton, StakeButtonVariant } from './StakeButton'

// Setup meta for the Storybook
const meta: Meta<typeof StakeButton> = {
  title: 'Components/StakeButton',
  component: StakeButton,
  parameters: {
    docs: {
      description: {
        component:
          'Displays a button for inline staking on Claim and Identity row components.',
      },
    },
    controls: {
      exclude: ['className', 'style', 'asChild'],
    },
  },
  argTypes: {
    numPositions: {
      description: 'Number of positions on the vault.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '69' },
      },
      control: 'number',
    },
    variant: {
      description: 'Variant of stake button',
      options: Object.values(StakeButtonVariant),
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
      control: 'select',
    },
  },
}

export default meta

// Define types for your stories
type Story = StoryObj<typeof StakeButton>

// Example story for the default state
export const BasicUsage: Story = {
  args: {
    variant: StakeButtonVariant.identity,
    numPositions: 69,
  },
  render: (args) => <StakeButton {...args} />,
}

export const ClaimFor: Story = {
  args: {
    variant: StakeButtonVariant.claimFor,
    numPositions: 69,
  },
  render: (args) => <StakeButton {...args} />,
}

export const ClaimAgainst: Story = {
  args: {
    variant: StakeButtonVariant.claimAgainst,
    numPositions: 69,
  },
  render: (args) => <StakeButton {...args} />,
}
