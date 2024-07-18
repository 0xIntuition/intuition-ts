import type { Meta, StoryObj } from '@storybook/react'

import { ProgressCard } from './ProgressCard'

const meta: Meta<typeof ProgressCard> = {
  title: 'Components/ProgressCard',
  component: ProgressCard,
}

export default meta

type Story = StoryObj<typeof ProgressCard>

export const BasicUsage: Story = {
  args: {
    numberTotal: 10,
    numberCompleted: 5,
  },
  render: (args) => (
    <div className="w-[600px]">
      <ProgressCard {...args} />
    </div>
  ),
}
