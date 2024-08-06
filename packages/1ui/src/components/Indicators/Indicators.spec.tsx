import React from 'react'

import { render } from '@testing-library/react'

import { MonetaryValue } from './components'

describe('MonetaryValue', () => {
  it('should render the MonetaryValue component', () => {
    const { asFragment } = render(
      <MonetaryValue value={0.345} currency="ETH" />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <p
          class="text-primary text-lg font-medium"
        >
          0.345 ETH
        </p>
      </DocumentFragment>
    `)
  })
})
