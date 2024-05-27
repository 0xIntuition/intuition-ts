import React from 'react'

import { render } from '@testing-library/react'

import { Icon } from './Icon'

describe('Icon', () => {
  it('should render appropriate element', () => {
    const { asFragment } = render(<Icon name="book" />)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <svg
          class="h-6 w-6"
        >
          <use
            href="/src/components/Icon/Icon.sprites.svg#book"
          />
        </svg>
      </DocumentFragment>
    `)
  })
})
