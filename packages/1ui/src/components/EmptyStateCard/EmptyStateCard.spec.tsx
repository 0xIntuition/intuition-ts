import React from 'react'

import { render } from '@testing-library/react'
import { Button } from 'components/Button'

import { EmptyStateCard } from './EmptyStateCard'

describe('EmptyStateCard', () => {
  it('should render appropriate element', () => {
    const { asFragment } = render(
      <EmptyStateCard message="No data available">
        <Button size="md" onClick={() => console.log('Clicked')}>
          Add Stake
        </Button>
      </EmptyStateCard>,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex flex-col justify-center items-center p-6 theme-border rounded-lg min-h-64 w-full gap-2"
        >
          <svg
            class="w-12 h-12 text-muted-foreground"
          >
            <use
              href="/src/components/Icon/Icon.sprites.svg#inbox-empty"
            />
          </svg>
          <div
            class="text-base font-normal text-muted-foreground"
          >
            No data available
          </div>
          <button
            class="flex justify-center items-center gap-2 text-sm font-medium border disabled:bg-muted aria-disabled:bg-muted disabled:text-muted-foreground aria-disabled:text-muted-foreground disabled:border-muted aria-disabled:border-muted aria-disabled:pointer-events-none bg-primary text-primary-foreground border-primary hover:bg-primary/80 rounded-full shadow-md-subtle px-4 py-1.5"
          >
            Add Stake
          </button>
        </div>
      </DocumentFragment>
    `)
  })
})
