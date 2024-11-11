import { render } from '@testing-library/react'

import { ListCard } from './ListCard'

describe('ListCard', () => {
  it('should render appropriate element', () => {
    const { asFragment } = render(
      <ListCard
        displayName="Test List"
        imgSrc="test-image.jpg"
        identitiesCount={42}
        savedAmount="4.928"
        onViewClick={() => null}
      />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex flex-col items-center justify-between self-start w-[230px] gap-2 p-5 bg-primary/5 border border-primary/20 rounded-xl max-sm:h-fit max-sm:gap-px"
        >
          <span
            class="relative flex shrink-0 overflow-hidden aspect-square bg-background theme-border w-auto h-[180px] mb-2 rounded-xl"
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
            class="flex flex-col justify-between w-full gap-2"
          >
            <div
              class="text-lg font-medium text-left text-primary/80"
            >
              Test List
            </div>
            <div
              class="text-base font-normal text-secondary/50"
            >
              42 identities
            </div>
          </div>
          <button
            class="flex justify-center items-center font-medium border disabled:bg-muted aria-disabled:bg-muted disabled:text-muted-foreground aria-disabled:text-muted-foreground disabled:border-muted aria-disabled:border-muted aria-disabled:pointer-events-none primary-gradient-subtle text-primary/60 border-primary/10 rounded-lg hover:text-primary disabled:from-muted aria-disabled:from-muted disabled:to-muted aria-disabled:to-muted shadow-md-subtle px-4 py-2 gap-2 text-base w-full"
          >
            View List
          </button>
        </div>
      </DocumentFragment>
    `)
  })
})
