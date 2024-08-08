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
        id="0x1234567890abcdef1234567890abcdef12345678"
        avatarSrc="https://avatars.githubusercontent.com/u/94311139?s=200&v=4"
        amount={1.21}
        totalFollowers={305}
        link={
          'https://sepolia.basescan.org/address/0xd57981d5bc446768e8a1e3d582e545fa705415b5'
        }
        ipfsLink={
          'https://sepolia.basescan.org/address/0xd57981d5bc446768e8a1e3d582e545fa705415b5'
        }
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
        id="0x1234567890abcdef1234567890abcdef12345678"
        avatarSrc="https://avatars.githubusercontent.com/u/94311139?s=200&v=4"
        amount={1.21}
        totalFollowers={305}
        link={
          'https://sepolia.basescan.org/address/0xd57981d5bc446768e8a1e3d582e545fa705415b5'
        }
        ipfsLink={
          'https://sepolia.basescan.org/address/0xd57981d5bc446768e8a1e3d582e545fa705415b5'
        }
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
              <a
                href="https://sepolia.basescan.org/address/0xd57981d5bc446768e8a1e3d582e545fa705415b5"
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
                  class="mb-1 flex flex-col"
                >
                  <a
                    href="https://sepolia.basescan.org/address/0xd57981d5bc446768e8a1e3d582e545fa705415b5"
                  >
                    <p
                      class="text-primary text-lg font-normal mr-2"
                    >
                      John Doe
                    </p>
                  </a>
                  <div
                    class="flex flex-row gap-1 items-center"
                  >
                    <a
                      href="https://sepolia.basescan.org/address/0xd57981d5bc446768e8a1e3d582e545fa705415b5"
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
                      class="flex justify-center items-center gap-2 text-sm font-medium border disabled:text-muted-foreground aria-disabled:text-muted-foreground aria-disabled:pointer-events-none bg-transparent border-transparent disabled:border-transparent aria-disabled:border-transparent disabled:bg-transparent aria-disabled:bg-transparent shadow-none max-sm:py-2 max-sm:text-base p-0 h-4 w-4 text-primary/60 hover:text-primary undefined"
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
              </div>
            </div>
            <div
              class="flex flex-col items-end max-sm:flex-row max-sm:justify-between max-sm:items-center max-sm:w-full"
            >
              <p
                class="text-primary text-lg font-medium"
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
