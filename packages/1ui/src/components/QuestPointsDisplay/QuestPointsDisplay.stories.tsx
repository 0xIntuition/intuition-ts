import type { Meta, StoryObj } from '@storybook/react'
import { QuestStatus } from 'types'

import { QuestPointsDisplay } from './QuestPointsDisplay'

const meta: Meta<typeof QuestPointsDisplay> = {
  title: 'Components/Quest/QuestPointsDisplay',
  component: QuestPointsDisplay,
  argTypes: {
    questStatus: {
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

type Story = StoryObj<typeof QuestPointsDisplay>

export const BasicUsage: Story = {
  args: {
    points: 10,
    questStatus: QuestStatus.notStarted,
  },
  render: (args) => <QuestPointsDisplay {...args} />,
}
