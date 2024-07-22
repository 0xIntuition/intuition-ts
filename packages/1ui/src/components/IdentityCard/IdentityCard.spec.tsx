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
            class="relative flex h-10 w-10 shrink-0 overflow-hidden aspect-square rounded-full bg-muted"
          >
            <span
              class="flex h-full w-full items-center justify-center bg-inherit"
            >
              SU
            </span>
          </span>
          <div>
            <div
              class="flex gap-2 items-center"
            >
              <p
                class="text-base font-normal text-primary/80"
              >
                super dave
              </p>
              <div
                class="inline-flex items-center gap-1 rounded-md pl-1 pr-1.5 py-0.5 text-sm font-light text-foreground/65 bg-primary/15"
              >
                4.123 ETH
              </div>
            </div>
            <p
              class="text-sm font-normal text-muted-foreground"
            >
              0x1234...5678
            </p>
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
            class="relative flex h-10 w-10 shrink-0 overflow-hidden aspect-square rounded bg-background theme-border"
          >
            <span
              class="flex h-full w-full items-center justify-center bg-inherit"
            >
              <svg
                class="text-primary/30 w-[80%] h-[80%]"
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
              <p
                class="text-base font-normal text-primary/80"
              >
                intuition
              </p>
              <div
                class="inline-flex items-center gap-1 rounded-md pl-1 pr-1.5 py-0.5 text-sm font-light text-foreground/65 bg-primary/15"
              >
                7.892 ETH
              </div>
            </div>
            <p
              class="text-sm font-normal text-muted-foreground"
            >
              0x1234...5678
            </p>
          </div>
        </div>
      </DocumentFragment>
    `)
  })
})
