import { render } from '@testing-library/react'

import { ListCard } from './ListCard'

describe('ListCard', () => {
  it('should render appropriate element', () => {
    const { asFragment } = render(
      <ListCard
        displayName="Test List"
        imgSrc="test-image.jpg"
        identitiesCount={42}
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
      />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
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
                  class="text-primary/30 w-[80%] h-[80%]"
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
                Test List
              </div>
              <div
                class="text-base font-normal text-secondary/50 mt-2"
              >
                42 identities
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
      </DocumentFragment>
    `)
  })
})
