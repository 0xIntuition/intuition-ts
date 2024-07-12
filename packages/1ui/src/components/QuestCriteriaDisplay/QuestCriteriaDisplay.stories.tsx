import type { Meta, StoryObj } from '@storybook/react'
import { QuestCriteriaStatus } from 'types'

import { QuestCriteriaDisplay } from './QuestCriteriaDisplay'

const meta: Meta<typeof QuestCriteriaDisplay> = {
  title: 'Components/Quest/QuestCriteriaDisplay',
  component: QuestCriteriaDisplay,
  argTypes: {
    status: {
      description: 'Status of quest criteria',
      options: Object.values(QuestCriteriaStatus),
      table: {
        type: { summary: 'string' },
      },
      control: 'select',
    },
  },
}

export default meta

type Story = StoryObj<typeof QuestCriteriaDisplay>

export const BasicUsage: Story = {
  args: {
    status: QuestCriteriaStatus.notStarted,
    criteria: 'Criteria',
  },
  render: (args) => <QuestCriteriaDisplay {...args} />,
}
