import type { Meta, StoryObj } from '@storybook/react'
import { PieChartVariant } from 'components/PieChart'

import {
  PositionCardFeesAccrued,
  PositionCardLastUpdated,
  PositionCardOwnership,
  PositionCardStaked,
} from './components'
import { PositionCard } from './PositionCard'

const meta: Meta<typeof PositionCard> = {
  title: 'Components/PositionCard',
  component: PositionCard,
}

export default meta

type Story = StoryObj<typeof PositionCard>

// Example story for the default state
export const BasicUsage: Story = {
  render: (args) => {
    const handleSell = () => {
      console.log('Redeem button clicked')
    }

    return (
      <PositionCard {...args} onButtonClick={handleSell}>
        <PositionCardStaked amount={0.512} />
        <PositionCardOwnership
          percentOwnership={24}
          variant={PieChartVariant.default}
        />
        <PositionCardFeesAccrued amount={0.005} />
        <PositionCardLastUpdated timestamp="2024-05-10T00:00:00Z" />
      </PositionCard>
    )
  },
}
