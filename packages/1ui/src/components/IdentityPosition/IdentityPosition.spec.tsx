import React from 'react'

import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { IdentityPosition } from './IdentityPosition'

describe('IdentityPosition', () => {
  it('should render UI for user variant', () => {
    const { asFragment } = render(
      <IdentityPosition
        variant="non-user"
        name="John Doe"
        id="0x1234567890abcdef1234567890abcdef12345678"
        avatarSrc="https://avatars.githubusercontent.com/u/94311139?s=200&v=4"
        amount={1.21}
        feesAccrued={0.005}
        updatedAt="2021-10-01T16:00:00Z"
        link={
          'https://sepolia.basescan.org/address/0x1234567890abcdef1234567890abcdef12345678'
        }
        ipfsLink={
          'https://sepolia.basescan.org/address/0x1234567890abcdef1234567890abcdef12345678'
        }
      />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="w-full flex justify-between max-sm:flex-col max-sm:items-center"
        >
          <div
            class="flex items-center"
          >
            <a
              href="https://sepolia.basescan.org/address/0x1234567890abcdef1234567890abcdef12345678"
            >
              <span
                class="relative flex shrink-0 overflow-hidden aspect-square bg-background theme-border rounded w-16 h-16 mr-4"
              >
                <span
                  class="flex h-full w-full items-center justify-center bg-inherit"
                >
                  <svg
                    class="text-primary/30 w-[80%] h-[80%] max-w-8 max-h-8"
                  >
                    <use
                      href="/src/components/Icon/Icon.sprites.svg#fingerprint"
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
            />
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
  describe('IdentityPosition', () => {
    it('should render UI for identity variant', () => {
      const { asFragment } = render(
        <IdentityPosition
          variant="non-user"
          name="John Doe"
          id="0x1234567890abcdef1234567890abcdef12345678"
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
          link={
            'https://sepolia.basescan.org/address/0x1234567890abcdef1234567890abcdef12345678'
          }
          ipfsLink={
            'https://sepolia.basescan.org/address/0x1234567890abcdef1234567890abcdef12345678'
          }
        />,
      )
      expect(asFragment()).toMatchInlineSnapshot(`
        <DocumentFragment>
          <div
            class="w-full flex justify-between max-sm:flex-col max-sm:items-center"
          >
            <div
              class="flex items-center"
            >
              <a
                href="https://sepolia.basescan.org/address/0x1234567890abcdef1234567890abcdef12345678"
              >
                <span
                  class="relative flex shrink-0 overflow-hidden aspect-square bg-background theme-border rounded w-16 h-16 mr-4"
                >
                  <span
                    class="flex h-full w-full items-center justify-center bg-inherit"
                  >
                    <svg
                      class="text-primary/30 w-[80%] h-[80%] max-w-8 max-h-8"
                    >
                      <use
                        href="/src/components/Icon/Icon.sprites.svg#fingerprint"
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
                <div
                  class="flex gap-2 mt-1"
                >
                  <div
                    class="flex flex-wrap gap-2 items-center"
                  >
                    <button
                      class="gap-1 rounded-full px-1.5 py-0.5 border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted-foreground bg-primary/10 text-primary/90 border-primary/40 hover:bg-primary/30 hover:text-primary hover:border-primary/60 text-base font-normal flex items-center cursor-default pl-2"
                    >
                      <p
                        class="text-primary text-base font-normal"
                      >
                        keyboard
                      </p>
                      <span
                        class="h-[2px] w-[2px] bg-primary mx-1"
                      />
                      34
                    </button>
                    <button
                      class="gap-1 rounded-full px-1.5 py-0.5 border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted-foreground bg-primary/10 text-primary/90 border-primary/40 hover:bg-primary/30 hover:text-primary hover:border-primary/60 text-base font-normal flex items-center cursor-default pl-2"
                    >
                      <p
                        class="text-primary text-base font-normal"
                      >
                        ergonomic
                      </p>
                      <span
                        class="h-[2px] w-[2px] bg-primary mx-1"
                      />
                      56
                    </button>
                    <button
                      class="gap-1 rounded-full px-1.5 py-0.5 border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted-foreground bg-primary/10 text-primary/90 border-primary/40 hover:bg-primary/30 hover:text-primary hover:border-primary/60 text-base font-normal flex items-center cursor-default pl-2"
                    >
                      <p
                        class="text-primary text-base font-normal"
                      >
                        wireless
                      </p>
                      <span
                        class="h-[2px] w-[2px] bg-primary mx-1"
                      />
                      12
                    </button>
                    <button
                      class="gap-1 rounded-full px-1.5 py-0.5 border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted-foreground bg-primary/10 text-primary/90 border-primary/40 hover:bg-primary/30 hover:text-primary hover:border-primary/60 text-base font-normal flex items-center cursor-default pl-2"
                    >
                      <p
                        class="text-primary text-base font-normal"
                      >
                        gaming
                      </p>
                      <span
                        class="h-[2px] w-[2px] bg-primary mx-1"
                      />
                      77
                    </button>
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
              class="flex items-center justify-start gap-2 max-sm:justify-between"
            >
              <div
                class="h-full flex flex-col pt-1"
              />
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
