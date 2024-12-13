import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'
import { TransactionStatusCard } from './TransactionStatusCard'
import { TransactionStatus } from 'types'


const meta: Meta<typeof TransactionStatusCard> = {
  title: 'Components/TransactionStatus/TransactionStatusCard',
  component: TransactionStatusCard,
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

type Story = StoryObj<typeof TransactionStatusCard>

export const BasicUsage: Story = {
  args: {
    status: TransactionStatus.awaiting,
  },
  render: (args) => <TransactionStatusCard {...args} />,
}
