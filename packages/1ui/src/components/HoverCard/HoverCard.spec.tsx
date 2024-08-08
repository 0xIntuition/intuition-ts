import React from 'react'

import { render } from '@testing-library/react'

import { Button } from '..'
import { HoverCard, HoverCardContent, HoverCardTrigger } from './HoverCard'

describe('HoverCard', () => {
  it('should render appropriate element', () => {
    const { asFragment } = render(
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button>@super_dave</Button>
        </HoverCardTrigger>
        <HoverCardContent>content</HoverCardContent>
      </HoverCard>,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          class="flex justify-center items-center gap-2 text-sm font-medium border disabled:bg-muted aria-disabled:bg-muted disabled:text-muted-foreground aria-disabled:text-muted-foreground disabled:border-muted aria-disabled:border-muted aria-disabled:pointer-events-none bg-primary text-primary-foreground border-primary hover:bg-primary/80 rounded-full shadow-md-subtle px-3 py-1 max-sm:py-2 max-sm:text-base"
          data-state="closed"
        >
          @super_dave
        </button>
      </DocumentFragment>
    `)
  })
})
