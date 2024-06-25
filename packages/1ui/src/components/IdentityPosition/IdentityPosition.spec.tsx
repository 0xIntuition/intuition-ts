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
        amountChange={0.005}
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
            class="flex flex-col items-end justify-between"
          >
            <p
              class="text-primary text-lg font-normal"
            >
              1.21 ETH
            </p>
            <div
              class="flex items-center"
            >
              <p
                class="text-lg font-medium text-success"
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
          amountChange={0.005}
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
                      class="items-center rounded-md pl-1 pr-1.5 py-0.5 text-foreground/65 flex gap-1 w-min text-sm font-normal"
                    >
                      <svg
                        class="h-3 w-3"
                      >
                        <use
                          href="/src/components/Icon/Icon.sprites.svg#tag"
                        />
                      </svg>
                      keyboard
                      <span
                        class="h-[2px] w-[2px] bg-primary"
                      />
                      34
                    </div>
                    <div
                      class="items-center rounded-md pl-1 pr-1.5 py-0.5 text-foreground/65 flex gap-1 w-min text-sm font-normal"
                    >
                      <svg
                        class="h-3 w-3"
                      >
                        <use
                          href="/src/components/Icon/Icon.sprites.svg#tag"
                        />
                      </svg>
                      ergonomic
                      <span
                        class="h-[2px] w-[2px] bg-primary"
                      />
                      56
                    </div>
                    <div
                      class="items-center rounded-md pl-1 pr-1.5 py-0.5 text-foreground/65 flex gap-1 w-min text-sm font-normal"
                    >
                      <svg
                        class="h-3 w-3"
                      >
                        <use
                          href="/src/components/Icon/Icon.sprites.svg#tag"
                        />
                      </svg>
                      wireless
                      <span
                        class="h-[2px] w-[2px] bg-primary"
                      />
                      12
                    </div>
                    <div
                      class="items-center rounded-md pl-1 pr-1.5 py-0.5 text-foreground/65 flex gap-1 w-min text-sm font-normal"
                    >
                      <svg
                        class="h-3 w-3"
                      >
                        <use
                          href="/src/components/Icon/Icon.sprites.svg#tag"
                        />
                      </svg>
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
              class="flex flex-col items-end justify-between"
            >
              <p
                class="text-primary text-lg font-normal"
              >
                1.21 ETH
              </p>
              <div
                class="flex items-center"
              >
                <p
                  class="text-lg font-medium text-success"
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
