import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Icon } from './Icon'
import { IconName, IconNameType } from './Icon.types'

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Displays an icon.',
      },
    },
  },
  argTypes: {
    name: {
      description: 'Icon name',
      options: Object.values(IconName),
      table: {
        type: { summary: 'string' },
      },
      control: 'select',
    },
    className: {
      description: 'class',
      table: {
        type: { summary: 'string' },
      },
      control: 'text',
    },
  },
}

export default meta

type Story = StoryObj<typeof Icon>

export const BasicUsage: Story = {
  render: (args) => <Icon {...args} />,
  args: {
    name: 'crystal-ball',
    className: 'h-10 w-10',
  },
}

export const AllIcons: Story = {
  render: () => (
    <div
      style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', width: '700px' }}
    >
      {Object.values(IconName).map((iconName, index) => (
        <Icon key={index} name={iconName as IconNameType} />
      ))}
    </div>
  ),
}
