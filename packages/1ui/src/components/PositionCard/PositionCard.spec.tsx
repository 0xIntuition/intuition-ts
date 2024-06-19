import { fireEvent, render } from '@testing-library/react'
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
        <PositionCardOwnership percentOwnership={24} />
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
  it('should trigger onButtonClick when Sell button is clicked', () => {
    const handleSell = vi.fn()
    const { getByText } = render(
      <PositionCard onButtonClick={handleSell}>
        <PositionCardStaked amount={0.512} />
        <PositionCardOwnership percentOwnership={24} />
        <PositionCardFeesAccrued amount={0.005} />
        <PositionCardLastUpdated timestamp="2024-05-10T16:00:00Z" />
      </PositionCard>,
    )

    const button = getByText('Sell')
    fireEvent.click(button)
    expect(handleSell).toHaveBeenCalledTimes(1)
  })

  // Test if the component renders with default props
  it('should render with default props', () => {
    const { asFragment } = render(
      <PositionCard>
        <PositionCardStaked amount={0.512} />
        <PositionCardOwnership percentOwnership={24} />
        <PositionCardFeesAccrued amount={0.005} />
        <PositionCardLastUpdated timestamp="2024-05-10T16:00:00Z" />
      </PositionCard>,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex flex-col justify-start items-start w-[300px] p-5 border border-border/20 rounded-xl"
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
              class="flex flex-col"
            >
              <p
                class="text-sm font-normal text-muted-foreground mb-0.5"
              >
                Amount Staked
              </p>
              <p
                class="text-primary text-lg font-medium"
              >
                0.512 ETH
              </p>
            </div>
            <div
              class="flex flex-col"
            >
              <p
                class="text-sm font-normal text-muted-foreground mb-0.5"
              >
                Percent Ownership
              </p>
              <div
                class="flex items-center"
              >
                <p
                  class="text-primary text-lg font-normal mr-2 undefined"
                >
                  24%
                </p>
                <div
                  class="grid"
                >
                  <span
                    class="col-[1] row-[1] rounded-full block"
                    style="height: 22px; width: 22px; mask: radial-gradient(farthest-side,#0000 calc(99% - 2px),#000 calc(100% - 2px);"
                  />
                  <span
                    class="col-[1] row-[1] border-muted-foreground rounded-full block"
                    style="border-width: 2px;"
                  />
                </div>
              </div>
            </div>
            <div
              class="flex flex-col"
            >
              <p
                class="text-sm font-medium text-muted-foreground mb-0.5"
              >
                Fees Accrued
              </p>
              <p
                class="text-lg font-medium text-success undefined"
              >
                +0.005 ETH
              </p>
            </div>
            <div
              class="flex flex-col"
            >
              <p
                class="text-sm font-medium text-muted-foreground mb-0.5"
              >
                Last Updated
              </p>
              <p
                class="text-primary text-lg font-medium"
              >
                May 10, 2024
              </p>
            </div>
          </div>
          <button
            class="flex justify-center items-center font-medium border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted bg-transparent text-destructive border-destructive rounded-full hover:bg-destructive/30 hover:border-destructive/30 shadow-md-subtle px-4 py-2 gap-3 text-base w-full mt-5"
          >
            Sell
          </button>
        </div>
      </DocumentFragment>
    `)
  })
})
