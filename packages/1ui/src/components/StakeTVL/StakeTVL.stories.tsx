import type { Meta, StoryObj } from '@storybook/react'

import { StakeTVL } from './StakeTVL'

const meta: Meta<typeof StakeTVL> = {
  title: 'Components/StakeTVL',
  component: StakeTVL,
  parameters: {
    docs: {
      description: {
        component: 'Displays TVL (Total Value Locked) information.',
      },
    },
    controls: {
      exclude: ['className', 'style'],
    },
  },
  argTypes: {
    amount: {
      description: 'The TVL amount',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '4.928' },
      },
      control: 'text',
    },
    currency: {
      description: 'The currency symbol',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'ETH' },
      },
      control: 'text',
    },
  },
}

export default meta

type Story = StoryObj<typeof StakeTVL>

export const BasicUsage: Story = {
  args: {
    amount: '4.928',
    currency: 'ETH',
  },
  render: (args) => <StakeTVL {...args} />,
}
