import React from 'react'

import { render } from '@testing-library/react'

import { ActivePositionCard } from './ActivePositionCard'

describe('ActivePositionCard', () => {
  it('should render appropriate elements when given no claimPosition value', () => {
    const { asFragment } = render(<ActivePositionCard value={0.567} />)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex justify-between items-center border border-border/10 rounded-lg bg-primary/5 py-3 px-5 w-full gap-8"
        >
          <div
            class="text-base font-normal text-foreground/50"
          >
            Your Active Position
          </div>
          <div
            class="flex items-center gap-2"
          >
            <div
              class="text-primary text-base font-normal"
            >
              0.567 ETH
            </div>
          </div>
        </div>
      </DocumentFragment>
    `)
  })
  it('should render appropriate elements when given `for` claimPosition value', () => {
    const { asFragment } = render(
      <ActivePositionCard value={0.567} claimPosition="for" />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex justify-between items-center border border-border/10 rounded-lg bg-primary/5 py-3 px-5 w-full gap-8"
        >
          <div
            class="text-base font-normal text-foreground/50"
          >
            Your Active Position
          </div>
          <div
            class="flex items-center gap-2"
          >
            <button
              class="inline-flex items-center gap-1 rounded-full px-2 py-0.5 border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted-foreground bg-for/10 text-for/90 border-for/30 hover:bg-for/40 hover:text-for hover:border-for/60 text-xs font-medium"
            >
              FOR
            </button>
            <div
              class="text-primary text-base font-normal"
            >
              0.567 ETH
            </div>
          </div>
        </div>
      </DocumentFragment>
    `)
  })
  it('should render appropriate elements when given `against` claimPosition value', () => {
    const { asFragment } = render(
      <ActivePositionCard value={0.567} claimPosition="against" />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex justify-between items-center border border-border/10 rounded-lg bg-primary/5 py-3 px-5 w-full gap-8"
        >
          <div
            class="text-base font-normal text-foreground/50"
          >
            Your Active Position
          </div>
          <div
            class="flex items-center gap-2"
          >
            <button
              class="inline-flex items-center gap-1 rounded-full px-2 py-0.5 border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted-foreground bg-against/10 text-against/90 border-against/40 hover:bg-against/30 hover:text-against hover:border-against/60 text-xs font-medium"
            >
              AGAINST
            </button>
            <div
              class="text-primary text-base font-normal"
            >
              0.567 ETH
            </div>
          </div>
        </div>
      </DocumentFragment>
    `)
  })
})
