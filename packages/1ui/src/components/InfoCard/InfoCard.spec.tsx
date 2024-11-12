import { render } from '@testing-library/react'

import { InfoCard } from './InfoCard'

describe('InfoCard', () => {
  it('should render appropriate element', () => {
    const { asFragment } = render(
      <InfoCard
        variant="user"
        username="super dave"
        avatarImgSrc="image.jpg"
        id="id"
        description="description"
        link="link"
        ipfsLink="ipfsLink"
        timestamp="2024-05-10T16:00:00Z"
      />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex flex-col gap-2 theme-border p-5 rounded-lg max-sm:items-center"
        >
          <div
            class="text-sm font-normal text-muted-foreground"
          >
            Creator
          </div>
          <div
            class="flex justify-start items-center gap-1"
          >
            <a
              data-state="closed"
            />
            <a
              href="link"
            >
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
                      class="text-primary/30 w-[80%] h-[80%]"
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
                  super dave
                </div>
              </button>
            </a>
            <span
              class="bg-muted-foreground h-[2px] w-[2px] block rounded-full"
            />
            <div
              class="text-base font-normal text-muted-foreground"
            >
              May 10, 2024
            </div>
          </div>
        </div>
      </DocumentFragment>
    `)
  })
})
