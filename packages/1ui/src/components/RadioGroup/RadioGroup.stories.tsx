import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Label } from '..'
import { RadioGroup, RadioGroupItem } from './RadioGroup'

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
}

export default meta

type Story = StoryObj<typeof RadioGroup>

export const BasicUsage: Story = {
  args: {},
  render: (args) => (
    <RadioGroup defaultValue="option-one" {...args}>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-one" id="option-one" />
        <Label htmlFor="option-one">Option One</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-two" id="option-two" />
        <Label htmlFor="option-two">Option Two</Label>
      </div>
    </RadioGroup>
  ),
}
