import React from 'react'

import { render } from '@testing-library/react'

import { Badge } from './Badge'

describe('Badge', () => {
  it('should render appropriate element when given no variant', () => {
    const { asFragment } = render(<Badge>Badge</Badge>)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow-md-subtle border-transparent bg-primary text-primary-foreground hover:bg-primary/80"
        >
          Badge
        </div>
      </DocumentFragment>
    `)
  })
  it('should render appropriate element when given `secondary` variant', () => {
    const { asFragment } = render(<Badge variant="secondary">Badge</Badge>)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow-md-subtle primary-gradient-subtle text-primary/70 border-primary/10 hover:text-primary"
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
          class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow-md-subtle border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80"
        >
          Badge
        </div>
      </DocumentFragment>
    `)
  })
  it('should render appropriate element when given `outline` variant', () => {
    const { asFragment } = render(<Badge variant="outline">Badge</Badge>)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow-md-subtle text-foreground border-border/30 hover:bg-primary/20"
        >
          Badge
        </div>
      </DocumentFragment>
    `)
  })
})
