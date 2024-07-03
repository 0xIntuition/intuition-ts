import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Trunctacular } from './Trunctacular'

const meta: Meta<typeof Trunctacular> = {
  title: 'Components/Trunctacular',
  component: Trunctacular,
  argTypes: {
    variant: {
      description: 'Variant of text',
      options: [
        'heading1',
        'heading2',
        'heading3',
        'heading4',
        'heading5',
        'headline',
        'bodyLarge',
        'body',
        'caption',
        'footnote',
        'small',
      ],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'body' },
      },
      control: 'select',
    },
    weight: {
      description: 'Weight of text',
      options: ['normal', 'medium', 'semibold', 'bold'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'normal' },
      },
      control: 'select',
    },
  },
}

export default meta

type Story = StoryObj<typeof Trunctacular>

export const BasicUsage: Story = {
  args: {
    value: 'reallyReallyLongName',
  },
  render: (args) => <Trunctacular {...args} />,
}

export const WalletUsage: Story = {
  render: () => (
    <Trunctacular value="0x1234567890abcdef1234567890abcdef12345678" />
  ),
}

export const NoTruncation: Story = {
  render: () => <Trunctacular value="shortName" />,
}
