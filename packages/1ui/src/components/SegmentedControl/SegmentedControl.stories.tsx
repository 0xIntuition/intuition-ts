import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { SegmentedControl, SegmentedControlItem } from './SegmentedControl'

const meta: Meta<typeof SegmentedControl> = {
  title: 'Components/SegmentedControl',
  component: SegmentedControl,
}

export default meta

type Story = StoryObj<typeof SegmentedControl>

const ExampleComponent = ({ ...props }) => {
  const options = [
    { value: 'overview', label: 'Overview' },
    { value: 'claims', label: 'Claims' },
    { value: 'positions', label: 'Positions' },
    { value: 'activity', label: 'Activity' },
  ]
  const [selectedTab, setSelectedTab] = React.useState(options[0].value)
  return (
    <SegmentedControl {...props}>
      {options.map((option, index) => (
        <SegmentedControlItem
          key={index}
          isActive={selectedTab === option.value}
          onClick={() => setSelectedTab(option.value)}
        >
          {option.label}
        </SegmentedControlItem>
      ))}
    </SegmentedControl>
  )
}

export const BasicUsage: Story = {
  args: {},
  render: (args) => <ExampleComponent {...args} />,
}
