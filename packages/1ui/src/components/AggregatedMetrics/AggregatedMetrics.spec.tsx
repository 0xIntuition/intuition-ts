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
          class="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-5"
        >
          <div
            class="relative p-4 rounded-lg bg-white/5 backdrop-blur-md backdrop-saturate-150 border border-border/10"
          >
            <div
              class="flex flex-row justify-between w-full"
            >
              <div
                class="text-primary text-base font-normal"
              >
                TVL
              </div>
            </div>
            <h6
              class="text-primary text-xl font-medium"
            >
              420.69 ETH
            </h6>
          </div>
          <div
            class="relative p-4 rounded-lg bg-white/5 backdrop-blur-md backdrop-saturate-150 border border-border/10"
          >
            <div
              class="flex flex-row justify-between w-full"
            >
              <div
                class="text-primary text-base font-normal"
              >
                Atoms
              </div>
            </div>
            <h6
              class="text-primary text-xl font-medium"
            >
              4.20K
            </h6>
          </div>
          <div
            class="relative p-4 rounded-lg bg-white/5 backdrop-blur-md backdrop-saturate-150 border border-border/10"
          >
            <div
              class="flex flex-row justify-between w-full"
            >
              <div
                class="text-primary text-base font-normal"
              >
                Triples
              </div>
            </div>
            <h6
              class="text-primary text-xl font-medium"
            >
              4.20K
            </h6>
          </div>
          <div
            class="relative p-4 rounded-lg bg-white/5 backdrop-blur-md backdrop-saturate-150 border border-border/10 hidden lg:block"
          >
            <div
              class="flex flex-row justify-between w-full"
            >
              <div
                class="text-primary text-base font-normal"
              >
                Signals
              </div>
            </div>
            <h6
              class="text-primary text-xl font-medium"
            >
              4.20K
            </h6>
          </div>
          <div
            class="relative p-4 rounded-lg bg-white/5 backdrop-blur-md backdrop-saturate-150 border border-border/10"
          >
            <div
              class="flex flex-row justify-between w-full"
            >
              <div
                class="text-primary text-base font-normal"
              >
                Users
              </div>
            </div>
            <h6
              class="text-primary text-xl font-medium"
            >
              4.20K
            </h6>
          </div>
        </div>
      </DocumentFragment>
    `)
  })
})
