import React from 'react'

import { render } from '@testing-library/react'

import { Label } from './Label'

describe('Label', () => {
  it('should render appropriate element', () => {
    const { asFragment } = render(
      <Label htmlFor="email">Your email address</Label>,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <label
          class="text-base font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          for="email"
        >
          Your email address
        </label>
      </DocumentFragment>
    `)
  })
})
