import React from 'react'

import { render } from '@testing-library/react'

import { Button } from './Button'

describe('Button', () => {
  it('should render appropriate element and classes when given no props', () => {
    const { asFragment } = render(<Button>Text</Button>)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          class="flex justify-center items-center gap-2 text-sm font-medium border disabled:bg-muted aria-disabled:bg-muted disabled:text-muted-foreground aria-disabled:text-muted-foreground disabled:border-muted aria-disabled:border-muted aria-disabled:pointer-events-none bg-primary text-primary-foreground border-primary hover:bg-primary/80 rounded-full shadow-md-subtle px-3 py-1 max-sm:py-2 max-sm:text-base"
        >
          Text
        </button>
      </DocumentFragment>
    `)
  })
  it('should render appropriate element and classes when given secondary variant value', () => {
    const { asFragment } = render(<Button variant="secondary">Text</Button>)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          class="flex justify-center items-center gap-2 text-sm font-medium border disabled:bg-muted aria-disabled:bg-muted disabled:text-muted-foreground aria-disabled:text-muted-foreground disabled:border-muted aria-disabled:border-muted aria-disabled:pointer-events-none primary-gradient-subtle text-primary/60 border-primary/10 rounded-lg hover:text-primary disabled:from-muted aria-disabled:from-muted disabled:to-muted aria-disabled:to-muted shadow-md-subtle px-3 py-1 max-sm:py-2 max-sm:text-base"
        >
          Text
        </button>
      </DocumentFragment>
    `)
  })
  it('should render appropriate element and classes when given ghost variant value', () => {
    const { asFragment } = render(<Button variant="ghost">Text</Button>)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          class="flex justify-center items-center gap-2 text-sm font-medium border disabled:text-muted-foreground aria-disabled:text-muted-foreground disabled:border-muted aria-disabled:border-muted aria-disabled:pointer-events-none bg-gradient-to-b from-transparent to-transparent text-primary/70 border-primary/50 rounded-lg hover:text-primary hover:border-primary disabled:bg-transparent aria-disabled:bg-transparent aria-selected:primary-gradient-subtle aria-selected:border-primary/10 shadow-md-subtle px-3 py-1 max-sm:py-2 max-sm:text-base"
        >
          Text
        </button>
      </DocumentFragment>
    `)
  })
  it('should render appropriate element and classes when given text variant value', () => {
    const { asFragment } = render(<Button variant="text">Text</Button>)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          class="flex justify-center items-center gap-2 text-sm font-medium border disabled:text-muted-foreground aria-disabled:text-muted-foreground aria-disabled:pointer-events-none bg-transparent text-primary/70 border-transparent hover:text-primary disabled:border-transparent aria-disabled:border-transparent disabled:bg-transparent aria-disabled:bg-transparent shadow-none px-3 py-1 max-sm:py-2 max-sm:text-base"
        >
          Text
        </button>
      </DocumentFragment>
    `)
  })
  it('should render appropriate element and classes when given accent variant value', () => {
    const { asFragment } = render(<Button variant="accent">Text</Button>)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          class="flex justify-center items-center gap-2 text-sm font-medium border disabled:bg-muted aria-disabled:bg-muted disabled:text-muted-foreground aria-disabled:text-muted-foreground disabled:border-muted aria-disabled:border-muted aria-disabled:pointer-events-none bg-accent text-accent-foreground border-accent rounded-full hover:bg-accent/70 hover:border-accent/30 shadow-md-subtle px-3 py-1 max-sm:py-2 max-sm:text-base"
        >
          Text
        </button>
      </DocumentFragment>
    `)
  })
  it('should render appropriate element and classes when given navigation variant value', () => {
    const { asFragment } = render(<Button variant="navigation">Text</Button>)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          class="flex justify-center items-center gap-2 text-sm font-medium border disabled:bg-muted aria-disabled:bg-muted disabled:border-muted aria-disabled:border-muted aria-disabled:pointer-events-none bg-transparent text-secondary-foreground/70 border-transparent rounded-lg hover:text-secondary-foreground hover:border-border/20 aria-selected:bg-primary/10 aria-selected:text-secondary-foreground/80 disabled:text-muted-foreground aria-disabled:text-muted-foreground px-3 py-1 max-sm:py-2 max-sm:text-base"
        >
          Text
        </button>
      </DocumentFragment>
    `)
  })
  it('should render appropriate element and classes when given warning variant value', () => {
    const { asFragment } = render(<Button variant="warning">Text</Button>)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          class="flex justify-center items-center gap-2 text-sm font-medium border disabled:bg-muted aria-disabled:bg-muted disabled:text-muted-foreground aria-disabled:text-muted-foreground disabled:border-muted aria-disabled:border-muted aria-disabled:pointer-events-none bg-warning text-warning-foreground border-warning rounded-full hover:bg-warning/70 hover:border-warning/30 shadow-md-subtle px-3 py-1 max-sm:py-2 max-sm:text-base"
        >
          Text
        </button>
      </DocumentFragment>
    `)
  })
  it('should render appropriate element and classes when given success variant value', () => {
    const { asFragment } = render(<Button variant="success">Text</Button>)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          class="flex justify-center items-center gap-2 text-sm font-medium border disabled:bg-muted aria-disabled:bg-muted disabled:text-muted-foreground aria-disabled:text-muted-foreground disabled:border-muted aria-disabled:border-muted aria-disabled:pointer-events-none bg-success text-success-foreground border-success rounded-full hover:bg-success/70 hover:border-success/30 shadow-md-subtle px-3 py-1 max-sm:py-2 max-sm:text-base"
        >
          Text
        </button>
      </DocumentFragment>
    `)
  })
  it('should render appropriate element and classes when given destructive variant value', () => {
    const { asFragment } = render(<Button variant="destructive">Text</Button>)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          class="flex justify-center items-center gap-2 text-sm font-medium border disabled:bg-muted aria-disabled:bg-muted disabled:text-muted-foreground aria-disabled:text-muted-foreground disabled:border-muted aria-disabled:border-muted aria-disabled:pointer-events-none bg-destructive text-destructive-foreground border-destructive rounded-full hover:bg-destructive/70 hover:border-destructive/30 shadow-md-subtle px-3 py-1 max-sm:py-2 max-sm:text-base"
        >
          Text
        </button>
      </DocumentFragment>
    `)
  })
  it('should render appropriate element and classes when given accentOutline variant value', () => {
    const { asFragment } = render(<Button variant="accentOutline">Text</Button>)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          class="flex justify-center items-center gap-2 text-sm font-medium border disabled:bg-muted aria-disabled:bg-muted disabled:text-muted-foreground aria-disabled:text-muted-foreground disabled:border-muted aria-disabled:border-muted aria-disabled:pointer-events-none bg-transparent text-accent border-accent rounded-full hover:bg-accent/30 hover:border-accent/30 shadow-md-subtle px-3 py-1 max-sm:py-2 max-sm:text-base"
        >
          Text
        </button>
      </DocumentFragment>
    `)
  })
  it('should render appropriate element and classes when given warningOutline variant value', () => {
    const { asFragment } = render(
      <Button variant="warningOutline">Text</Button>,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          class="flex justify-center items-center gap-2 text-sm font-medium border disabled:bg-muted aria-disabled:bg-muted disabled:text-muted-foreground aria-disabled:text-muted-foreground disabled:border-muted aria-disabled:border-muted aria-disabled:pointer-events-none bg-transparent text-warning border-warning rounded-full hover:bg-warning/30 hover:border-warning/30 shadow-md-subtle px-3 py-1 max-sm:py-2 max-sm:text-base"
        >
          Text
        </button>
      </DocumentFragment>
    `)
  })
  it('should render appropriate element and classes when given successOutline variant value', () => {
    const { asFragment } = render(
      <Button variant="successOutline">Text</Button>,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          class="flex justify-center items-center gap-2 text-sm font-medium border disabled:bg-muted aria-disabled:bg-muted disabled:text-muted-foreground aria-disabled:text-muted-foreground disabled:border-muted aria-disabled:border-muted aria-disabled:pointer-events-none bg-transparent text-success border-success rounded-full hover:bg-success/30 hover:border-success/30 shadow-md-subtle px-3 py-1 max-sm:py-2 max-sm:text-base"
        >
          Text
        </button>
      </DocumentFragment>
    `)
  })
  it('should render appropriate element and classes when given destructive variant value', () => {
    const { asFragment } = render(<Button variant="destructive">Text</Button>)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          class="flex justify-center items-center gap-2 text-sm font-medium border disabled:bg-muted aria-disabled:bg-muted disabled:text-muted-foreground aria-disabled:text-muted-foreground disabled:border-muted aria-disabled:border-muted aria-disabled:pointer-events-none bg-destructive text-destructive-foreground border-destructive rounded-full hover:bg-destructive/70 hover:border-destructive/30 shadow-md-subtle px-3 py-1 max-sm:py-2 max-sm:text-base"
        >
          Text
        </button>
      </DocumentFragment>
    `)
  })
  it('should render appropriate element and classes when given medium size value', () => {
    const { asFragment } = render(<Button size="md">Text</Button>)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          class="flex justify-center items-center gap-2 text-sm font-medium border disabled:bg-muted aria-disabled:bg-muted disabled:text-muted-foreground aria-disabled:text-muted-foreground disabled:border-muted aria-disabled:border-muted aria-disabled:pointer-events-none bg-primary text-primary-foreground border-primary hover:bg-primary/80 rounded-full shadow-md-subtle px-4 py-1.5"
        >
          Text
        </button>
      </DocumentFragment>
    `)
  })
  it('should render appropriate element and classes when given large size value', () => {
    const { asFragment } = render(<Button size="lg">Text</Button>)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          class="flex justify-center items-center font-medium border disabled:bg-muted aria-disabled:bg-muted disabled:text-muted-foreground aria-disabled:text-muted-foreground disabled:border-muted aria-disabled:border-muted aria-disabled:pointer-events-none bg-primary text-primary-foreground border-primary hover:bg-primary/80 rounded-full shadow-md-subtle px-4 py-2 gap-2 text-base"
        >
          Text
        </button>
      </DocumentFragment>
    `)
  })
  it('should render appropriate element and classes when given extraLarge size value', () => {
    const { asFragment } = render(<Button size="xl">Text</Button>)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          class="flex justify-center items-center font-medium border disabled:bg-muted aria-disabled:bg-muted disabled:text-muted-foreground aria-disabled:text-muted-foreground disabled:border-muted aria-disabled:border-muted aria-disabled:pointer-events-none bg-primary text-primary-foreground border-primary hover:bg-primary/80 rounded-full shadow-md-subtle px-5 py-2.5 gap-4 text-lg"
        >
          Text
        </button>
      </DocumentFragment>
    `)
  })
  it('should render appropriate element and classes when given isLoading prop', () => {
    const { asFragment } = render(<Button isLoading>Text</Button>)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          class="flex justify-center items-center gap-2 text-sm font-medium border disabled:bg-muted aria-disabled:bg-muted disabled:text-muted-foreground aria-disabled:text-muted-foreground disabled:border-muted aria-disabled:border-muted aria-disabled:pointer-events-none bg-primary text-primary-foreground border-primary hover:bg-primary/80 rounded-full shadow-md-subtle px-3 py-1 max-sm:py-2 max-sm:text-base"
        >
          <svg
            class="h-6 w-6 animate-spin"
          >
            <use
              href="/src/components/Icon/Icon.sprites.svg#in-progress"
            />
          </svg>
          Text
        </button>
      </DocumentFragment>
    `)
  })
  it('should render appropriate element and classes when given disabled prop', () => {
    const { asFragment } = render(<Button disabled>Text</Button>)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          class="flex justify-center items-center gap-2 text-sm font-medium border disabled:bg-muted aria-disabled:bg-muted disabled:text-muted-foreground aria-disabled:text-muted-foreground disabled:border-muted aria-disabled:border-muted aria-disabled:pointer-events-none bg-primary text-primary-foreground border-primary hover:bg-primary/80 rounded-full shadow-md-subtle px-3 py-1 max-sm:py-2 max-sm:text-base"
          disabled=""
        >
          Text
        </button>
      </DocumentFragment>
    `)
  })
  it('should render appropriate element and classes when given ghost variant and aria-selected prop', () => {
    const { asFragment } = render(
      <Button aria-selected variant="ghost">
        Text
      </Button>,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          aria-selected="true"
          class="flex justify-center items-center gap-2 text-sm font-medium border disabled:text-muted-foreground aria-disabled:text-muted-foreground disabled:border-muted aria-disabled:border-muted aria-disabled:pointer-events-none bg-gradient-to-b from-transparent to-transparent text-primary/70 border-primary/50 rounded-lg hover:text-primary hover:border-primary disabled:bg-transparent aria-disabled:bg-transparent aria-selected:primary-gradient-subtle aria-selected:border-primary/10 shadow-md-subtle px-3 py-1 max-sm:py-2 max-sm:text-base"
        >
          Text
        </button>
      </DocumentFragment>
    `)
  })
})
