import React from 'react'

import { render } from '@testing-library/react'

import { Button } from './Button'

describe('Button', () => {
  it('should render appropriate element and classes when given no props', () => {
    const { asFragment } = render(<Button>Text</Button>)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          class="flex items-center gap-2 text-sm font-medium border-solid border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted shadow-md-subtle bg-primary text-primary-foreground border-primary hover:bg-primary/80 rounded-full px-3 py-1"
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
          class="flex items-center gap-2 text-sm font-medium border-solid border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted shadow-md-subtle primary-gradient-subtle text-primary/60 border-primary/10 rounded-lg hover:text-primary disabled:from-muted disabled:to-muted px-3 py-1"
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
          class="flex items-center gap-2 text-sm font-medium border-solid border disabled:text-muted-foreground disabled:border-muted shadow-md-subtle bg-gradient-to-b from-transparent to-transparent text-primary/70 border-primary/70 rounded-lg hover:text-primary hover:border-primary disabled:bg-transparent aria-selected:primary-gradient-subtle aria-selected:border-primary/10 px-3 py-1"
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
          class="flex items-center gap-2 text-sm font-medium border-solid border disabled:text-muted-foreground shadow-md-subtle bg-transparent text-primary/70 border-transparent hover:text-primary disabled:border-transparent disabled:bg-transparent px-3 py-1"
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
          class="flex items-center gap-2 text-sm font-medium border-solid border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted shadow-md-subtle bg-accent text-accent-foreground border-accent rounded-full hover:bg-accent/70 hover:border-accent/30 px-3 py-1"
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
          class="flex items-center gap-2 text-sm font-medium border-solid border disabled:bg-muted disabled:border-muted shadow-md-subtle bg-transparent text-secondary-foreground/70 border-transparent rounded-lg hover:text-secondary-foreground hover:border-border/20 aria-selected:bg-primary/10 aria-selected:text-secondary-foreground/80 disabled:text-muted-foreground shadow-none px-3 py-1"
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
          class="flex items-center gap-2 text-sm font-medium border-solid border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted shadow-md-subtle bg-warning text-warning-foreground border-warning rounded-full hover:bg-warning/70 hover:border-warning/30 px-3 py-1"
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
          class="flex items-center gap-2 text-sm font-medium border-solid border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted shadow-md-subtle bg-success text-success-foreground border-success rounded-full hover:bg-success/70 hover:border-success/30 px-3 py-1"
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
          class="flex items-center gap-2 text-sm font-medium border-solid border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted shadow-md-subtle bg-destructive text-destructive-foreground border-destructive rounded-full hover:bg-destructive/70 hover:border-destructive/30 px-3 py-1"
        >
          Text
        </button>
      </DocumentFragment>
    `)
  })
  it('should render appropriate element and classes when given medium size value', () => {
    const { asFragment } = render(<Button size="medium">Text</Button>)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          class="flex items-center gap-2 text-sm font-medium border-solid border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted shadow-md-subtle bg-primary text-primary-foreground border-primary hover:bg-primary/80 rounded-full"
        >
          Text
        </button>
      </DocumentFragment>
    `)
  })
  it('should render appropriate element and classes when given large size value', () => {
    const { asFragment } = render(<Button size="large">Text</Button>)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          class="flex items-center gap-2 text-sm font-medium border-solid border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted shadow-md-subtle bg-primary text-primary-foreground border-primary hover:bg-primary/80 rounded-full"
        >
          Text
        </button>
      </DocumentFragment>
    `)
  })
  it('should render appropriate element and classes when given extraLarge size value', () => {
    const { asFragment } = render(<Button size="extraLarge">Text</Button>)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          class="flex items-center gap-2 text-sm font-medium border-solid border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted shadow-md-subtle bg-primary text-primary-foreground border-primary hover:bg-primary/80 rounded-full"
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
          class="flex items-center gap-2 text-sm font-medium border-solid border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted shadow-md-subtle bg-primary text-primary-foreground border-primary hover:bg-primary/80 rounded-full px-3 py-1"
        >
          <svg
            class="lucide lucide-loader-circle h-6 w-6 animate-spin"
            fill="none"
            height="24"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 12a9 9 0 1 1-6.219-8.56"
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
          class="flex items-center gap-2 text-sm font-medium border-solid border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted shadow-md-subtle bg-primary text-primary-foreground border-primary hover:bg-primary/80 rounded-full px-3 py-1"
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
          class="flex items-center gap-2 text-sm font-medium border-solid border disabled:text-muted-foreground disabled:border-muted shadow-md-subtle bg-gradient-to-b from-transparent to-transparent text-primary/70 border-primary/70 rounded-lg hover:text-primary hover:border-primary disabled:bg-transparent aria-selected:primary-gradient-subtle aria-selected:border-primary/10 px-3 py-1"
        >
          Text
        </button>
      </DocumentFragment>
    `)
  })
})
