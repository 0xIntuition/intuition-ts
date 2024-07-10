import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Textarea } from './Textarea'

const meta: Meta<typeof Textarea> = {
  title: 'Components/Form Elements/Textarea',
  component: Textarea,
  argTypes: {
    placeholder: {
      description: 'Placeholder text',
      table: {
        type: { summary: 'string' },
      },
      control: 'text',
    },
  },
}

export default meta

type Story = StoryObj<typeof Textarea>

export const BasicUsage: Story = {
  args: { placeholder: '' },
  render: (args) => <Textarea {...args} className="w-[400px]" />,
}
