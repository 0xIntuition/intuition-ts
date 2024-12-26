import React from 'react'

import { render } from '@testing-library/react'

import { FileExplorerItem } from './FileExplorer'

describe('FileExplorerItem', () => {
  // Example assertion: Check if the component renders a specific text
  it('should render appropriate element', () => {
    const { asFragment } = render(
      <FileExplorerItem node={{ name: 'Something' }} />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <p>Something</p>>
    </DocumentFragment>
    `)
  })
  // Add more tests as needed to cover the functionality of your component
  // Additional tests can be written here to check different states and props
})
