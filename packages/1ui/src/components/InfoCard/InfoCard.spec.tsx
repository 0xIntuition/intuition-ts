import React from 'react'

import { render } from '@testing-library/react'

import { InfoCard } from './InfoCard'

describe('InfoCard', () => {
  it('should render appropriate element', () => {
    const { asFragment } = render(
      <InfoCard
        variant="user"
        username="super dave"
        avatarImgSrc="image.jpg"
        timestamp="2024-05-10T16:00:00Z"
      />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex flex-col gap-2 theme-border p-5 rounded-lg max-sm:items-center"
        >
          <p
            class="text-sm font-normal text-muted-foreground"
          >
            Creator
          </p>
          <div
            class="flex justify-start items-center gap-1"
          >
            <button
              class="theme-border font-medium py-0.5 pl-0.5 pr-2 hover:bg-primary/10 disabled:pointer-events-none flex gap-2 items-center rounded-full [&>span]:rounded-full [&>span]:overflow-hidden text-base [&>span]:h-6 [&>span]:w-6"
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
              super dave
            </button>
            <span
              class="bg-muted-foreground h-[2px] w-[2px] block rounded-full"
            />
            <p
              class="text-base font-normal text-muted-foreground"
            >
              May 10, 2024
            </p>
          </div>
        </div>
      </DocumentFragment>
    `)
  })
})
