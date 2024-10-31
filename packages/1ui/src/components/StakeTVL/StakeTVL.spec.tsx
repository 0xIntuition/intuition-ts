import React from 'react'

import { render } from '@testing-library/react'

import { StakeTVL } from './StakeTVL'

describe('StakeTVL', () => {
  it('should render TVL information', () => {
    const { asFragment } = render(<StakeTVL amount="4.928" currency="ETH" />)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex flex-col items-end"
        >
          <div
            class="text-sm font-normal text-primary/70"
          >
            TVL
          </div>
          <div
            class="text-sm font-normal"
          >
            4.928 ETH
          </div>
        </div>
      </DocumentFragment>
    `)
  })
})
