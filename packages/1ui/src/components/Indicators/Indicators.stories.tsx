import type { Meta, StoryObj } from '@storybook/react'

import { FeesAccrued, MonetaryValue, PositionValueDisplay } from './components'
import { Indicators } from './Indicators'

// Setup meta for the Storybook
const meta: Meta = {
  title: 'Components/Indicators',
  component: Indicators,
}

export default meta

type Story = StoryObj<typeof Indicators>

const Container = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col justify-center items-center gap-2 border border-solid  border-white/50 rounded-md p-2.5">
    {children}
  </div>
)

export const IndicatorUsage: Story = {
  render: () => (
    <div className="w-[900px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Container>
        <p>MonetaryValue</p>
        <MonetaryValue value={0.345} currency="ETH" />
      </Container>
      <Container>
        <p>FeesAccrued</p>
        <FeesAccrued value={0.005} currency="ETH" />
      </Container>
      <Container>
        <p>PositionValueDisplay - claimFor</p>
        <PositionValueDisplay
          value={0.345}
          position="claimFor"
          feesAccrued={0.005}
        />
      </Container>
      <Container>
        <p>PositionValueDisplay - claimAgainst</p>
        <PositionValueDisplay
          value={0.5}
          position="claimAgainst"
          feesAccrued={0.01}
          currency="ETH"
        />
      </Container>
      <Container>
        <p>PositionValueDisplay - identity</p>
        <PositionValueDisplay
          value={0.789}
          position="identity"
          feesAccrued={0.02}
        />
      </Container>
    </div>
  ),
}
