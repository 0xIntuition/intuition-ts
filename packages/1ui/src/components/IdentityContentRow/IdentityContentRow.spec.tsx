import React from 'react'

import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { IdentityContentRow } from './IdentityContentRow'

describe('IdentityContentRow', () => {
  it('should render children', () => {
    render(
      <IdentityContentRow
        variant="user"
        name="John Doe"
        walletAddress="0x1234567890abcdef1234567890abcdef12345678"
        avatarSrc="https://avatars.githubusercontent.com/u/94311139?s=200&v=4"
        amount={1.21}
        totalFollowers={305}
      >
        <p>Extra Content</p>
      </IdentityContentRow>,
    )

    expect(screen.getByText('Extra Content')).toBeDefined()
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <IdentityContentRow
        variant="user"
        name="John Doe"
        walletAddress="0x1234567890abcdef1234567890abcdef12345678"
        avatarSrc="https://avatars.githubusercontent.com/u/94311139?s=200&v=4"
        amount={1.21}
        totalFollowers={305}
      />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="w-full"
        >
          <div
            class="w-full flex justify-between items-center max-sm:flex-col max-sm:gap-3"
          >
            <div
              class="flex items-center"
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
              <div
                class="flex flex-col"
              >
                <div
                  class="mb-1 flex flex-col"
                >
                  <p
                    class="text-primary text-lg font-normal mr-2"
                  >
                    John Doe
                  </p>
                  <p
                    class="text-base font-normal text-secondary-foreground"
                  >
                    0x1234...5678
                  </p>
                </div>
              </div>
            </div>
            <div
              class="flex flex-col items-end max-sm:flex-row max-sm:justify-between max-sm:items-center max-sm:w-full"
            >
              <p
                class="text-primary text-lg font-normal"
              >
                1.21 ETH
              </p>
              <div
                class="flex gap-1 items-center"
              >
                <svg
                  class="text-secondary-foreground h-4 w-4"
                >
                  <use
                    href="/src/components/Icon/Icon.sprites.svg#people"
                  />
                </svg>
                <p
                  class="text-base font-normal text-secondary-foreground"
                >
                  305
                </p>
              </div>
            </div>
          </div>
        </div>
      </DocumentFragment>
    `)
  })
})
