import { render } from '@testing-library/react'
import { Claim } from 'components/Claim'

import { ClaimRow } from './ClaimRow'

describe('ClaimRow', () => {
  it('should render basic claim row', () => {
    const { asFragment } = render(
      <ClaimRow
        numPositionsFor={69}
        numPositionsAgainst={42}
        totalTVL={'420.69'}
        tvlFor={'240.69'}
        tvlAgainst={'180'}
        currency="ETH"
        onStakeForClick={() => console.log('Clicked!')}
        onStakeAgainstClick={() => console.log('Clicked!')}
      >
        <Claim
          subject={{ variant: 'non-user', label: '0xintuition' }}
          predicate={{ variant: 'non-user', label: 'is really' }}
          object={{ variant: 'non-user', label: 'cool' }}
        />
      </ClaimRow>,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="w-full flex flex-col items-center border border-border/10 overflow-hidden rounded-t-xl rounded-b-xl"
        >
          <div
            class="w-full flex flex-col md:flex-row justify-between items-center p-4 max-sm:gap-6 rounded-t-xl"
            style="background-image: none;"
          >
            <div
              class="flex w-full items-start md:items-center gap-1"
            >
              <div
                class="flex items-center w-full max-w-max relative max-sm:m-auto transition-colors duration-200 flex-row"
              >
                <div
                  class="flex items-center"
                >
                  <button
                    class="theme-border font-medium py-0.5 pl-0.5 pr-2 hover:bg-primary/10 disabled:pointer-events-none flex gap-2 items-center text-secondary/70 hover:text-secondary rounded-md text-base [&>span]:h-6 [&>span]:w-6 relative z-10 identity-tag transition-colors duration-200 theme-border"
                    data-state="closed"
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
                    <div
                      class="text-base font-normal relative z-10 identity-tag transition-colors duration-200 text-secondary/70"
                    >
                      0xintuition
                    </div>
                  </button>
                </div>
                <div
                  class="shrink-0 bg-border/20 h-[1px] transition-colors duration-200 w-4 max-sm:w-px max-sm:h-2"
                  data-orientation="horizontal"
                  role="none"
                />
                <div
                  class="flex items-center"
                >
                  <button
                    class="theme-border font-medium py-0.5 pl-0.5 pr-2 hover:bg-primary/10 disabled:pointer-events-none flex gap-2 items-center text-secondary/70 hover:text-secondary rounded-md text-base [&>span]:h-6 [&>span]:w-6 relative z-10 identity-tag transition-colors duration-200 theme-border"
                    data-state="closed"
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
                    <div
                      class="text-base font-normal relative z-10 identity-tag transition-colors duration-200 text-secondary/70"
                    >
                      is really
                    </div>
                  </button>
                </div>
                <div
                  class="shrink-0 bg-border/20 h-[1px] transition-colors duration-200 w-4 max-sm:w-px max-sm:h-2"
                  data-orientation="horizontal"
                  role="none"
                />
                <div
                  class="flex items-center"
                >
                  <button
                    class="theme-border font-medium py-0.5 pl-0.5 pr-2 hover:bg-primary/10 disabled:pointer-events-none flex gap-2 items-center text-secondary/70 hover:text-secondary rounded-md text-base [&>span]:h-6 [&>span]:w-6 relative z-10 identity-tag transition-colors duration-200 theme-border"
                    data-state="closed"
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
                    <div
                      class="text-base font-normal relative z-10 identity-tag transition-colors duration-200 text-secondary/70"
                    >
                      cool
                    </div>
                  </button>
                </div>
              </div>
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
              class="flex items-center gap-3 max-sm:w-full"
            >
              <div
                class="h-9 justify-start items-center gap-1 inline-flex"
                data-state="closed"
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
                <div
                  class="p-0.5"
                >
                  <div
                    class="grid"
                  >
                    <span
                      class="col-[1] row-[1] rounded-full block"
                      style="height: 32px; width: 32px; mask: radial-gradient(farthest-side,#0000 calc(99% - 4px),var(--background) calc(100% - 4px);"
                    />
                    <span
                      class="col-[1] row-[1] border-muted-foreground rounded-full block"
                      style="border-width: 4px;"
                    />
                  </div>
                </div>
              </div>
              <button
                class="flex justify-center items-center text-sm font-medium border aria-disabled:text-muted-foreground aria-disabled:pointer-events-none bg-gradient-to-b from-transparent to-transparent hover:text-primary disabled:hover:cursor-not-allowed aria-disabled:bg-primary/5 aria-disabled:border-primary/10 aria-selected:primary-gradient-subtle aria-selected:border-primary/10 shadow-md-subtle max-sm:py-2 max-sm:text-base py-0.5 px-2.5 gap-1.5 h-9 w-16 rounded-xl disabled:bg-primary/5 disabled:border-primary/20 disabled:text-primary/20 bg-for/10 border-for/30 hover:bg-for hover:border-for/50 text-for max-sm:w-full"
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
              <button
                class="flex justify-center items-center text-sm font-medium border aria-disabled:text-muted-foreground aria-disabled:pointer-events-none bg-gradient-to-b from-transparent to-transparent hover:text-primary disabled:hover:cursor-not-allowed aria-disabled:bg-primary/5 aria-disabled:border-primary/10 aria-selected:primary-gradient-subtle aria-selected:border-primary/10 shadow-md-subtle max-sm:py-2 max-sm:text-base py-0.5 px-2.5 gap-1.5 h-9 w-16 rounded-xl disabled:bg-primary/5 disabled:border-primary/20 disabled:text-primary/20 bg-against/10 border-against/30 hover:bg-against hover:border-against/50 text-against max-sm:w-full"
              >
                <svg
                  class="h-4 w-4"
                >
                  <use
                    href="/src/components/Icon/Icon.sprites.svg#arrow-down"
                  />
                </svg>
                <div
                  class="text-sm font-normal text-inherit"
                >
                  42
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
      <ClaimRow
        numPositionsFor={69}
        numPositionsAgainst={42}
        totalTVL={'420.69'}
        tvlFor={'240.69'}
        tvlAgainst={'180'}
        currency="ETH"
        userPosition={'3.19'}
        positionDirection="for"
        onStakeForClick={() => console.log('Clicked!')}
        onStakeAgainstClick={() => console.log('Clicked!')}
      >
        <Claim
          subject={{ variant: 'non-user', label: '0xintuition' }}
          predicate={{ variant: 'non-user', label: 'is really' }}
          object={{ variant: 'non-user', label: 'cool' }}
        />
      </ClaimRow>,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="w-full flex flex-col items-center border border-border/10 overflow-hidden rounded-t-xl rounded-b-xl"
        >
          <div
            class="w-full flex flex-col md:flex-row justify-between items-center p-4 max-sm:gap-6 rounded-t-xl"
          >
            <div
              class="flex w-full items-start md:items-center gap-1"
            >
              <div
                class="flex items-center w-full max-w-max relative max-sm:m-auto transition-colors duration-200 flex-row"
              >
                <div
                  class="flex items-center"
                >
                  <button
                    class="theme-border font-medium py-0.5 pl-0.5 pr-2 hover:bg-primary/10 disabled:pointer-events-none flex gap-2 items-center text-secondary/70 hover:text-secondary rounded-md text-base [&>span]:h-6 [&>span]:w-6 relative z-10 identity-tag transition-colors duration-200 theme-border"
                    data-state="closed"
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
                    <div
                      class="text-base font-normal relative z-10 identity-tag transition-colors duration-200 text-secondary/70"
                    >
                      0xintuition
                    </div>
                  </button>
                </div>
                <div
                  class="shrink-0 bg-border/20 h-[1px] transition-colors duration-200 w-4 max-sm:w-px max-sm:h-2"
                  data-orientation="horizontal"
                  role="none"
                />
                <div
                  class="flex items-center"
                >
                  <button
                    class="theme-border font-medium py-0.5 pl-0.5 pr-2 hover:bg-primary/10 disabled:pointer-events-none flex gap-2 items-center text-secondary/70 hover:text-secondary rounded-md text-base [&>span]:h-6 [&>span]:w-6 relative z-10 identity-tag transition-colors duration-200 theme-border"
                    data-state="closed"
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
                    <div
                      class="text-base font-normal relative z-10 identity-tag transition-colors duration-200 text-secondary/70"
                    >
                      is really
                    </div>
                  </button>
                </div>
                <div
                  class="shrink-0 bg-border/20 h-[1px] transition-colors duration-200 w-4 max-sm:w-px max-sm:h-2"
                  data-orientation="horizontal"
                  role="none"
                />
                <div
                  class="flex items-center"
                >
                  <button
                    class="theme-border font-medium py-0.5 pl-0.5 pr-2 hover:bg-primary/10 disabled:pointer-events-none flex gap-2 items-center text-secondary/70 hover:text-secondary rounded-md text-base [&>span]:h-6 [&>span]:w-6 relative z-10 identity-tag transition-colors duration-200 theme-border"
                    data-state="closed"
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
                    <div
                      class="text-base font-normal relative z-10 identity-tag transition-colors duration-200 text-secondary/70"
                    >
                      cool
                    </div>
                  </button>
                </div>
              </div>
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
              class="flex items-center gap-3 max-sm:w-full"
            >
              <div
                class="h-9 justify-start items-center gap-1 inline-flex"
                data-state="closed"
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
                <div
                  class="p-0.5"
                >
                  <div
                    class="grid"
                  >
                    <span
                      class="col-[1] row-[1] rounded-full block"
                      style="height: 32px; width: 32px; mask: radial-gradient(farthest-side,#0000 calc(99% - 4px),var(--background) calc(100% - 4px);"
                    />
                    <span
                      class="col-[1] row-[1] border-muted-foreground rounded-full block"
                      style="border-width: 4px;"
                    />
                  </div>
                </div>
              </div>
              <button
                class="flex justify-center items-center text-sm font-medium border aria-disabled:text-muted-foreground aria-disabled:pointer-events-none bg-gradient-to-b from-transparent to-transparent hover:text-primary disabled:hover:cursor-not-allowed aria-disabled:bg-primary/5 aria-disabled:border-primary/10 aria-selected:primary-gradient-subtle aria-selected:border-primary/10 shadow-md-subtle max-sm:py-2 max-sm:text-base py-0.5 px-2.5 gap-1.5 h-9 w-16 rounded-xl disabled:bg-primary/5 disabled:border-primary/20 disabled:text-primary/20 hover:bg-for text-primary bg-for border-border/30 hover:border-border/30 max-sm:w-full"
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
              <button
                class="flex justify-center items-center text-sm font-medium border aria-disabled:text-muted-foreground aria-disabled:pointer-events-none bg-gradient-to-b from-transparent to-transparent hover:text-primary disabled:hover:cursor-not-allowed aria-disabled:bg-primary/5 aria-disabled:border-primary/10 aria-selected:primary-gradient-subtle aria-selected:border-primary/10 shadow-md-subtle max-sm:py-2 max-sm:text-base py-0.5 px-2.5 gap-1.5 h-9 w-16 rounded-xl disabled:bg-primary/5 disabled:border-primary/20 disabled:text-primary/20 hover:bg-against text-primary bg-for border-border/30 hover:border-border/30 max-sm:w-full"
                disabled=""
              >
                <svg
                  class="h-4 w-4"
                >
                  <use
                    href="/src/components/Icon/Icon.sprites.svg#arrow-down"
                  />
                </svg>
                <div
                  class="text-sm font-normal text-inherit"
                >
                  42
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
            class="flex flex-row justify-center md:justify-end px-4 py-0.5 w-full items-center gap-1.5 h-14 md:h-9 rounded-b-xl bg-for/10 text-for"
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
              You have staked 3.19 ETH for this claim
            </div>
          </div>
        </div>
      </DocumentFragment>
    `)
  })
})
