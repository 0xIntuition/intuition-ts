import type { Meta, StoryObj } from '@storybook/react'

import { ProgressBar } from './ProgressBar'

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  argTypes: {
    percentage: {
      control: { type: 'number', min: 0, max: 100 },
    },
    primaryClassName: {
      control: { type: 'text' },
    },
    secondaryClassName: {
      control: { type: 'text' },
    },
  },
}

export default meta

type Story = StoryObj<typeof ProgressBar>

export const BasicUsage: Story = {
  args: {
    percentage: 50,
  },
  render: (args) => (
    <div className="w-[600px]">
      <ProgressBar {...args} />
    </div>
  ),
}
