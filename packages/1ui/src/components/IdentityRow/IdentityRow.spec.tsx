import React from 'react'

import { render } from '@testing-library/react'
import { Identity } from 'types'

import { IdentityRow } from './IdentityRow'

describe('IdentityRow', () => {
  it('should render identity row', () => {
    const { asFragment } = render(
      <IdentityRow
        variant={Identity.user}
        totalTVL={420.69}
        tvlFor={240.69}
        currency="ETH"
        name="John Doe"
        avatarSrc="https://avatars.githubusercontent.com/u/1?v=4"
        link="/identity/1"
        numPositions={69}
        id="1"
        description="Test description"
        ipfsLink="ipfs://test"
        vaultId="1"
      />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="w-full flex justify-between items-center max-sm:flex-col max-sm:gap-3 p-4"
        >
          <div
            class="flex items-center"
          >
            <a
              href="/identity/1"
            >
              <button
                class="theme-border font-medium py-0.5 pl-0.5 pr-2 hover:bg-primary/10 disabled:pointer-events-none flex gap-2 items-center text-secondary-foreground/70 hover:text-secondary-foreground rounded-full [&>span]:rounded-full [&>span]:overflow-hidden text-base [&>span]:h-7 [&>span]:w-7"
              >
                <span
                  class="relative flex h-10 w-10 shrink-0 overflow-hidden aspect-square bg-background theme-border rounded-full"
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
                John Doe
              </button>
            </a>
          </div>
          <div
            class="flex items-center gap-3"
          >
            <div
              class="h-9 justify-start items-center gap-1 inline-flex"
            >
              <div
                class="justify-start items-center gap-1 flex"
              >
                <div
                  class="flex-col justify-start items-end inline-flex"
                >
                  <div
                    class="text-sm font-normal text-primary/70"
                  >
                    TVL
                  </div>
                  <div
                    class="text-primary text-sm font-normal"
                  >
                    420.69 ETH
                  </div>
                </div>
              </div>
            </div>
            <button
              class="flex justify-center items-center text-sm font-medium border disabled:text-muted-foreground aria-disabled:text-muted-foreground aria-disabled:border-muted aria-disabled:pointer-events-none bg-gradient-to-b from-transparent to-transparent rounded-lg hover:text-primary aria-disabled:bg-transparent aria-selected:primary-gradient-subtle aria-selected:border-primary/10 shadow-md-subtle max-sm:py-2 max-sm:text-base py-0.5 px-2.5 gap-1.5 h-9 w-16 bg-primary/10 border-primary/30 hover:bg-primary/20 hover:border-primary/60 disabled:bg-primary/5 disabled:border-primary/20 text-primary"
            >
              <svg
                class="h-4 w-4"
              >
                <use
                  href="/src/components/Icon/Icon.sprites.svg#arrow-up"
                />
              </svg>
               
              <div
                class="text-sm font-normal text-inherit"
              >
                69
              </div>
            </button>
          </div>
        </div>
      </DocumentFragment>
    `)
  })
})
