import { render } from '@testing-library/react'

import { StakeButton, StakeButtonVariant } from './StakeButton'

describe('StakeButton', () => {
  it('should render with default identity variant', () => {
    const { asFragment } = render(
      <StakeButton numPositions={69} onClick={() => console.log('Clicked!')} />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          class="flex justify-center items-center text-sm font-medium border aria-disabled:text-muted-foreground aria-disabled:pointer-events-none bg-gradient-to-b from-transparent to-transparent hover:text-primary disabled:hover:cursor-not-allowed aria-disabled:bg-primary/5 aria-disabled:border-primary/10 aria-selected:primary-gradient-subtle aria-selected:border-primary/10 shadow-md-subtle max-sm:py-2 max-sm:text-base py-0.5 px-2.5 gap-1.5 h-9 w-16 rounded-xl disabled:bg-primary/5 disabled:border-primary/20 disabled:text-primary/20 bg-primary/10 border-primary/30 hover:bg-primary/20 hover:border-primary/60 text-secondary"
        >
          <svg
            class="h-4 w-4"
          >
            <use
              href="/src/components/Icon/Icon.sprites.svg#arrow-up"
            />
          </svg>
          <div
            class="text-sm font-normal text-inherit"
          >
            69
          </div>
        </button>
      </DocumentFragment>
    `)
  })

  it('should render with claimFor variant', () => {
    const { asFragment } = render(
      <StakeButton
        variant={StakeButtonVariant.claimFor}
        numPositions={124}
        onClick={() => console.log('Clicked!')}
      />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          class="flex justify-center items-center text-sm font-medium border aria-disabled:text-muted-foreground aria-disabled:pointer-events-none bg-gradient-to-b from-transparent to-transparent hover:text-primary disabled:hover:cursor-not-allowed aria-disabled:bg-primary/5 aria-disabled:border-primary/10 aria-selected:primary-gradient-subtle aria-selected:border-primary/10 shadow-md-subtle max-sm:py-2 max-sm:text-base py-0.5 px-2.5 gap-1.5 h-9 w-16 rounded-xl disabled:bg-primary/5 disabled:border-primary/20 disabled:text-primary/20 bg-for/10 border-for/30 hover:bg-for hover:border-for/50 text-for"
        >
          <svg
            class="h-4 w-4"
          >
            <use
              href="/src/components/Icon/Icon.sprites.svg#arrow-up"
            />
          </svg>
          <div
            class="text-sm font-normal text-inherit"
          >
            124
          </div>
        </button>
      </DocumentFragment>
    `)
  })

  it('should render with claimAgainst variant', () => {
    const { asFragment } = render(
      <StakeButton
        variant={StakeButtonVariant.claimAgainst}
        numPositions={39}
        onClick={() => console.log('Clicked!')}
      />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          class="flex justify-center items-center text-sm font-medium border aria-disabled:text-muted-foreground aria-disabled:pointer-events-none bg-gradient-to-b from-transparent to-transparent hover:text-primary disabled:hover:cursor-not-allowed aria-disabled:bg-primary/5 aria-disabled:border-primary/10 aria-selected:primary-gradient-subtle aria-selected:border-primary/10 shadow-md-subtle max-sm:py-2 max-sm:text-base py-0.5 px-2.5 gap-1.5 h-9 w-16 rounded-xl disabled:bg-primary/5 disabled:border-primary/20 disabled:text-primary/20 bg-against/10 border-against/30 hover:bg-against hover:border-against/50 text-against"
        >
          <svg
            class="h-4 w-4"
          >
            <use
              href="/src/components/Icon/Icon.sprites.svg#arrow-up"
            />
          </svg>
          <div
            class="text-sm font-normal text-inherit"
          >
            39
          </div>
        </button>
      </DocumentFragment>
    `)
  })
})
