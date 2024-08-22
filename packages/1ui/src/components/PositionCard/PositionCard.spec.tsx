import { fireEvent, render } from '@testing-library/react'
import { PieChartVariant } from 'components/PieChart'
import { vi } from 'vitest'

import {
  PositionCardFeesAccrued,
  PositionCardLastUpdated,
  PositionCardOwnership,
  PositionCardStaked,
} from './components'
import { PositionCard } from './PositionCard'

describe('PositionCard', () => {
  it('should render with children', () => {
    const { getByText } = render(
      <PositionCard>
        <PositionCardStaked amount={0.512} />
        <PositionCardOwnership
          percentOwnership={24}
          variant={PieChartVariant.default}
        />
        <PositionCardFeesAccrued amount={0.005} />
        <PositionCardLastUpdated timestamp="2024-05-10T16:00:00Z" />
      </PositionCard>,
    )

    expect(getByText('Your Position')).toBeDefined()
    expect(getByText('Amount Staked')).toBeDefined()
    expect(getByText('0.512 ETH')).toBeDefined()
    expect(getByText('Percent Ownership')).toBeDefined()
    expect(getByText('24%')).toBeDefined()
    expect(getByText('Fees Accrued')).toBeDefined()
    expect(getByText('+0.005 ETH')).toBeDefined()
    expect(getByText('Last Updated')).toBeDefined()
    expect(getByText('May 10, 2024')).toBeDefined()
  })

  // Test if the button click triggers the provided function
  it('should trigger onButtonClick when Redeem button is clicked', () => {
    const handleSell = vi.fn()
    const { getByText } = render(
      <PositionCard onButtonClick={handleSell}>
        <PositionCardStaked amount={0.512} />
        <PositionCardOwnership
          percentOwnership={24}
          variant={PieChartVariant.default}
        />
        <PositionCardFeesAccrued amount={0.005} />
        <PositionCardLastUpdated timestamp="2024-05-10T16:00:00Z" />
      </PositionCard>,
    )

    const button = getByText('Redeem')
    fireEvent.click(button)
    expect(handleSell).toHaveBeenCalledTimes(1)
  })

  // Test if the component renders with default props
  it('should render with default props', () => {
    const { asFragment } = render(
      <PositionCard>
        <PositionCardStaked amount={0.512} />
        <PositionCardOwnership
          percentOwnership={24}
          variant={PieChartVariant.default}
        />
        <PositionCardFeesAccrued amount={0.005} />
        <PositionCardLastUpdated timestamp="2024-05-10T16:00:00Z" />
      </PositionCard>,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex flex-col justify-start items-start w-full min-w-80 p-5 theme-border rounded-xl"
        >
          <div
            class="flex flex-col mb-4"
          >
            <h3
              class="text-lg font-medium text-white"
            >
              Your Position
            </h3>
          </div>
          <div
            class="w-full grid grid-cols-2 gap-5"
          >
            <div
              class="flex flex-col max-lg:items-center"
            >
              <div
                class="text-sm font-normal text-muted-foreground mb-0.5"
              >
                Amount Staked
              </div>
              <div
                class="text-primary text-lg font-medium"
              >
                0.512 ETH
              </div>
            </div>
            <div
              class="flex flex-col max-lg:items-center"
            >
              <div
                class="text-sm font-normal text-muted-foreground mb-0.5"
              >
                Percent Ownership
              </div>
              <div
                class="flex items-center"
              >
                <div
                  class="text-primary text-lg font-normal mr-2 undefined"
                >
                  24%
                </div>
                <div
                  class="grid"
                >
                  <span
                    class="col-[1] row-[1] rounded-full block"
                    style="height: 22px; width: 22px; mask: radial-gradient(farthest-side,#0000 calc(99% - 2px),var(--background) calc(100% - 2px);"
                  />
                  <span
                    class="col-[1] row-[1] border-muted-foreground rounded-full block"
                    style="border-width: 2px;"
                  />
                </div>
              </div>
            </div>
            <div
              class="flex flex-col max-lg:items-center"
            >
              <div
                class="text-sm font-medium text-muted-foreground mb-0.5"
              >
                Fees Accrued
              </div>
              <div
                class="text-lg font-medium text-success"
              >
                +0.005 ETH
              </div>
            </div>
            <div
              class="flex flex-col max-lg:items-center"
            >
              <div
                class="text-sm font-medium text-muted-foreground mb-0.5"
              >
                Last Updated
              </div>
              <div
                class="text-primary text-lg font-medium"
              >
                May 10, 2024
              </div>
            </div>
          </div>
          <button
            class="flex justify-center items-center gap-2 text-sm font-medium border disabled:bg-muted aria-disabled:bg-muted disabled:text-muted-foreground aria-disabled:text-muted-foreground disabled:border-muted aria-disabled:border-muted aria-disabled:pointer-events-none bg-transparent text-destructive border-destructive rounded-full hover:bg-destructive/30 hover:border-destructive/30 shadow-md-subtle px-3 py-1 max-sm:py-2 max-sm:text-base w-full mt-5"
          >
            Redeem
          </button>
        </div>
      </DocumentFragment>
    `)
  })
})
