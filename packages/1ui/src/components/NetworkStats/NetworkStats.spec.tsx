import React from 'react'

import { render } from '@testing-library/react'

import { NetworkStats } from './NetworkStats'

describe('NetworkStats', () => {
  it('should render appropriate element', () => {
    const { asFragment } = render(
      <NetworkStats
        tvl={420.69}
        atomsCount={4200}
        triplesCount={4200}
        signalsCount={4200}
        usersCount={4200}
      />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="grid grid-cols-2 gap-4 rounded-lg bg-background/20 p-4 sm:grid-cols-4 lg:grid-cols-5"
        >
          <div
            class="relative text-center px-12 after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-8 after:w-px after:bg-border/20"
          >
            <div
              class="text-sm text-muted-foreground"
            >
              TVL
            </div>
            <div
              class="text-2xl font-medium text-foreground"
            >
              420.69 ETH
            </div>
          </div>
          <div
            class="relative text-center px-12 after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-8 after:w-px after:bg-border/20"
          >
            <div
              class="text-sm text-muted-foreground"
            >
              Atoms
            </div>
            <div
              class="text-2xl font-medium text-foreground"
            >
              4.20k
            </div>
          </div>
          <div
            class="relative text-center px-12 after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-8 after:w-px after:bg-border/20"
          >
            <div
              class="text-sm text-muted-foreground"
            >
              Triples
            </div>
            <div
              class="text-2xl font-medium text-foreground"
            >
              4.20k
            </div>
          </div>
          <div
            class="relative text-center px-12 hidden lg:block after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-8 after:w-px after:bg-border/20"
          >
            <div
              class="text-sm text-muted-foreground"
            >
              Signals
            </div>
            <div
              class="text-2xl font-medium text-foreground"
            >
              4.20k
            </div>
          </div>
          <div
            class="relative text-center px-12"
          >
            <div
              class="text-sm text-muted-foreground"
            >
              Users
            </div>
            <div
              class="text-2xl font-medium text-foreground"
            >
              4.20k
            </div>
          </div>
        </div>
      </DocumentFragment>
    `)
  })
})
