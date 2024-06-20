// Import React
import React from 'react'

// Import Storybook meta and StoryObj type
import type { Meta, StoryObj } from '@storybook/react'

// Import your actual component
import { QuestHeaderCard } from './QuestHeaderCard'

// Setup meta for the Storybook
const meta: Meta<typeof QuestHeaderCard> = {
  title: 'Components/QuestHeaderCard',
  component: QuestHeaderCard,
}

export default meta

// Define types for your stories
type Story = StoryObj<typeof QuestHeaderCard>

// Example story for the default state
export const BasicUsage: Story = {
  args: {
    title: 'Primitive Island',
    subtitle: 'Continue your journey.',
    numberOfCompletedQuests: 1,
    totalNumberOfQuests: 10,
  },
  render: (args) => (
    <div className="w-[600px]">
      <QuestHeaderCard {...args} />
    </div>
  ),
}
