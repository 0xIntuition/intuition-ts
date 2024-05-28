import React from 'react'

import { render } from '@testing-library/react'

import { Command } from './Command'

describe('Command', () => {
  // Example assertion: Check if the component renders a specific text
  it('should render appropriate element', () => {
    const { asFragment } = render(<Command>Something</Command>)
    expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <p>Something</p>>
    </DocumentFragment>
    `)
  })
  // Add more tests as needed to cover the functionality of your component
  // Additional tests can be written here to check different states and props
})
