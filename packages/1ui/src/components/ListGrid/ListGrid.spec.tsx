import React from 'react'

import { render } from '@testing-library/react'

import { ListGrid } from './ListGrid'

describe('ListGrid', () => {
  it('should render appropriate elements', () => {
    const { container } = render(
      <ListGrid
        identities={[
          {
            displayName: 'Best Crypto Portfolio Trackers',
            imgSrc: 'path/to/image1.png',
            identitiesCount: 45,
            buttonWrapper: (button) => (
              <span
                role="link"
                tabIndex={0}
                onClick={() => null}
                onKeyDown={() => null}
              >
                {button}
              </span>
            ),
          },
          {
            displayName: 'Top Decentralized Finance Platforms',
            imgSrc: 'path/to/image2.png',
            identitiesCount: 45,
            buttonWrapper: (button) => (
              <span
                role="link"
                tabIndex={0}
                onClick={() => null}
                onKeyDown={() => null}
              >
                {button}
              </span>
            ),
          },
        ]}
      />,
    )
    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8"
        >
          <div
            class="relative h-full w-[230px] max-sm:h-fit flex flex-col items-center gap-2 max-sm:gap-px p-5 bg-primary/5 border border-primary/20 rounded-xl hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
          >
            <span
              class="relative flex shrink-0 overflow-hidden aspect-square bg-background theme-border h-[180px] w-auto mb-2 rounded-xl"
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
            <div
              class="w-full flex flex-col flex-grow gap-2"
            >
              <div
                class="text-lg font-medium text-left text-primary/80"
              >
                Best Crypto Portfolio Trackers
              </div>
              <div
                class="text-base font-normal text-secondary/50"
              >
                45
                 identities
              </div>
            </div>
            <span
              class="w-full"
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
          <div
            class="relative h-full w-[230px] max-sm:h-fit flex flex-col items-center gap-2 max-sm:gap-px p-5 bg-primary/5 border border-primary/20 rounded-xl hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
          >
            <span
              class="relative flex shrink-0 overflow-hidden aspect-square bg-background theme-border h-[180px] w-auto mb-2 rounded-xl"
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
            <div
              class="w-full flex flex-col flex-grow gap-2"
            >
              <div
                class="text-lg font-medium text-left text-primary/80"
              >
                Top Decentralized Finance Platforms
              </div>
              <div
                class="text-base font-normal text-secondary/50"
              >
                45
                 identities
              </div>
            </div>
            <span
              class="w-full"
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
    `)
  })
})
