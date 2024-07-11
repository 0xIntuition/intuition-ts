import type { Meta, StoryObj } from '@storybook/react'
import { QuestStatus } from 'types'

import { QuestStatusIndicator } from './QuestStatusIndicator'

const meta: Meta<typeof QuestStatusIndicator> = {
  title: 'Components/Quest/QuestStatusIndicator',
  component: QuestStatusIndicator,
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

type Story = StoryObj<typeof QuestStatusIndicator>

export const BasicUsage: Story = {
  args: {
    status: QuestStatus.notStarted,
  },
  render: (args) => <QuestStatusIndicator {...args} />,
}
