import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Copy } from './Copy'

const meta: Meta<typeof Copy> = {
  title: 'Components/Copy',
  component: Copy,
  argTypes: {
    text: { control: 'text' },
    disabled: { control: 'boolean' },
    className: { control: 'text' },
  },
}

export default meta

type Story = StoryObj<typeof Copy>

export const BasicUsage: Story = {
  args: {
    text: 'Text to copy',
  },
  render: (args) => <Copy {...args} />,
}

export const Default: Story = {
  args: {
    text: 'Text to copy',
  },
}

export const Disabled: Story = {
  args: {
    text: 'Cannot copy this',
    disabled: true,
  },
}

export const LongText: Story = {
  args: {
    text: 'This is a very long text that will be copied when the button is clicked. It demonstrates how the component handles longer content.',
  },
}
