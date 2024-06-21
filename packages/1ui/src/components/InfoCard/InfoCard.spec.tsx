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
          class="flex flex-col gap-2 border border-border/30 p-5 rounded-lg"
        >
          <p
            class="text-sm font-normal text-muted-foreground"
          >
            Creator
          </p>
          <div
            class="flex justify-between items-center gap-1"
          >
            <button
              class="border border-border/20 font-medium py-1 px-2 hover:bg-primary/20 disabled:pointer-events-none flex gap-2 items-center rounded-full [&>span]:rounded-full [&>span]:overflow-hidden text-sm [&>span]:h-4 [&>span]:w-4"
            >
              <span>
                <img
                  alt="identity avatar"
                  class="h-full w-full rounded-full"
                  src="image.jpg"
                />
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
