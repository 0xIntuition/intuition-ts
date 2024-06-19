import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { PieChart, PieChartSize } from './PieChart'

const meta: Meta<typeof PieChart> = {
  title: 'Components/PieChart',
  component: PieChart,
  argTypes: {
    size: {
      description: 'Pie chart size',
      options: Object.values(PieChartSize),
      table: {
        type: { summary: 'string' },
      },
      control: 'select',
    },
  },
}

export default meta

type Story = StoryObj<typeof PieChart>

export const BasicUsage: Story = {
  args: {
    percentage: 50,
  },
  render: (args) => <PieChart {...args} />,
}
