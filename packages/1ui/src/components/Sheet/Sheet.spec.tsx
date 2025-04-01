import React from 'react'

import { render } from '@testing-library/react'

import { Button } from '../Button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './Sheet'

describe('Sheet', () => {
  it('should render appropriate element', () => {
    const { asFragment } = render(
      <Sheet>
        <SheetTrigger asChild>
          <Button>Open</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Test Sheet</SheetTitle>
            <SheetDescription>Test Description</SheetDescription>
          </SheetHeader>
          <div>Content</div>
        </SheetContent>
      </Sheet>,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          aria-controls="radix-:r0:"
          aria-expanded="false"
          aria-haspopup="dialog"
          class="flex justify-center items-center gap-2 text-sm font-medium border disabled:bg-muted aria-disabled:bg-muted disabled:text-muted-foreground aria-disabled:text-muted-foreground disabled:border-muted aria-disabled:border-muted aria-disabled:pointer-events-none bg-primary text-primary-foreground border-primary hover:bg-primary/80 rounded-full shadow-md-subtle px-3 py-1 max-sm:py-2 max-sm:text-base"
          data-state="closed"
          type="button"
        >
          Open
        </button>
      </DocumentFragment>
    `)
  })

  it('should render with custom side position', () => {
    const { asFragment } = render(
      <Sheet>
        <SheetTrigger asChild>
          <Button>Open</Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Right Sheet</SheetTitle>
          </SheetHeader>
          <div>Right-sided content</div>
        </SheetContent>
      </Sheet>,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          aria-controls="radix-:r3:"
          aria-expanded="false"
          aria-haspopup="dialog"
          class="flex justify-center items-center gap-2 text-sm font-medium border disabled:bg-muted aria-disabled:bg-muted disabled:text-muted-foreground aria-disabled:text-muted-foreground disabled:border-muted aria-disabled:border-muted aria-disabled:pointer-events-none bg-primary text-primary-foreground border-primary hover:bg-primary/80 rounded-full shadow-md-subtle px-3 py-1 max-sm:py-2 max-sm:text-base"
          data-state="closed"
          type="button"
        >
          Open
        </button>
      </DocumentFragment>
    `)
  })
})
