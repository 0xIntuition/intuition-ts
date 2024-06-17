import React from 'react'

import { render } from '@testing-library/react'

import { Claim } from './Claim'

describe('Claim', () => {
  // Example assertion: Check if the component renders a specific text
  it('should render appropriate element', () => {
    const { asFragment } = render(<Claim>Something</Claim>)
    expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <p>Something</p>>
    </DocumentFragment>
    `)
  })
  // Add more tests as needed to cover the functionality of your component
  // Additional tests can be written here to check different states and props
})
