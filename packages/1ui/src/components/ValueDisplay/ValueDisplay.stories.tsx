import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { ValueDisplay } from './ValueDisplay'

const meta: Meta<typeof ValueDisplay> = {
  title: 'Components/ValueDisplay',
  component: ValueDisplay,
  argTypes: {
    variant: {
      description: 'Variant of value display',
      options: [
        'default',
        'directionFor',
        'directionAgainst',
        'attestorFor',
        'attestorAgainst',
      ],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
      control: 'select',
    },
  },
}

export default meta

type Story = StoryObj<typeof ValueDisplay>

export const BasicUsage: Story = {
  args: { variant: 'default', children: '-' },
  render: (args) => <ValueDisplay {...args} />,
}

export const DirectionFor: Story = {
  render: () => <ValueDisplay variant="directionFor">0.003</ValueDisplay>,
}
export const DirectionAgainst: Story = {
  render: () => <ValueDisplay variant="directionAgainst">12345</ValueDisplay>,
}
export const AttestorFor: Story = {
  render: () => <ValueDisplay variant="attestorFor">12345</ValueDisplay>,
}
export const AttestorAgainst: Story = {
  render: () => <ValueDisplay variant="attestorAgainst">12345</ValueDisplay>,
}
