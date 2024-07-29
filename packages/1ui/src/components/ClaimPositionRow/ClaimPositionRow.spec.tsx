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
              class="relative flex shrink-0 overflow-hidden aspect-square bg-background theme-border rounded-full w-16 h-16 mr-4"
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
  describe('ClaimPositionRow', () => {
    it('should render UI for identity variant', () => {
      const { asFragment } = render(
        <ClaimPositionRow
          variant="claim"
          position="claimAgainst"
          claimsFor={30}
          claimsAgainst={70}
          amount={1.21}
          feesAccrued={0.005}
        />,
      )
      expect(asFragment()).toMatchInlineSnapshot(`
        <DocumentFragment>
          <div
            class="w-full flex justify-between"
          >
            <div
              class="w-[60%]"
            >
              <div
                class="flex flex-col justify-between"
              >
                <div
                  class="flex items-center h-[6px] mb-4"
                >
                  <span
                    class="h-full bg-against block rounded-l-sm"
                    style="min-width: 70%;"
                  />
                  <span
                    class="h-full w-full bg-for block rounded-r-sm"
                  />
                </div>
              </div>
            </div>
            <div
              class="flex items-center justify-start gap-2"
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
