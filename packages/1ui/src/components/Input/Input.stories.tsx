import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
}

export default meta

type Story = StoryObj<typeof Input>

export const BasicUsage: Story = {
  args: { placeholder: 'Email' },
  render: (args) => <Input type="email" {...args} />,
}
