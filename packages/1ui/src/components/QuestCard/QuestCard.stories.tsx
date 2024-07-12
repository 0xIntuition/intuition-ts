import type { Meta, StoryObj } from '@storybook/react'
import { QuestCriteriaStatus, QuestStatus } from 'types'

import { QuestCard } from './QuestCard'

const meta: Meta<typeof QuestCard> = {
  title: 'Components/Quest/QuestCard',
  component: QuestCard,
  argTypes: {
    questStatus: {
      control: { type: 'select' },
      options: Object.values(QuestStatus),
    },
    questCriteriaStatus: {
      control: { type: 'select' },
      options: Object.values(QuestCriteriaStatus),
    },
  },
}

export default meta

type Story = StoryObj<typeof QuestCard>

export const BasicUsage: Story = {
  args: {
    questStatus: 'not-started',
    questCriteriaStatus: 'not-started',
    imgSrc:
      'https://m.media-amazon.com/images/M/MV5BNDhiMWYzMjgtNTRiYi00ZTA3LThlODctNDRkMDk0NzFkMWI3L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNTg0MTkzMzA@._V1_.jpg',
    title: 'Tutorial Island: The Primitive Elements',
    description: 'This is a description of the quest set',
    label: 'Chapter 1',
    points: 200,
    questCriteria: 'Complete the tutorial',
  },
  render: (args) => (
    <div className="w-[900px] h-auto">
      <QuestCard {...args} />
    </div>
  ),
}
