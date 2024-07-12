import type { Meta, StoryObj } from '@storybook/react'

import { QuestSetProgressCard } from './QuestSetProgressCard'

const meta: Meta<typeof QuestSetProgressCard> = {
  title: 'Components/Quest/QuestSetProgressCard',
  component: QuestSetProgressCard,
}

export default meta

type Story = StoryObj<typeof QuestSetProgressCard>

export const BasicUsage: Story = {
  args: {
    imgSrc:
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
