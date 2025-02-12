import type { Meta, StoryObj } from '@storybook/react'

import { Stepper } from './Stepper'

const meta: Meta<typeof Stepper> = {
  title: 'Components/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  args: {
    steps: [
      { id: 1, label: 'Step 1' },
      { id: 2, label: 'Step 2' },
      { id: 3, label: 'Step 3' },
    ],
    currentStep: 1,
  },
}

export default meta

type Story = StoryObj<typeof Stepper>

export const Default: Story = {}

export const WithDisabledNext: Story = {
  args: {
    disableNext: true,
  },
}

export const WithDisabledBack: Story = {
  args: {
    disableBack: true,
  },
}

export const InProgress: Story = {
  args: {
    currentStep: 2,
  },
}

export const LastStep: Story = {
  args: {
    currentStep: 3,
  },
}
