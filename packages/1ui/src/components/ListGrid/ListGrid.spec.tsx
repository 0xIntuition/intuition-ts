import React from 'react'

import { render } from '@testing-library/react'
import { ListCard } from 'components'

import { ListGrid } from './ListGrid'

describe('ListGrid', () => {
  it('should render appropriate elements', () => {
    const { container } = render(
      <ListGrid>
        <ListCard
          displayName="Best Crypto Portfolio Trackers"
          imgSrc="path/to/image1.png"
          identitiesCount={45}
          buttonWrapper={(button) => (
            <span
              role="link"
              tabIndex={0}
              onClick={() => null}
              onKeyDown={() => null}
            >
              {button}
            </span>
          )}
        />
        <ListCard
          displayName="Top DeFi Platforms"
          imgSrc="path/to/image2.png"
          identitiesCount={45}
          buttonWrapper={(button) => (
            <span
              role="link"
              tabIndex={0}
              onClick={() => null}
              onKeyDown={() => null}
            >
              {button}
            </span>
          )}
        />
      </ListGrid>,
    )
    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          <div
            class="relative flex flex-col min-w-[200px] max-w-[400px] h-auto p-5 bg-primary/5 border border-primary/20 rounded-xl overflow-hidden hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
          >
            <div
              class="aspect-square w-full"
            >
              <span
                class="relative flex shrink-0 overflow-hidden aspect-square bg-background theme-border w-full h-auto rounded-xl"
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
            </div>
            <div
              class="flex flex-col justify-between flex-grow mt-4"
            >
              <div>
                <div
                  class="text-lg font-medium text-left text-primary/80"
                >
                  Best Crypto Portfolio Trackers
                </div>
                <div
                  class="text-base font-normal text-secondary/50 mt-2"
                >
                  45
                   identities
                </div>
              </div>
              <div
                class="mt-4"
              >
                <span
                  role="link"
                  tabindex="0"
                >
                  <button
                    class="flex justify-center items-center font-medium border disabled:bg-muted aria-disabled:bg-muted disabled:text-muted-foreground aria-disabled:text-muted-foreground disabled:border-muted aria-disabled:border-muted aria-disabled:pointer-events-none primary-gradient-subtle text-primary/60 border-primary/10 rounded-lg hover:text-primary disabled:from-muted aria-disabled:from-muted disabled:to-muted aria-disabled:to-muted shadow-md-subtle px-4 py-2 gap-2 text-base w-full"
                  >
                    View List
                  </button>
                </span>
              </div>
            </div>
          </div>
          <div
            class="relative flex flex-col min-w-[200px] max-w-[400px] h-auto p-5 bg-primary/5 border border-primary/20 rounded-xl overflow-hidden hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
          >
            <div
              class="aspect-square w-full"
            >
              <span
                class="relative flex shrink-0 overflow-hidden aspect-square bg-background theme-border w-full h-auto rounded-xl"
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
            </div>
            <div
              class="flex flex-col justify-between flex-grow mt-4"
            >
              <div>
                <div
                  class="text-lg font-medium text-left text-primary/80"
                >
                  Top DeFi Platforms
                </div>
                <div
                  class="text-base font-normal text-secondary/50 mt-2"
                >
                  45
                   identities
                </div>
              </div>
              <div
                class="mt-4"
              >
                <span
                  role="link"
                  tabindex="0"
                >
                  <button
                    class="flex justify-center items-center font-medium border disabled:bg-muted aria-disabled:bg-muted disabled:text-muted-foreground aria-disabled:text-muted-foreground disabled:border-muted aria-disabled:border-muted aria-disabled:pointer-events-none primary-gradient-subtle text-primary/60 border-primary/10 rounded-lg hover:text-primary disabled:from-muted aria-disabled:from-muted disabled:to-muted aria-disabled:to-muted shadow-md-subtle px-4 py-2 gap-2 text-base w-full"
                  >
                    View List
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `)
  })
})
