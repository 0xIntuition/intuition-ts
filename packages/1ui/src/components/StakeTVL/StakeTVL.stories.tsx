import type { Meta, StoryObj } from '@storybook/react'

import { StakeTVL } from './StakeTVL'

const meta: Meta<typeof StakeTVL> = {
  title: 'Components/StakeTVL',
  component: StakeTVL,
  parameters: {
    docs: {
      description: {
        component:
          'Displays TVL (Total Value Locked) information with optional pie chart.',
      },
    },
    controls: {
      exclude: ['className', 'style'],
    },
  },
  argTypes: {
    totalTVL: {
      description: 'Total TVL amount',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '420.69' },
      },
      control: 'number',
    },
    tvlFor: {
      description: 'TVL amount for the "For" position',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '240.69' },
      },
      control: 'number',
    },
    currency: {
      description: 'The currency symbol',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'ETH' },
      },
      control: 'text',
    },
    isClaim: {
      description: 'Whether to show the pie chart',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      control: 'boolean',
    },
  },
}

export default meta

type Story = StoryObj<typeof StakeTVL>

export const BasicUsage: Story = {
  args: {
    totalTVL: '420.69',
    currency: 'ETH',
    isClaim: false,
  },
  render: (args) => <StakeTVL {...args} />,
}

export const WithPieChart: Story = {
  args: {
    totalTVL: '420.69',
    tvlFor: '240.69',
    currency: 'ETH',
    isClaim: true,
  },
  render: (args) => <StakeTVL {...args} />,
}
