import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import {
  TransactionStatus,
  TransactionStatusIndicator,
} from './TransactionStatusIndicator'

const meta: Meta<typeof TransactionStatusIndicator> = {
  title: 'Components/TransactionStatusIndicator',
  component: TransactionStatusIndicator,
  argTypes: {
    status: {
      description: 'Status of transaction',
      options: Object.values(TransactionStatus),
      table: {
        type: { summary: 'string' },
      },
      control: 'select',
    },
  },
}

export default meta

type Story = StoryObj<typeof TransactionStatusIndicator>

export const BasicUsage: Story = {
  args: {
    status: TransactionStatus.awaiting,
  },
  render: (args) => <TransactionStatusIndicator {...args} />,
}
