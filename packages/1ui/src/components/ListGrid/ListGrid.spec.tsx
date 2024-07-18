import React from 'react'

import { render } from '@testing-library/react'

import { ListGrid } from './ListGrid'

describe('ListGrid', () => {
  it('should render appropriate elements', () => {
    const { asFragment } = render(
      <ListGrid
        identities={[
          {
            displayName: 'Best Crypto Portfolio Trackers',
            description: '45 identities',
            image: 'path/to/image1.png',
            identitiesCount: 45,
            savedAmount: '0.047',
          },
          {
            displayName: 'Top Decentralized Finance Platforms',
            description: '45 identities',
            image: 'path/to/image2.png',
            identitiesCount: 45,
            savedAmount: '0.047',
          },
          // Add more identities as needed
        ]}
      />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        >
          <div
            class="theme-border p-8 rounded-xl flex flex-col items-center justify-between"
            style="height: 18rem;"
          >
            <div
              class="text-center flex-grow flex flex-col justify-between items-center"
            >
              <p
                class="text-lg font-medium text-primary/80 mb-2"
              >
                Best Crypto Portfolio Trackers
              </p>
              <p
                class="text-base font-normal text-secondary/50 mb-2"
              >
                45 identities
              </p>
            </div>
            <button
              class="flex justify-center items-center gap-2 text-sm font-medium border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted primary-gradient-subtle text-primary/60 border-primary/10 rounded-lg hover:text-primary disabled:from-muted disabled:to-muted shadow-md-subtle px-3 py-1 mt-4 w-full"
            >
              <svg
                class="w-3 h-3"
              >
                <use
                  href="/src/components/Icon/Icon.sprites.svg#bookmark-filled"
                />
              </svg>
              Saved · 0.047 ETH
            </button>
          </div>
          <div
            class="theme-border p-8 rounded-xl flex flex-col items-center justify-between"
            style="height: 18rem;"
          >
            <div
              class="text-center flex-grow flex flex-col justify-between items-center"
            >
              <p
                class="text-lg font-medium text-primary/80 mb-2"
              >
                Top Decentralized Finance Platforms
              </p>
              <p
                class="text-base font-normal text-secondary/50 mb-2"
              >
                45 identities
              </p>
            </div>
            <button
              class="flex justify-center items-center gap-2 text-sm font-medium border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted primary-gradient-subtle text-primary/60 border-primary/10 rounded-lg hover:text-primary disabled:from-muted disabled:to-muted shadow-md-subtle px-3 py-1 mt-4 w-full"
            >
              <svg
                class="w-3 h-3"
              >
                <use
                  href="/src/components/Icon/Icon.sprites.svg#bookmark-filled"
                />
              </svg>
              Saved · 0.047 ETH
            </button>
          </div>
        </div>
      </DocumentFragment>
    `)
  })
})
