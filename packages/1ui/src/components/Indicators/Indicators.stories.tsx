import type { Meta, StoryObj } from '@storybook/react'

import { MonetaryValue } from './components'
import { Indicators } from './Indicators'

// Setup meta for the Storybook
const meta: Meta = {
  title: 'Components/Indicators',
  component: Indicators,
}

export default meta

type Story = StoryObj<typeof Indicators>

// Example story for the default state
export const MonetaryValueUsage: Story = {
  render: () => <MonetaryValue value={0.345} currency="ETH" />,
}
