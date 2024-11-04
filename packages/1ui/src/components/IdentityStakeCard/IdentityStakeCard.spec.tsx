import { render } from '@testing-library/react'
import { Identity } from 'types'

import { IdentityStakeCard } from './IdentityStakeCard'

describe('IdentityStakeCard', () => {
  it('should render appropriate element', () => {
    const { asFragment } = render(
      <IdentityStakeCard
        tvl={4.928}
        holders={69}
        variant={Identity.user}
        identityImgSrc={'identityImgSrc'}
        identityDisplayName={'identityDisplayName'}
        onBuyClick={() => null}
        onViewAllClick={() => null}
      />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex flex-col justify-between w-full h-full theme-border px-6 py-4 rounded-lg"
        >
          <div
            class="flex flex-col gap-2 w-full"
          >
            <div
              class="text-primary text-lg font-normal flex flex-row gap-1.5"
            >
              Conviction in 
              <button
                class="theme-border font-medium py-0.5 pl-0.5 pr-2 hover:bg-primary/10 disabled:pointer-events-none flex gap-2 items-center text-secondary/70 hover:text-secondary rounded-full [&>span]:rounded-full [&>span]:overflow-hidden text-base [&>span]:h-6 [&>span]:w-6"
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
              </button>
              <button
                data-state="closed"
              >
                <div
                  class="text-primary text-base font-normal"
                >
                  identityDispl...
                </div>
              </button>
            </div>
            <div
              class="flex justify-between items-center"
            >
              <div>
                <div
                  class="text-sm font-normal text-muted-foreground"
                >
                  TVL
                </div>
                <div
                  class="text-primary text-base font-medium"
                >
                  4.928 ETH
                </div>
              </div>
              <div
                class="flex flex-col items-end"
              >
                <div
                  class="text-sm font-normal text-muted-foreground"
                >
                  Depositors
                </div>
                <div
                  class="text-primary text-base font-normal"
                >
                  69
                </div>
              </div>
            </div>
          </div>
          <div
            class="flex flex-col gap-2 w-full"
          >
            <button
              class="flex justify-center items-center gap-2 text-sm font-medium border disabled:bg-muted aria-disabled:bg-muted disabled:text-muted-foreground aria-disabled:text-muted-foreground disabled:border-muted aria-disabled:border-muted aria-disabled:pointer-events-none bg-primary text-primary-foreground border-primary hover:bg-primary/80 rounded-full shadow-md-subtle px-3 py-1 max-sm:py-2 max-sm:text-base w-full mt-4"
            >
              Deposit
            </button>
            <button
              class="flex justify-center items-center gap-2 text-sm font-medium border disabled:text-muted-foreground aria-disabled:text-muted-foreground aria-disabled:pointer-events-none bg-transparent text-primary/70 border-transparent hover:text-primary disabled:border-transparent aria-disabled:border-transparent disabled:bg-transparent aria-disabled:bg-transparent shadow-none px-3 py-1 max-sm:py-2 max-sm:text-base w-full"
            >
              View all positions
            </button>
          </div>
        </div>
      </DocumentFragment>
    `)
  })
})
