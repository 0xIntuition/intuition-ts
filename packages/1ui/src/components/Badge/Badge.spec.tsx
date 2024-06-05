import React from 'react'

import { render } from '@testing-library/react'

import { Badge } from './Badge'

describe('Badge', () => {
  // Example assertion: Check if the component renders a specific text
  it('should render appropriate element', () => {
    const { asFragment } = render(<Badge>Something</Badge>)
    expect(asFragment()).toMatchInlineSnapshot(`<DocumentFragment />`)
  })
  // Add more tests as needed to cover the functionality of your component
  // Additional tests can be written here to check different states and props
})
