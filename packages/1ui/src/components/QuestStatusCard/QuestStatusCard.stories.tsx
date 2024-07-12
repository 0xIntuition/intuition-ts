import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'
import { QuestStatus } from 'types'

import { QuestStatusCard } from './QuestStatusCard'

const meta: Meta<typeof QuestStatusCard> = {
  title: 'Components/Quest/QuestStatusCard',
  component: QuestStatusCard,
  argTypes: {
    status: {
      description: 'Status of quest',
      options: Object.values(QuestStatus),
      table: {
        type: { summary: 'string' },
      },
      control: 'select',
    },
  },
}

export default meta

type Story = StoryObj<typeof QuestStatusCard>

export const BasicUsage: Story = {
  args: {
    status: QuestStatus.notStarted,
    tooltip: 'Example text',
  },
  render: (args) => <QuestStatusCard {...args} />,
}
