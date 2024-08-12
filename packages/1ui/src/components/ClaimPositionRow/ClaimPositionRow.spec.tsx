import React from 'react'

import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ClaimPositionRow } from './ClaimPositionRow'

describe('ClaimPositionRow', () => {
  it('should render UI for user variant', () => {
    const { asFragment } = render(
      <ClaimPositionRow
        variant="user"
        position="claimFor"
        name="John Doe"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi."
        id="0x1234567890abcdef1234567890abcdef12345678"
        avatarSrc="https://avatars.githubusercontent.com/u/94311139?s=200&v=4"
        amount={1.21}
        feesAccrued={0.005}
        updatedAt="2021-10-01T16:00:00Z"
        link="https://sepolia.basescan.org/address/0x1234567890abcdef1234567890abcdef12345678"
        ipfsLink="https://sepolia.basescan.org/address/0x1234567890abcdef1234567890abcdef12345678"
      />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="w-full flex justify-between max-sm:flex-col max-sm:gap-2"
        >
          <div
            class="flex items-center max-sm:justify-center"
          >
            <a
              data-state="closed"
              href="https://sepolia.basescan.org/address/0x1234567890abcdef1234567890abcdef12345678"
            >
              <span
                class="relative flex shrink-0 overflow-hidden aspect-square bg-background theme-border rounded-full mr-4 w-[64px] h-[64px]"
              >
                <span
                  class="flex h-full w-full items-center justify-center bg-inherit"
                >
                  <svg
                    class="text-primary/30 w-[80%] h-[80%] max-w-8 max-h-8"
                  >
                    <use
                      href="/src/components/Icon/Icon.sprites.svg#crypto-punk"
                    />
                  </svg>
                </span>
              </span>
            </a>
            <div
              class="flex flex-col"
            >
              <div
                class="flex items-center mb-1.5 max-sm:flex-col max-sm:gap-px max-sm:items-start"
              >
                <a
                  href="https://sepolia.basescan.org/address/0x1234567890abcdef1234567890abcdef12345678"
                >
                  <p
                    class="text-primary text-lg font-normal mr-1"
                  >
                    John Doe
                  </p>
                </a>
                <div
                  class="flex flex-row items-center gap-1"
                >
                  <a
                    href="https://sepolia.basescan.org/address/0x1234567890abcdef1234567890abcdef12345678"
                    rel="noreferrer noopener"
                    target="_blank"
                  >
                    <button
                      data-state="closed"
                    >
                      <p
                        class="text-base font-normal text-secondary-foreground"
                      >
                        0x1234...5678
                      </p>
                    </button>
                  </a>
                  <button
                    class="flex justify-center items-center gap-2 text-sm font-medium border disabled:text-muted-foreground aria-disabled:text-muted-foreground aria-disabled:pointer-events-none bg-transparent border-transparent disabled:border-transparent aria-disabled:border-transparent disabled:bg-transparent aria-disabled:bg-transparent shadow-none max-sm:py-2 max-sm:text-base p-0 h-4 w-4 hover:text-primary text-secondary-foreground"
                  >
                    <svg
                      class="h-4 w-4"
                    >
                      <use
                        href="/src/components/Icon/Icon.sprites.svg#copy"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <p
                class="text-sm font-medium text-secondary-foreground mb-2"
              >
                Last update October 1, 2021
              </p>
            </div>
          </div>
          <div
            class="flex items-center justify-start gap-2 max-sm:justify-between"
          >
            <div
              class="h-full flex flex-col pt-1"
            >
              <button
                class="inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted-foreground bg-for/10 text-for/90 border-for/30 hover:bg-for/40 hover:text-for hover:border-for/60 text-base font-normal"
              >
                FOR
              </button>
            </div>
            <div
              class="h-full flex flex-col items-end"
            >
              <p
                class="text-primary text-lg font-medium"
              >
                1.21 ETH
              </p>
            </div>
          </div>
        </div>
      </DocumentFragment>
    `)
  })
  describe('ClaimPositionRow', () => {
    it('should render UI for identity variant', () => {
      const { asFragment } = render(
        <ClaimPositionRow
          variant="claim"
          position="claimAgainst"
          claimsFor={30}
          claimsAgainst={70}
          claimsForValue={10}
          claimsAgainstValue={5}
          amount={1.21}
          feesAccrued={0.005}
          link="https://sepolia.basescan.org/address/0x1234567890abcdef1234567890abcdef12345678"
        />,
      )
      expect(asFragment()).toMatchInlineSnapshot(`
        <DocumentFragment>
          <div
            class="w-full flex justify-between max-sm:flex-col max-sm:gap-2"
          >
            <div
              class="w-[60%] max-sm:w-full"
            >
              <div
                class="flex flex-col justify-between max-md:w-full max-md:justify-center"
              >
                <div
                  class="flex items-center h-[6px] mb-4"
                >
                  <button
                    class="h-full bg-against block rounded-l-sm"
                    data-state="closed"
                    style="min-width: 33.33333333333333%;"
                  />
                  <button
                    class="h-full w-full bg-for block rounded-r-sm"
                    data-state="closed"
                  />
                </div>
              </div>
            </div>
            <div
              class="flex items-center justify-start gap-2 max-sm:justify-between"
            >
              <div
                class="h-full flex flex-col pt-1"
              >
                <button
                  class="inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted-foreground bg-against/10 text-against/90 border-against/40 hover:bg-against/30 hover:text-against hover:border-against/60 text-base font-normal"
                >
                  AGAINST
                </button>
              </div>
              <div
                class="h-full flex flex-col items-end"
              >
                <p
                  class="text-primary text-lg font-medium"
                >
                  1.21 ETH
                </p>
              </div>
            </div>
          </div>
        </DocumentFragment>
      `)
    })
  })
})
