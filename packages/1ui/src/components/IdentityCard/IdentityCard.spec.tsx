import React from 'react'

import { render } from '@testing-library/react'

import { IdentityCard } from './IdentityCard'

describe('IdentityCard', () => {
  it('should render appropriate element when given no variant ', () => {
    const { asFragment } = render(
      <IdentityCard
        name="Super Dave"
        value={4.123}
        currency="ETH"
        walletAddress="0x1234567890abcdef1234567890abcdef12345678"
      />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex gap-2 items-center"
        >
          <span
            class="relative flex h-10 w-10 shrink-0 overflow-hidden aspect-square bg-background border-border/10 rounded-full"
          >
            <span
              class="flex h-full w-full items-center justify-center bg-inherit"
            >
              <svg
                class="text-primary/30 w-1/2 h-1/2 max-h-10 max-w-10"
              >
                <use
                  href="/src/components/Icon/Icon.sprites.svg#crypto-punk"
                />
              </svg>
            </span>
          </span>
          <div>
            <div
              class="flex gap-2 items-center"
            >
              <div
                class="text-base font-normal text-primary/80"
              >
                super dave
              </div>
              <div
                class="inline-flex items-center gap-1 rounded-md pl-1 pr-1.5 py-0.5 text-sm font-light text-foreground/65 bg-primary/10"
              >
                4.123 ETH
              </div>
            </div>
            <button
              data-state="closed"
            >
              <div
                class="text-sm font-normal text-muted-foreground"
              >
                0x1234...5678
              </div>
            </button>
          </div>
        </div>
      </DocumentFragment>
    `)
  })
  it('should render appropriate element when given `entity` variant ', () => {
    const { asFragment } = render(
      <IdentityCard
        variant="non-user"
        name="Intuition"
        value={7.892}
        currency="ETH"
        walletAddress="0x1234567890abcdef1234567890abcdef12345678"
      />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex gap-2 items-center"
        >
          <span
            class="relative flex h-10 w-10 shrink-0 overflow-hidden aspect-square bg-background border-border/10 rounded"
          >
            <span
              class="flex h-full w-full items-center justify-center bg-inherit"
            >
              <svg
                class="text-primary/30 w-1/2 h-1/2 max-h-10 max-w-10"
              >
                <use
                  href="/src/components/Icon/Icon.sprites.svg#fingerprint"
                />
              </svg>
            </span>
          </span>
          <div>
            <div
              class="flex gap-2 items-center"
            >
              <div
                class="text-base font-normal text-primary/80"
              >
                intuition
              </div>
              <div
                class="inline-flex items-center gap-1 rounded-md pl-1 pr-1.5 py-0.5 text-sm font-light text-foreground/65 bg-primary/10"
              >
                7.892 ETH
              </div>
            </div>
            <button
              data-state="closed"
            >
              <div
                class="text-sm font-normal text-muted-foreground"
              >
                0x1234...5678
              </div>
            </button>
          </div>
        </div>
      </DocumentFragment>
    `)
  })
})
