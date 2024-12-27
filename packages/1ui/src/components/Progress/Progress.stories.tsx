import * as React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Progress } from './Progress'

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  tags: ['autodocs'],
  args: {
    value: 50,
  },
}

export default meta

type Story = StoryObj<typeof Progress>

export const Default: Story = {}

export const WithValue: Story = {
  args: {
    value: 75,
  },
}

export const CustomStyles: Story = {
  args: {
    value: 60,
    className: 'h-2 w-[60%]',
  },
}

export const Indeterminate: Story = {
  args: {
    value: undefined,
  },
}
