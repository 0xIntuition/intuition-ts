import React from 'react'

import { render } from '@testing-library/react'

import { Badge } from './Badge'

describe('Badge', () => {
  it('should render appropriate element when given no variant', () => {
    const { asFragment } = render(<Badge>Badge</Badge>)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="inline-flex items-center gap-1 rounded-md pl-1 pr-1.5 py-0.5 text-sm font-light text-foreground/65 bg-primary/10"
        >
          Badge
        </div>
      </DocumentFragment>
    `)
  })
  it('should render appropriate element when given `success` variant', () => {
    const { asFragment } = render(<Badge variant="success">Badge</Badge>)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="inline-flex items-center gap-1 rounded-md pl-1 pr-1.5 py-0.5 text-sm font-light text-foreground/65 bg-success/50"
        >
          Badge
        </div>
      </DocumentFragment>
    `)
  })
  it('should render appropriate element when given `accent` variant', () => {
    const { asFragment } = render(<Badge variant="accent">Badge</Badge>)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="inline-flex items-center gap-1 rounded-md pl-1 pr-1.5 py-0.5 text-sm font-light text-foreground/65 bg-accent/50"
        >
          Badge
        </div>
      </DocumentFragment>
    `)
  })
  it('should render appropriate element when given `social` variant', () => {
    const { asFragment } = render(<Badge variant="social">Badge</Badge>)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="inline-flex items-center gap-1 rounded-md pl-1 pr-1.5 py-0.5 text-sm font-light text-foreground/65 bg-social/50"
        >
          Badge
        </div>
      </DocumentFragment>
    `)
  })
  it('should render appropriate element when given `warning` variant', () => {
    const { asFragment } = render(<Badge variant="warning">Badge</Badge>)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="inline-flex items-center gap-1 rounded-md pl-1 pr-1.5 py-0.5 text-sm font-light text-foreground/65 bg-warning/50"
        >
          Badge
        </div>
      </DocumentFragment>
    `)
  })
  it('should render appropriate element when given `against` variant', () => {
    const { asFragment } = render(<Badge variant="against">Badge</Badge>)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="inline-flex items-center gap-1 rounded-md pl-1 pr-1.5 py-0.5 text-sm font-light text-foreground/65 bg-against/50"
        >
          Badge
        </div>
      </DocumentFragment>
    `)
  })
  it('should render appropriate element when given `for` variant', () => {
    const { asFragment } = render(<Badge variant="for">Badge</Badge>)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="inline-flex items-center gap-1 rounded-md pl-1 pr-1.5 py-0.5 text-sm font-light text-foreground/65 bg-for/50"
        >
          Badge
        </div>
      </DocumentFragment>
    `)
  })
  it('should render appropriate element when given `destructive` variant', () => {
    const { asFragment } = render(<Badge variant="destructive">Badge</Badge>)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="inline-flex items-center gap-1 rounded-md pl-1 pr-1.5 py-0.5 text-sm font-light text-foreground/65 bg-destructive/50"
        >
          Badge
        </div>
      </DocumentFragment>
    `)
  })
})
