import React from 'react'

import { render } from '@testing-library/react'

import { Copy } from './Copy'

describe('Copy', () => {
  it('should render a button', () => {
    const { asFragment } = render(<Copy text="Test text" />)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          class="flex justify-center items-center text-sm font-medium border disabled:text-muted-foreground bg-transparent text-primary/70 border-transparent hover:text-primary disabled:border-transparent disabled:bg-transparent shadow-md-subtle px-3 py-1 uppercase gap-2 pl-0 undefined"
          tabindex="0"
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
