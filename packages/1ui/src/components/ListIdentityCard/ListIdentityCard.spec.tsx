import React from 'react'

import { render } from '@testing-library/react'

import { ListIdentityCard } from './ListIdentityCard'

describe('ListIdentityCard', () => {
  it('should render appropriate elements', () => {
    const { asFragment } = render(
      <ListIdentityCard
        displayName="Best Crypto Portfolio Trackers"
        imgSrc="https://avatars.githubusercontent.com/u/94311139?s=200&v=4"
        identitiesCount={45}
        savedAmount="0.047"
        onSaveClick={() => alert('Best Crypto Portfolio Trackers saved!')}
        isSaved={true}
      />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="theme-border p-8 rounded-xl flex flex-col items-center justify-between h-72 max-sm:h-fit"
        >
          <span
            class="relative flex shrink-0 overflow-hidden aspect-square bg-background theme-border rounded mb-4 w-16 h-16"
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
            class="flex justify-center items-center gap-2 text-sm font-medium border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted primary-gradient-subtle text-primary/60 border-primary/10 rounded-lg hover:text-primary disabled:from-muted disabled:to-muted shadow-md-subtle px-3 py-1 max-sm:py-2 max-sm:text-base mt-4 w-full"
          >
            <svg
              class="w-3 h-3 text-primary mr-2"
            >
              <use
                href="/src/components/Icon/Icon.sprites.svg#bookmark-filled"
              />
            </svg>
            Saved · 0.047 ETH
          </button>
        </div>
      </DocumentFragment>
    `)
  })
})
