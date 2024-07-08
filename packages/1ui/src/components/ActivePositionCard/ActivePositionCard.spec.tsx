import React from 'react'

import { render } from '@testing-library/react'

import { ActivePositionCard } from './ActivePositionCard'

describe('ActivePositionCard', () => {
  it('should render appropriate elements when given no claimPosition value', () => {
    const { asFragment } = render(<ActivePositionCard value={0.567} />)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex justify-between items-center theme-border rounded-lg bg-primary/5 py-3 px-5 w-full gap-8"
        >
          <p
            class="text-base font-normal text-foreground/50"
          >
            Your Active Position
          </p>
          <div
            class="flex items-center gap-2"
          >
            <p
              class="text-primary text-base font-normal"
            >
              0.567 ETH
            </p>
          </div>
        </div>
      </DocumentFragment>
    `)
  })
  it('should render appropriate elements when given `claimFor` claimPosition value', () => {
    const { asFragment } = render(
      <ActivePositionCard value={0.567} claimPosition="claimFor" />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex justify-between items-center theme-border rounded-lg bg-primary/5 py-3 px-5 w-full gap-8"
        >
          <p
            class="text-base font-normal text-foreground/50"
          >
            Your Active Position
          </p>
          <div
            class="flex items-center gap-2"
          >
            <button
              class="inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted-foreground bg-for/10 text-for/90 border-for/30 hover:bg-for/40 hover:text-for hover:border-for/60 text-xs font-medium"
            >
              FOR
            </button>
            <p
              class="text-primary text-base font-normal"
            >
              0.567 ETH
            </p>
          </div>
        </div>
      </DocumentFragment>
    `)
  })
  it('should render appropriate elements when given `claimAgainst` claimPosition value', () => {
    const { asFragment } = render(
      <ActivePositionCard value={0.567} claimPosition="claimAgainst" />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex justify-between items-center theme-border rounded-lg bg-primary/5 py-3 px-5 w-full gap-8"
        >
          <p
            class="text-base font-normal text-foreground/50"
          >
            Your Active Position
          </p>
          <div
            class="flex items-center gap-2"
          >
            <button
              class="inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted-foreground bg-against/10 text-against/90 border-against/40 hover:bg-against/30 hover:text-against hover:border-against/60 text-xs font-medium"
            >
              AGAINST
            </button>
            <p
              class="text-primary text-base font-normal"
            >
              0.567 ETH
            </p>
          </div>
        </div>
      </DocumentFragment>
    `)
  })
})
