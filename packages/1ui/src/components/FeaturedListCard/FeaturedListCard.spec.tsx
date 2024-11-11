import { render } from '@testing-library/react'

import { FeaturedListCard } from './FeaturedListCard'

describe('FeaturedListCard', () => {
  it('should render with all props', () => {
    const { asFragment } = render(
      <FeaturedListCard
        displayName="Test List"
        imgSrc="test-image.jpg"
        identitiesCount={42}
        tvl="4.928"
        holdersCount={69}
        stakeholders={[
          { name: 'John Doe', avatar: 'avatar1.jpg' },
          { name: 'Jane Smith', avatar: 'avatar2.jpg' },
        ]}
      />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="relative h-[360px] w-[530px] flex flex-col overflow-hidden gap-3 p-5 text-left bg-primary/5 border border-primary/20 rounded-2xl hover:bg-primary/10 hover:border-primary/50 hover:cursor-pointer transition-all duration-300"
        >
          <div>
            <h6
              class="text-xl font-medium text-left text-secondary"
            >
              Test List
            </h6>
            <div
              class="flex gap-6 text-secondary/70"
            >
              <div
                class="text-base font-normal text-secondary/70"
              >
                42 identities
              </div>
              <div
                class="text-base font-normal text-secondary/70"
              >
                TVL 4.928 ETH
              </div>
              <div
                class="text-base font-normal text-secondary/70"
              >
                69 Holders
              </div>
            </div>
          </div>
          <div
            class="relative h-[222px] w-full"
          >
            <img
              alt="Test List"
              class="h-full w-full object-cover rounded-xl"
              src="test-image.jpg"
            />
          </div>
          <div
            class="flex items-center gap-2"
          >
            <div
              class="flex -space-x-2"
            >
              <span
                class="relative flex shrink-0 overflow-hidden aspect-square bg-background theme-border w-6 h-6 rounded-full"
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
              <span
                class="relative flex shrink-0 overflow-hidden aspect-square bg-background theme-border w-6 h-6 rounded-full"
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
            </div>
            <div
              class="text-base font-normal text-secondary/70"
            >
              John Doe and Jane Smith have staked on this claim
            </div>
          </div>
        </div>
      </DocumentFragment>
    `)
  })

  it('should render without optional props', () => {
    const { asFragment } = render(<FeaturedListCard displayName="Test List" />)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="relative h-[360px] w-[530px] flex flex-col overflow-hidden gap-3 p-5 text-left bg-primary/5 border border-primary/20 rounded-2xl hover:bg-primary/10 hover:border-primary/50 hover:cursor-pointer transition-all duration-300"
        >
          <div>
            <h6
              class="text-xl font-medium text-left text-secondary"
            >
              Test List
            </h6>
            <div
              class="flex gap-6 text-secondary/70"
            >
              <div
                class="text-base font-normal text-secondary/70"
              >
                 identities
              </div>
              <div
                class="text-base font-normal text-secondary/70"
              >
                TVL  ETH
              </div>
              <div
                class="text-base font-normal text-secondary/70"
              >
                 Holders
              </div>
            </div>
          </div>
          <div
            class="relative h-[222px] w-full"
          >
            <img
              alt="Test List"
              class="h-full w-full object-cover rounded-xl"
            />
          </div>
        </div>
      </DocumentFragment>
    `)
  })
})
