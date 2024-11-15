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
          class="w-full flex flex-col items-center border border-border/10 rounded-t-xl rounded-b-xl"
        >
          <div
            class="w-full flex flex-col md:flex-row justify-between items-center p-4 max-sm:gap-6 rounded-t-xl"
          >
            <div
              class="flex w-full items-start md:items-center gap-1"
            >
              <a
                data-state="closed"
                href="/identity/1"
              >
                <button
                  class="theme-border font-medium py-0.5 pl-0.5 pr-2 hover:bg-primary/10 disabled:pointer-events-none flex gap-2 items-center text-secondary/70 hover:text-secondary rounded-full [&>span]:rounded-full [&>span]:overflow-hidden text-base [&>span]:h-7 [&>span]:w-7"
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
                  <div
                    class="text-primary text-base font-normal"
                  >
                    John Doe
                  </div>
                </button>
              </a>
              <span
                class="sm:hidden ml-auto"
                data-state="closed"
              >
                <button
                  class="flex justify-center items-center gap-2 text-sm font-medium border disabled:text-muted-foreground aria-disabled:text-muted-foreground aria-disabled:pointer-events-none bg-transparent text-primary/70 border-transparent hover:text-primary disabled:border-transparent aria-disabled:border-transparent disabled:bg-transparent aria-disabled:bg-transparent shadow-none p-1"
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
            <div
              class="shrink-0 bg-border/20 h-[1px] w-full md:hidden"
              data-orientation="horizontal"
              role="none"
            />
            <div
              class="flex items-center gap-3 max-sm:justify-between max-sm:w-full"
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
                      class="flex flex-row items-center gap-1"
                    >
                      <div
                        class="text-primary text-sm font-normal"
                      >
                        420.6900
                      </div>
                      <div
                        class="text-primary text-sm font-normal"
                      >
                        ETH
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button
                class="flex justify-center items-center text-sm font-medium border aria-disabled:text-muted-foreground aria-disabled:pointer-events-none bg-gradient-to-b from-transparent to-transparent hover:text-primary disabled:hover:cursor-not-allowed aria-disabled:bg-primary/5 aria-disabled:border-primary/10 aria-selected:primary-gradient-subtle aria-selected:border-primary/10 shadow-md-subtle max-sm:py-2 max-sm:text-base py-0.5 px-2.5 gap-1.5 h-9 rounded-xl disabled:bg-primary/5 disabled:border-primary/20 disabled:text-primary/20 bg-primary/10 border-primary/30 hover:bg-primary/20 hover:border-primary/60 text-secondary w-full"
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
                class="max-sm:hidden"
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
          class="w-full flex flex-col items-center border border-border/10 rounded-t-xl rounded-b-xl"
        >
          <div
            class="w-full flex flex-col md:flex-row justify-between items-center p-4 max-sm:gap-6 rounded-t-xl bg-gradient-to-r from-transparent to-primary/10"
          >
            <div
              class="flex w-full items-start md:items-center gap-1"
            >
              <a
                data-state="closed"
                href="/identity/1"
              >
                <button
                  class="theme-border font-medium py-0.5 pl-0.5 pr-2 hover:bg-primary/10 disabled:pointer-events-none flex gap-2 items-center text-secondary/70 hover:text-secondary rounded-full [&>span]:rounded-full [&>span]:overflow-hidden text-base [&>span]:h-7 [&>span]:w-7"
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
                  <div
                    class="text-primary text-base font-normal"
                  >
                    John Doe
                  </div>
                </button>
              </a>
              <span
                class="sm:hidden ml-auto"
                data-state="closed"
              >
                <button
                  class="flex justify-center items-center gap-2 text-sm font-medium border disabled:text-muted-foreground aria-disabled:text-muted-foreground aria-disabled:pointer-events-none bg-transparent text-primary/70 border-transparent hover:text-primary disabled:border-transparent aria-disabled:border-transparent disabled:bg-transparent aria-disabled:bg-transparent shadow-none p-1"
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
            <div
              class="shrink-0 bg-border/20 h-[1px] w-full md:hidden"
              data-orientation="horizontal"
              role="none"
            />
            <div
              class="flex items-center gap-3 max-sm:justify-between max-sm:w-full"
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
                      class="flex flex-row items-center gap-1"
                    >
                      <div
                        class="text-primary text-sm font-normal"
                      >
                        420.6900
                      </div>
                      <div
                        class="text-primary text-sm font-normal"
                      >
                        ETH
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button
                class="flex justify-center items-center text-sm font-medium border aria-disabled:text-muted-foreground aria-disabled:pointer-events-none bg-gradient-to-b from-transparent to-transparent hover:text-primary disabled:hover:cursor-not-allowed aria-disabled:bg-primary/5 aria-disabled:border-primary/10 aria-selected:primary-gradient-subtle aria-selected:border-primary/10 shadow-md-subtle max-sm:py-2 max-sm:text-base py-0.5 px-2.5 gap-1.5 h-9 rounded-xl disabled:bg-primary/5 disabled:border-primary/20 disabled:text-primary/20 hover:bg-primary/20 text-secondary bg-primary/20 border-primary/60 hover:border-primary/60 w-full"
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
                class="max-sm:hidden"
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
            class="flex flex-row justify-center md:justify-end px-4 py-0.5 w-full items-center gap-1.5 h-14 md:h-9  text-primary/70 font-medium"
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
              You have staked 3.19 ETH
            </div>
          </div>
        </div>
      </DocumentFragment>
    `)
  })
})
