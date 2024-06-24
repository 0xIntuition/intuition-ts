import React from 'react'

import { render } from '@testing-library/react'

import { Currency } from '../../types'
import { ClaimStakeCard } from './ClaimStakeCard'

describe('ClaimStakeCard', () => {
  it('should render appropriate elements', () => {
    const { asFragment } = render(
      <ClaimStakeCard
        currency={Currency.ETH}
        totalTVL={4.928}
        tvlAgainst={0.567}
        tvlFor={3.643}
        amountAgainst={39}
        amountFor={124}
        onAgainstBtnClick={() => console.log('test')}
        onForBtnClick={() => console.log('test')}
      />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex flex-col gap-4 border border-border/30 rounded-xl p-5 w-max"
        >
          <p
            class="text-primary text-lg font-normal"
          >
            Stake
          </p>
          <div
            class="grid justify-center items-center"
          >
            <div
              class="col-[1] row-[1] block w-max"
            >
              <div
                class="grid"
              >
                <span
                  class="col-[1] row-[1] rounded-full block"
                  style="height: 160px; width: 160px; mask: radial-gradient(farthest-side,#0000 calc(99% - 10px),var(--background) calc(100% - 10px);"
                />
                <span
                  class="col-[1] row-[1] border-muted-foreground rounded-full block"
                  style="border-width: 10px;"
                />
              </div>
            </div>
            <div
              class="col-[1] row-[1] text-center"
            >
              <p
                class="text-lg font-normal text-muted-foreground"
              >
                Total TVL
              </p>
              <p
                class="text-primary text-lg font-normal"
              >
                4.928 ETH
              </p>
            </div>
          </div>
          <div
            class="flex justify-between items-center"
          >
            <div>
              <div
                class="flex gap-1 items-center"
              >
                <span
                  class="block h-2 w-2 rounded-[2px] bg-against"
                />
                <p
                  class="text-sm font-medium text-muted-foreground"
                >
                  TVL Against
                </p>
              </div>
              <p
                class="text-primary text-lg font-normal text-left"
              >
                0.567 ETH
              </p>
            </div>
            <div>
              <div
                class="flex gap-1 items-center justify-end"
              >
                <span
                  class="block h-2 w-2 rounded-[2px] bg-for"
                />
                <p
                  class="text-sm font-medium text-muted-foreground"
                >
                  TVL For
                </p>
              </div>
              <p
                class="text-primary text-lg font-normal text-right"
              >
                3.643 ETH
              </p>
            </div>
          </div>
          <div
            class="flex justify-between items-center"
          >
            <div>
              <div
                class="flex gap-1 items-center"
              >
                <span
                  class="block h-2 w-2 rounded-[2px] bg-against"
                />
                <p
                  class="text-sm font-medium text-muted-foreground"
                >
                  TVL Against
                </p>
              </div>
              <p
                class="text-primary text-lg font-normal text-left"
              >
                39
              </p>
            </div>
            <div>
              <div
                class="flex gap-1 items-center justify-end"
              >
                <span
                  class="block h-2 w-2 rounded-[2px] bg-for"
                />
                <p
                  class="text-sm font-medium text-muted-foreground"
                >
                  TVL For
                </p>
              </div>
              <p
                class="text-primary text-lg font-normal text-right"
              >
                124
              </p>
            </div>
          </div>
          <div
            class="flex justify-between items-center gap-4 w-max mt-2"
          >
            <button
              class="flex justify-center items-center font-medium border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted bg-against text-against-foreground border-against rounded-full hover:bg-against/70 hover:border-against/30 shadow-md-subtle px-4 py-2 gap-3 text-base w-36"
            >
              Deposit Against
            </button>
            <button
              class="flex justify-center items-center font-medium border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted bg-for text-for-foreground border-for rounded-full hover:bg-for/70 hover:border-for/30 shadow-md-subtle px-4 py-2 gap-3 text-base w-36"
            >
              Deposit For
            </button>
          </div>
        </div>
      </DocumentFragment>
    `)
  })
  it('should render disabled buttons when given no onClick args', () => {
    const { asFragment } = render(
      <ClaimStakeCard
        currency={Currency.ETH}
        totalTVL={4.928}
        tvlAgainst={0.567}
        tvlFor={3.643}
        amountAgainst={39}
        amountFor={124}
      />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex flex-col gap-4 border border-border/30 rounded-xl p-5 w-max"
        >
          <p
            class="text-primary text-lg font-normal"
          >
            Stake
          </p>
          <div
            class="grid justify-center items-center"
          >
            <div
              class="col-[1] row-[1] block w-max"
            >
              <div
                class="grid"
              >
                <span
                  class="col-[1] row-[1] rounded-full block"
                  style="height: 160px; width: 160px; mask: radial-gradient(farthest-side,#0000 calc(99% - 10px),var(--background) calc(100% - 10px);"
                />
                <span
                  class="col-[1] row-[1] border-muted-foreground rounded-full block"
                  style="border-width: 10px;"
                />
              </div>
            </div>
            <div
              class="col-[1] row-[1] text-center"
            >
              <p
                class="text-lg font-normal text-muted-foreground"
              >
                Total TVL
              </p>
              <p
                class="text-primary text-lg font-normal"
              >
                4.928 ETH
              </p>
            </div>
          </div>
          <div
            class="flex justify-between items-center"
          >
            <div>
              <div
                class="flex gap-1 items-center"
              >
                <span
                  class="block h-2 w-2 rounded-[2px] bg-against"
                />
                <p
                  class="text-sm font-medium text-muted-foreground"
                >
                  TVL Against
                </p>
              </div>
              <p
                class="text-primary text-lg font-normal text-left"
              >
                0.567 ETH
              </p>
            </div>
            <div>
              <div
                class="flex gap-1 items-center justify-end"
              >
                <span
                  class="block h-2 w-2 rounded-[2px] bg-for"
                />
                <p
                  class="text-sm font-medium text-muted-foreground"
                >
                  TVL For
                </p>
              </div>
              <p
                class="text-primary text-lg font-normal text-right"
              >
                3.643 ETH
              </p>
            </div>
          </div>
          <div
            class="flex justify-between items-center"
          >
            <div>
              <div
                class="flex gap-1 items-center"
              >
                <span
                  class="block h-2 w-2 rounded-[2px] bg-against"
                />
                <p
                  class="text-sm font-medium text-muted-foreground"
                >
                  TVL Against
                </p>
              </div>
              <p
                class="text-primary text-lg font-normal text-left"
              >
                39
              </p>
            </div>
            <div>
              <div
                class="flex gap-1 items-center justify-end"
              >
                <span
                  class="block h-2 w-2 rounded-[2px] bg-for"
                />
                <p
                  class="text-sm font-medium text-muted-foreground"
                >
                  TVL For
                </p>
              </div>
              <p
                class="text-primary text-lg font-normal text-right"
              >
                124
              </p>
            </div>
          </div>
          <div
            class="flex justify-between items-center gap-4 w-max mt-2"
          >
            <button
              class="flex justify-center items-center font-medium border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted bg-against text-against-foreground border-against rounded-full hover:bg-against/70 hover:border-against/30 shadow-md-subtle px-4 py-2 gap-3 text-base w-36"
              disabled=""
            >
              Deposit Against
            </button>
            <button
              class="flex justify-center items-center font-medium border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted bg-for text-for-foreground border-for rounded-full hover:bg-for/70 hover:border-for/30 shadow-md-subtle px-4 py-2 gap-3 text-base w-36"
              disabled=""
            >
              Deposit For
            </button>
          </div>
        </div>
      </DocumentFragment>
    `)
  })
})
