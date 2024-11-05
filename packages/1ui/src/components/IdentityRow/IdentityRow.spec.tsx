import { render } from '@testing-library/react'
import { Identity } from 'types'

import { IdentityRow } from './IdentityRow'

describe('IdentityRow', () => {
  it('should render basic identity row', () => {
    const { asFragment } = render(
      <IdentityRow
        variant={Identity.user}
        totalTVL={'420.69'}
        currency="ETH"
        name="John Doe"
        avatarSrc="https://avatars.githubusercontent.com/u/1?v=4"
        link="/identity/1"
        numPositions={69}
        id="1"
        description="Test description"
        ipfsLink="ipfs://test"
        onStakeClick={() => console.log('Clicked!')}
      />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="w-full flex flex-col items-center bg-primary/5 border border-border/10 max-sm:flex-col max-sm:gap-3 rounded-t-xl rounded-b-xl"
        >
          <div
            class="w-full flex justify-between items-center p-4 rounded-t-xl"
          >
            <div
              class="flex items-center"
            >
              <a
                href="/identity/1"
              >
                <button
                  class="theme-border font-medium py-0.5 pl-0.5 pr-2 hover:bg-primary/10 disabled:pointer-events-none flex gap-2 items-center text-secondary/70 hover:text-secondary rounded-full [&>span]:rounded-full [&>span]:overflow-hidden text-base [&>span]:h-7 [&>span]:w-7"
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
                class="flex justify-center items-center text-sm font-medium border aria-disabled:text-muted-foreground aria-disabled:border-muted aria-disabled:pointer-events-none bg-gradient-to-b from-transparent to-transparent hover:text-primary aria-disabled:bg-transparent aria-selected:primary-gradient-subtle aria-selected:border-primary/10 shadow-md-subtle max-sm:py-2 max-sm:text-base py-0.5 px-2.5 gap-1.5 h-9 w-16 rounded-xl disabled:bg-primary/5 disabled:border-primary/20 disabled:text-primary/20 bg-primary/10 border-primary/30 hover:bg-primary/20 hover:border-primary/60 text-secondary"
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
              <span
                data-disabled=""
                data-state="closed"
              >
                <button
                  class="flex justify-center items-center gap-2 text-sm font-medium border disabled:text-muted-foreground aria-disabled:text-muted-foreground aria-disabled:pointer-events-none bg-transparent text-primary/70 border-transparent hover:text-primary disabled:border-transparent aria-disabled:border-transparent disabled:bg-transparent aria-disabled:bg-transparent shadow-none p-1"
                  disabled=""
                >
                  <svg
                    class="text-secondary/70 h-4 w-4"
                  >
                    <use
                      href="/src/components/Icon/Icon.sprites.svg#context"
                    />
                  </svg>
                </button>
              </span>
            </div>
          </div>
        </div>
      </DocumentFragment>
    `)
  })

  it('should render with user position', () => {
    const { asFragment } = render(
      <IdentityRow
        variant={Identity.user}
        totalTVL={'420.69'}
        currency="ETH"
        name="John Doe"
        avatarSrc="https://avatars.githubusercontent.com/u/1?v=4"
        link="/identity/1"
        numPositions={69}
        id="1"
        description="Test description"
        ipfsLink="ipfs://test"
        userPosition={'3.19'}
        onStakeClick={() => console.log('Clicked!')}
      />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="w-full flex flex-col items-center bg-primary/5 border border-border/10 max-sm:flex-col max-sm:gap-3 rounded-t-xl rounded-b-xl"
        >
          <div
            class="w-full flex justify-between items-center p-4 rounded-t-xl bg-gradient-to-r from-transparent to-primary/10"
          >
            <div
              class="flex items-center"
            >
              <a
                href="/identity/1"
              >
                <button
                  class="theme-border font-medium py-0.5 pl-0.5 pr-2 hover:bg-primary/10 disabled:pointer-events-none flex gap-2 items-center text-secondary/70 hover:text-secondary rounded-full [&>span]:rounded-full [&>span]:overflow-hidden text-base [&>span]:h-7 [&>span]:w-7"
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
                class="flex justify-center items-center text-sm font-medium border aria-disabled:text-muted-foreground aria-disabled:border-muted aria-disabled:pointer-events-none bg-gradient-to-b from-transparent to-transparent hover:text-primary aria-disabled:bg-transparent aria-selected:primary-gradient-subtle aria-selected:border-primary/10 shadow-md-subtle max-sm:py-2 max-sm:text-base py-0.5 px-2.5 gap-1.5 h-9 w-16 rounded-xl disabled:bg-primary/5 disabled:border-primary/20 disabled:text-primary/20 bg-primary/10 border-primary/30 hover:bg-primary/20 hover:border-primary/60 text-secondary"
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
              <span
                data-disabled=""
                data-state="closed"
              >
                <button
                  class="flex justify-center items-center gap-2 text-sm font-medium border disabled:text-muted-foreground aria-disabled:text-muted-foreground aria-disabled:pointer-events-none bg-transparent text-primary/70 border-transparent hover:text-primary disabled:border-transparent aria-disabled:border-transparent disabled:bg-transparent aria-disabled:bg-transparent shadow-none p-1"
                  disabled=""
                >
                  <svg
                    class="text-secondary/70 h-4 w-4"
                  >
                    <use
                      href="/src/components/Icon/Icon.sprites.svg#context"
                    />
                  </svg>
                </button>
              </span>
            </div>
          </div>
          <div
            class="flex flex-row justify-end px-4 py-0.5 w-full items-center gap-1.5 h-9"
          >
            <svg
              class="h-4 w-4"
            >
              <use
                href="/src/components/Icon/Icon.sprites.svg#arrow-up"
              />
            </svg>
            <div
              class="text-primary text-sm font-normal"
            >
              You have staked 3.19 ETH
            </div>
          </div>
        </div>
      </DocumentFragment>
    `)
  })
})
