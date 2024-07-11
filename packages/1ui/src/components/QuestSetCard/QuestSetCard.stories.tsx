import type { Meta, StoryObj } from '@storybook/react'

import { QuestSetCard } from './QuestSetCard'

const meta: Meta<typeof QuestSetCard> = {
  title: 'Components/Quest/QuestSetCard',
  component: QuestSetCard,
  argTypes: {
    image: {
      type: 'string',
      description: 'Image source',
    },
    title: {
      type: 'string',
      description: 'Title',
    },
    description: {
      type: 'string',
      description: 'Description',
    },
    numberQuests: {
      type: 'number',
      description: 'Number of quests',
    },
    numberCompletedQuests: {
      type: 'number',
      description: 'Number of completed quests',
    },
  },
}

export default meta

type Story = StoryObj<typeof QuestSetCard>

export const BasicUsage: Story = {
  args: {
    image:
      'https://m.media-amazon.com/images/M/MV5BNDhiMWYzMjgtNTRiYi00ZTA3LThlODctNDRkMDk0NzFkMWI3L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNTg0MTkzMzA@._V1_.jpg',
    title: 'Tutorial Island: The Primitive Elements',
    description: 'This is a description of the quest set',
    numberQuests: 10,
    numberCompletedQuests: 5,
  },
  render: (args) => (
    <div className="w-[400px]">
      <QuestSetCard {...args} />
    </div>
  ),
}
