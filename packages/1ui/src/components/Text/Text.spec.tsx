import React from 'react'
import { Text } from './Text'
import { cleanup, render } from '@testing-library/react'

describe('Text', () => {
  afterEach(() => {
    cleanup()
  })

  it('should render appropriate element type and class name', () => {
    const { asFragment } = render(<Text>Text</Text>)
    expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <p
        class=""
      >
        Text
      </p>
    </DocumentFragment>
    `)
  })
})
