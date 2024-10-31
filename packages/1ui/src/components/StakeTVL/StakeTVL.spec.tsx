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
                class="text-sm font-normal"
              >
                420.69 ETH
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
    expect(asFragment()).toMatchInlineSnapshot()
  })
})
