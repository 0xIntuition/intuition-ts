import React from 'react'

import { render } from '@testing-library/react'

import { StakeTVL } from './StakeTVL'

describe('StakeTVL', () => {
  it('should render basic TVL information', () => {
    const { asFragment } = render(
      <StakeTVL totalTVL={420.69} tvlFor={240.69} currency="ETH" />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="h-9 justify-start items-center gap-1 inline-flex"
        >
          <div
            class="justify-start items-center gap-1 flex"
          >
            <div
              class="flex-col justify-start items-end inline-flex"
            >
              <div
                class="text-sm font-normal text-primary/70"
              >
                TVL
              </div>
              <div
                class="flex flex-row items-center gap-1"
              >
                <div
                  class="text-primary text-sm font-normal"
                >
                  420.6900
                </div>
                <div
                  class="text-primary text-sm font-normal"
                >
                  ETH
                </div>
              </div>
            </div>
          </div>
        </div>
      </DocumentFragment>
    `)
  })

  it('should render TVL with pie chart', () => {
    const { asFragment } = render(
      <StakeTVL
        totalTVL={420.69}
        tvlFor={240.69}
        currency="ETH"
        isClaim={true}
      />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="h-9 justify-start items-center gap-1 inline-flex"
          data-state="closed"
        >
          <div
            class="justify-start items-center gap-1 flex"
          >
            <div
              class="flex-col justify-start items-end inline-flex"
            >
              <div
                class="text-sm font-normal text-primary/70"
              >
                TVL
              </div>
              <div
                class="flex flex-row items-center gap-1"
              >
                <div
                  class="text-primary text-sm font-normal"
                >
                  420.6900
                </div>
                <div
                  class="text-primary text-sm font-normal"
                >
                  ETH
                </div>
              </div>
            </div>
          </div>
          <div
            class="p-0.5"
          >
            <div
              class="grid"
            >
              <span
                class="col-[1] row-[1] rounded-full block"
                style="height: 32px; width: 32px; mask: radial-gradient(farthest-side,#0000 calc(99% - 4px),var(--background) calc(100% - 4px);"
              />
              <span
                class="col-[1] row-[1] border-muted-foreground rounded-full block"
                style="border-width: 4px;"
              />
            </div>
          </div>
        </div>
      </DocumentFragment>
    `)
  })
})
