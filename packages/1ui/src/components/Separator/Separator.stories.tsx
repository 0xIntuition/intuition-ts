import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Separator } from './Separator'

const meta: Meta<typeof Separator> = {
  title: 'Components/Separator',
  component: Separator,
  argTypes: {
    orientation: {
      description: 'The orientation of the separator.',
      options: ['horizontal', 'vertical'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'horizontal' },
      },
      control: 'select',
    },
    decorative: {
      description:
        'When true, signifies that it is purely visual, carries no semantic meaning, and ensures it is not present in the accessibility tree.',
      table: {
        type: { summary: 'boolean' },
      },
      control: 'boolean',
    },
  },
}

export default meta

type Story = StoryObj<typeof Separator>

export const BasicUsage: Story = {
  render: (args) => (
    <div className="w-[400px] h-[200px] flex justify-center items-center">
      <Separator {...args} />
    </div>
  ),
}
