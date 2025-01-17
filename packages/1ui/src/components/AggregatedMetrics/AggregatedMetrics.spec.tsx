import React from 'react'

import { render } from '@testing-library/react'

import { AggregatedMetrics } from './AggregatedMetrics'

describe('AggregatedMetrics', () => {
  it('should render metrics correctly', () => {
    const { asFragment } = render(
      <AggregatedMetrics
        metrics={[
          { label: 'TVL', value: 420.69, suffix: 'ETH' },
          { label: 'Atoms', value: 4200 },
          { label: 'Triples', value: 4200 },
          { label: 'Signals', value: 4200, hideOnMobile: true },
          { label: 'Users', value: 4200 },
        ]}
      />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="grid grid-cols-2 gap-4 p-4 sm:grid-cols-4 lg:grid-cols-5"
        >
          <div
            class="relative text-center px-12 after:absolute after:right-0 after:inset-y-0 after:w-px after:bg-border/20"
          >
            <div
              class="text-sm text-foreground/70"
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
            class="relative text-center px-12 after:absolute after:right-0 after:inset-y-0 after:w-px after:bg-border/20"
          >
            <div
              class="text-sm text-foreground/70"
            >
              Atoms
            </div>
            <div
              class="text-2xl font-medium text-foreground"
            >
              4.20K
            </div>
          </div>
          <div
            class="relative text-center px-12 after:absolute after:right-0 after:inset-y-0 after:w-px after:bg-border/20"
          >
            <div
              class="text-sm text-foreground/70"
            >
              Triples
            </div>
            <div
              class="text-2xl font-medium text-foreground"
            >
              4.20K
            </div>
          </div>
          <div
            class="relative text-center px-12 hidden lg:block after:absolute after:right-0 after:inset-y-0 after:w-px after:bg-border/20"
          >
            <div
              class="text-sm text-foreground/70"
            >
              Signals
            </div>
            <div
              class="text-2xl font-medium text-foreground"
            >
              4.20K
            </div>
          </div>
          <div
            class="relative text-center px-12"
          >
            <div
              class="text-sm text-foreground/70"
            >
              Users
            </div>
            <div
              class="text-2xl font-medium text-foreground"
            >
              4.20K
            </div>
          </div>
        </div>
      </DocumentFragment>
    `)
  })
})
