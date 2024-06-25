import React from 'react'

import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { IdentityPosition } from './IdentityPosition'

describe('IdentityPosition', () => {
  it('should render UI for user variant', () => {
    const { asFragment } = render(
      <IdentityPosition
        variant="identity"
        name="John Doe"
        walletAddress="0x1234567890abcdef1234567890abcdef12345678"
        avatarSrc="https://avatars.githubusercontent.com/u/94311139?s=200&v=4"
        amount={1.21}
        feesAccrued={0.005}
        updatedAt="2021-10-01T16:00:00Z"
      />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="w-full flex justify-between"
        >
          <div
            class="flex items-center"
          >
            <span
              class="relative flex shrink-0 overflow-hidden w-16 h-16 mr-4 rounded-lg"
            >
              <span
                class="bg-muted flex h-full w-full items-center justify-center rounded-lg"
              >
                <svg
                  class="h-full w-full"
                >
                  <use
                    href="/src/components/Icon/Icon.sprites.svg#fingerprint"
                  />
                </svg>
              </span>
            </span>
            <div
              class="flex flex-col"
            >
              <div
                class="flex items-center mb-1.5"
              >
                <p
                  class="text-primary text-lg font-normal mr-1"
                >
                  John Doe
                </p>
                <p
                  class="text-base font-normal text-secondary-foreground"
                >
                  0x1234...5678
                </p>
              </div>
              <p
                class="text-sm font-medium text-secondary-foreground mb-2"
              >
                Last update October 1, 2021
              </p>
            </div>
          </div>
          <div
            class="flex items-center justify-start gap-2"
          >
            <div
              class="flex flex-col self-start pt-1"
            />
            <div
              class="flex flex-col items-end"
            >
              <p
                class="text-primary text-lg font-normal"
              >
                1.21 ETH
              </p>
              <p
                class="text-base font-medium text-success"
              >
                +0.005 ETH
              </p>
            </div>
          </div>
        </div>
      </DocumentFragment>
    `)
  })
  describe('IdentityPosition', () => {
    it('should render UI for identity variant', () => {
      const { asFragment } = render(
        <IdentityPosition
          variant="identity"
          name="John Doe"
          walletAddress="0x1234567890abcdef1234567890abcdef12345678"
          avatarSrc="https://avatars.githubusercontent.com/u/94311139?s=200&v=4"
          amount={1.21}
          feesAccrued={0.005}
          tags={[
            { label: 'keyboard', value: 34 },
            { label: 'ergonomic', value: 56 },
            { label: 'wireless', value: 12 },
            { label: 'gaming', value: 77 },
            { label: 'work', value: 11 },
            { label: 'home', value: 34 },
          ]}
        />,
      )
      expect(asFragment()).toMatchInlineSnapshot(`
        <DocumentFragment>
          <div
            class="w-full flex justify-between"
          >
            <div
              class="flex items-center"
            >
              <span
                class="relative flex shrink-0 overflow-hidden w-16 h-16 mr-4 rounded-lg"
              >
                <span
                  class="bg-muted flex h-full w-full items-center justify-center rounded-lg"
                >
                  <svg
                    class="h-full w-full"
                  >
                    <use
                      href="/src/components/Icon/Icon.sprites.svg#fingerprint"
                    />
                  </svg>
                </span>
              </span>
              <div
                class="flex flex-col"
              >
                <div
                  class="flex items-center mb-1.5"
                >
                  <p
                    class="text-primary text-lg font-normal mr-1"
                  >
                    John Doe
                  </p>
                  <p
                    class="text-base font-normal text-secondary-foreground"
                  >
                    0x1234...5678
                  </p>
                </div>
                <div
                  class="flex gap-2 mt-1"
                >
                  <div
                    class="flex flex-wrap gap-2 items-center"
                  >
                    <div
                      class="items-center rounded-full border px-2.5 py-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow-md-subtle text-foreground border-border/30 hover:bg-primary/20 flex gap-1 w-min text-sm font-normal"
                    >
                      keyboard
                      <span
                        class="h-[2px] w-[2px] bg-primary"
                      />
                      34
                    </div>
                    <div
                      class="items-center rounded-full border px-2.5 py-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow-md-subtle text-foreground border-border/30 hover:bg-primary/20 flex gap-1 w-min text-sm font-normal"
                    >
                      ergonomic
                      <span
                        class="h-[2px] w-[2px] bg-primary"
                      />
                      56
                    </div>
                    <div
                      class="items-center rounded-full border px-2.5 py-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow-md-subtle text-foreground border-border/30 hover:bg-primary/20 flex gap-1 w-min text-sm font-normal"
                    >
                      wireless
                      <span
                        class="h-[2px] w-[2px] bg-primary"
                      />
                      12
                    </div>
                    <div
                      class="items-center rounded-full border px-2.5 py-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow-md-subtle text-foreground border-border/30 hover:bg-primary/20 flex gap-1 w-min text-sm font-normal"
                    >
                      gaming
                      <span
                        class="h-[2px] w-[2px] bg-primary"
                      />
                      77
                    </div>
                    <p
                      class="text-primary text-base font-normal"
                    >
                      + 2 more
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="flex items-center justify-start gap-2"
            >
              <div
                class="flex flex-col self-start pt-1"
              />
              <div
                class="flex flex-col items-end"
              >
                <p
                  class="text-primary text-lg font-normal"
                >
                  1.21 ETH
                </p>
                <p
                  class="text-base font-medium text-success"
                >
                  +0.005 ETH
                </p>
              </div>
            </div>
          </div>
        </DocumentFragment>
      `)
    })
  })
})
