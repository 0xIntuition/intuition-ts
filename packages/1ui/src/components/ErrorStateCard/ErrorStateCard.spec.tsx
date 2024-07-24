import React from 'react'

import { render } from '@testing-library/react'
import { Button } from 'components/Button'

import { ErrorStateCard } from './ErrorStateCard'

describe('EmptyStateCard', () => {
  it('should render appropriate element', () => {
    const { asFragment } = render(
      <ErrorStateCard message="An error occured">
        <Button size="md" onClick={() => console.log('Clicked')}>
          Add Stake
        </Button>
      </ErrorStateCard>,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex flex-col justify-center items-center p-6 theme-border rounded-lg min-h-52"
        >
          <svg
            class="w-12 h-12 mb-4"
          >
            <use
              href="/src/components/Icon/Icon.sprites.svg#inbox-empty"
            />
          </svg>
          <p
            class="text-sm font-normal text-muted-foreground mb-5"
          >
            An error occured
          </p>
          <button
            class="flex justify-center items-center gap-2 text-sm font-medium border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted bg-primary text-primary-foreground border-primary hover:bg-primary/80 rounded-full shadow-md-subtle px-4 py-1.5"
          >
            Add Stake
          </button>
        </div>
      </DocumentFragment>
    `)
  })
})
