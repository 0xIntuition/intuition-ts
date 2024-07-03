import React from 'react'

import { render } from '@testing-library/react'

import { Trunctacular } from './Trunctacular'

describe('Trunctacular', () => {
  it('should render appropriate elements when given long string value', () => {
    const { asFragment } = render(<Trunctacular value="reallyReallyLongName" />)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          data-state="closed"
        >
          <p
            class="text-primary text-base font-normal"
          >
            reallyReall...
          </p>
        </button>
      </DocumentFragment>
    `)
  })
  it('should render appropriate elements when given wallet address value', () => {
    const { asFragment } = render(
      <Trunctacular value="0x1234567890abcdef1234567890abcdef12345678" />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          data-state="closed"
        >
          <p
            class="text-primary text-base font-normal"
          >
            0x1234...5678
          </p>
        </button>
      </DocumentFragment>
    `)
  })
  it('should render appropriate elements when given short string value', () => {
    const { asFragment } = render(<Trunctacular value="shortName" />)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <p
          class="text-primary text-base font-normal"
        >
          shortName
        </p>
      </DocumentFragment>
    `)
  })
})
