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
          class="grid gap-[7.5rem] theme-border"
        >
          <div
            class="theme-border p-4 rounded-xl"
          >
            <img
              alt="Best Crypto Portfolio Trackers"
              class="w-full h-32 object-cover rounded-t-xl"
              src="path/to/image1.png"
            />
            <div
              class="p-4"
            >
              <h2
                class="text-xl font-bold"
              >
                Best Crypto Portfolio Trackers
              </h2>
              <p
                class="text-muted-foreground"
              >
                45 identities
              </p>
              <p
                class="text-muted-foreground"
              >
                45 identities
              </p>
              <p
                class="text-muted-foreground"
              >
                Saved: 0.047 ETH
              </p>
            </div>
          </div>
          <div
            class="theme-border p-4 rounded-xl"
          >
            <img
              alt="Top Decentralized Finance Platforms"
              class="w-full h-32 object-cover rounded-t-xl"
              src="path/to/image2.png"
            />
            <div
              class="p-4"
            >
              <h2
                class="text-xl font-bold"
              >
                Top Decentralized Finance Platforms
              </h2>
              <p
                class="text-muted-foreground"
              >
                45 identities
              </p>
              <p
                class="text-muted-foreground"
              >
                45 identities
              </p>
              <p
                class="text-muted-foreground"
              >
                Saved: 0.047 ETH
              </p>
            </div>
          </div>
        </div>
      </DocumentFragment>
    `)
  })
})
