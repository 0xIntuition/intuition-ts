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
          class="grid gap-4 grid-cols-2 sm:grid-cols-5"
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
              <svg
                class="lucide lucide-circle w-4 h-4"
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
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                />
              </svg>
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
              <svg
                class="lucide lucide-circle w-4 h-4"
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
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                />
              </svg>
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
              <svg
                class="lucide lucide-circle w-4 h-4"
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
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                />
              </svg>
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
              <svg
                class="lucide lucide-circle w-4 h-4"
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
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                />
              </svg>
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
              <svg
                class="lucide lucide-circle w-4 h-4"
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
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                />
              </svg>
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
