import type { Meta, StoryObj } from '@storybook/react'

import { QuestSetProgressCard } from './QuestSetProgressCard'

const meta: Meta<typeof QuestSetProgressCard> = {
  title: 'Components/Quest/QuestSetProgressCard',
  component: QuestSetProgressCard,
  argTypes: {
    image: {
      type: 'string',
      description: 'Image source',
    },
    title: {
      type: 'string',
      description: 'Title',
    },
    numberQuests: {
      type: 'number',
      description: 'Number of quests',
    },
    numberCompletedQuests: {
      type: 'number',
      description: 'Number of completed quests',
    },
    onButtonClick: {
      type: 'function',
      description: 'Button click handler',
    },
  },
}

export default meta

type Story = StoryObj<typeof QuestSetProgressCard>

export const BasicUsage: Story = {
  args: {
    image:
      'https://m.media-amazon.com/images/M/MV5BNDhiMWYzMjgtNTRiYi00ZTA3LThlODctNDRkMDk0NzFkMWI3L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNTg0MTkzMzA@._V1_.jpg',
    title: 'Tutorial Island: The Primitive Elements',
    numberQuests: 10,
    numberCompletedQuests: 5,
    onButtonClick: () => console.log('Button clicked'),
  },
  render: (args) => (
    <div className="w-[600px]">
      <QuestSetProgressCard {...args} />
    </div>
  ),
}
