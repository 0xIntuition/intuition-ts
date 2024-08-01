import React from 'react'

import { render } from '@testing-library/react'

import { Copy } from './Copy'

describe('Copy', () => {
  it('should render a button', () => {
    const { asFragment } = render(<Copy text="Test text" />)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          class="flex justify-center items-center gap-2 text-sm font-medium border disabled:text-muted-foreground bg-transparent text-primary/70 border-transparent hover:text-primary disabled:border-transparent disabled:bg-transparent shadow-md-subtle p-0 h-4 w-4 undefined"
        >
          <svg
            class="h-4 w-4 text-primary"
          >
            <use
              href="/src/components/Icon/Icon.sprites.svg#copy"
            />
          </svg>
        </button>
      </DocumentFragment>
    `)
  })
})
