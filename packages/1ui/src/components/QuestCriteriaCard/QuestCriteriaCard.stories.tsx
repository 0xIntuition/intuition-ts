import type { Meta, StoryObj } from '@storybook/react'
import { QuestCriteriaStatus, QuestStatus } from 'types'

import { QuestCriteriaCard } from './QuestCriteriaCard'

const meta: Meta<typeof QuestCriteriaCard> = {
  title: 'Components/Quest/QuestCriteriaCard',
  component: QuestCriteriaCard,
  argTypes: {
    questStatus: {
      description: 'Status of quest',
      options: Object.values(QuestStatus),
      table: {
        type: { summary: 'string' },
      },
      control: 'select',
    },
    criteria: {
      description: 'Criteria',
      table: {
        type: { summary: 'object' },
      },
      control: 'object',
    },
  },
}

export default meta

type Story = StoryObj<typeof QuestCriteriaCard>

export const BasicUsage: Story = {
  args: {
    criteria: {
      criteria: 'Criteria',
      status: QuestCriteriaStatus.notStarted,
    },
    questStatus: QuestStatus.inProgress,
    points: 100,
  },
  render: (args) => (
    <div className="w-[600px]">
      <QuestCriteriaCard {...args} />
    </div>
  ),
}
