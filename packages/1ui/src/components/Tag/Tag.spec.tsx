import React from 'react'

import { render } from '@testing-library/react'

import { Tag } from './Tag'

describe('Tag', () => {
  it('should render appropriate element when given no variant', () => {
    const { asFragment } = render(<Tag>Tag</Tag>)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          class="inline-flex items-center gap-1 rounded-full px-2 py-0.5 border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted-foreground bg-primary/10 text-primary/90 border-primary/20 hover:bg-primary/20 hover:text-primary hover:border-primary/40 text-base font-normal"
        >
          Tag
        </button>
      </DocumentFragment>
    `)
  })
  it('should render appropriate element when given `success` variant', () => {
    const { asFragment } = render(<Tag variant="success">Tag</Tag>)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          class="inline-flex items-center gap-1 rounded-full px-2 py-0.5 border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted-foreground bg-success/10 text-success/90 border-success/40 hover:bg-success/30 hover:text-success hover:border-success/60 text-base font-normal"
        >
          Tag
        </button>
      </DocumentFragment>
    `)
  })
  it('should render appropriate element when given `accent` variant', () => {
    const { asFragment } = render(<Tag variant="accent">Tag</Tag>)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          class="inline-flex items-center gap-1 rounded-full px-2 py-0.5 border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted-foreground bg-accent/10 text-accent/90 border-accent/40 hover:bg-accent/30 hover:text-accent hover:border-accent/60 text-base font-normal"
        >
          Tag
        </button>
      </DocumentFragment>
    `)
  })
  it('should render appropriate element when given `social` variant', () => {
    const { asFragment } = render(<Tag variant="social">Tag</Tag>)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          class="inline-flex items-center gap-1 rounded-full px-2 py-0.5 border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted-foreground bg-social/10 text-social/90 border-social/40 hover:bg-social/30 hover:text-social hover:border-social/60 text-base font-normal"
        >
          Tag
        </button>
      </DocumentFragment>
    `)
  })
  it('should render appropriate element when given `warning` variant', () => {
    const { asFragment } = render(<Tag variant="warning">Tag</Tag>)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          class="inline-flex items-center gap-1 rounded-full px-2 py-0.5 border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted-foreground bg-warning/10 text-warning/90 border-warning/40 hover:bg-warning/30 hover:text-warning hover:border-warning/60 text-base font-normal"
        >
          Tag
        </button>
      </DocumentFragment>
    `)
  })
  it('should render appropriate element when given `against` variant', () => {
    const { asFragment } = render(<Tag variant="against">Tag</Tag>)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          class="inline-flex items-center gap-1 rounded-full px-2 py-0.5 border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted-foreground bg-against/10 text-against/90 border-against/40 hover:bg-against/30 hover:text-against hover:border-against/60 text-base font-normal"
        >
          Tag
        </button>
      </DocumentFragment>
    `)
  })
  it('should render appropriate element when given `for` variant', () => {
    const { asFragment } = render(<Tag variant="for">Tag</Tag>)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          class="inline-flex items-center gap-1 rounded-full px-2 py-0.5 border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted-foreground bg-for/10 text-for/90 border-for/30 hover:bg-for/40 hover:text-for hover:border-for/60 text-base font-normal"
        >
          Tag
        </button>
      </DocumentFragment>
    `)
  })
  it('should render appropriate element when given `destructive` variant', () => {
    const { asFragment } = render(<Tag variant="destructive">Tag</Tag>)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          class="inline-flex items-center gap-1 rounded-full px-2 py-0.5 border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted-foreground bg-destructive/10 text-destructive/90 border-destructive/40 hover:bg-destructive/30 hover:text-destructive hover:border-destructive/60 text-base font-normal"
        >
          Tag
        </button>
      </DocumentFragment>
    `)
  })
})
