import { render } from '@testing-library/react'

import { StakeholdersList } from './StakeholdersList'

describe('StakeholdersList', () => {
  it('should render appropriate element', () => {
    const { asFragment } = render(
      <StakeholdersList
        stakeholders={[
          {
            name: 'John Doe',
            avatar: 'https://example.com/avatar1.jpg',
          },
          {
            name: 'Jane Smith',
            avatar: 'https://example.com/avatar2.jpg',
          },
        ]}
      />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
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
                  class="text-primary/30 w-[80%] h-[80%]"
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
                  class="text-primary/30 w-[80%] h-[80%]"
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
      </DocumentFragment>
    `)
  })
})
