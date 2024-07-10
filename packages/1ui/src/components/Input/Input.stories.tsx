import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { IconName } from '..'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title: 'Components/Form Elements/Input',
  component: Input,
  argTypes: {
    startAdornment: {
      description: 'Adornment at the left-side of the component',
      table: {
        type: { summary: 'string' },
      },
      control: 'text',
    },
    endAdornment: {
      description: 'Adornment at the right-side of the component',
      table: {
        type: { summary: 'string' },
      },
      control: 'text',
    },
  },
}

export default meta

type Story = StoryObj<typeof Input>

export const BasicUsage: Story = {
  args: {
    placeholder: 'Email',
    disabled: false,
  },
  render: (args) => (
    <div className="w-[300px]">
      <Input type="email" {...args} />
    </div>
  ),
}

export const StartAdornmentIcon: Story = {
  render: () => (
    <div className="w-[300px]">
      <Input
        type="text"
        placeholder="Search"
        startAdornment={IconName.magnifyingGlass}
      />
    </div>
  ),
}

export const StartAdornmentLabel: Story = {
  render: () => (
    <div className="w-[300px]">
      <Input type="text" placeholder="Search" startAdornment="http://" />
    </div>
  ),
}

export const EndAdornmentIcon: Story = {
  render: () => (
    <div className="w-[300px]">
      <Input
        type="number"
        placeholder="Enter amount..."
        endAdornment={IconName.ethereum}
      />
    </div>
  ),
}

export const EndAdornmentLabel: Story = {
  render: () => (
    <div className="w-[300px]">
      <Input type="text" placeholder="Search" endAdornment=".com" />
    </div>
  ),
}
