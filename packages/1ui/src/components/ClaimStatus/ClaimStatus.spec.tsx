import { render } from '@testing-library/react'
import { Claim } from 'components/Claim'

import { ClaimStatus } from './ClaimStatus'

describe('ClaimStatus', () => {
  it('should render the ClaimStatus component', () => {
    const { asFragment } = render(
      <ClaimStatus claimsFor={10} claimsAgainst={5}>
        <Claim
          size="sm"
          subject={{
            variant: 'non-user',
            label: '0xintuition',
          }}
          predicate={{
            variant: 'non-user',
            label: 'is really',
          }}
          object={{
            variant: 'non-user',
            label: 'cool',
          }}
        />
      </ClaimStatus>,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex flex-col justify-between"
        >
          <div
            class="flex items-center h-[6px] mb-4"
          >
            <span
              class="h-full bg-against block rounded-l-sm"
              style="min-width: 33.33333333333333%;"
            />
            <span
              class="h-full w-full bg-for block rounded-r-sm"
            />
          </div>
          <div
            class="flex items-center w-full max-w-full group"
          >
            <button
              class="theme-border font-medium py-0.5 pl-0.5 pr-2 hover:bg-primary/20 disabled:pointer-events-none flex gap-2 items-center rounded-sm group-hover:border-primary group-hover:bg-primary/20"
            >
              <span>
                <span
                  class="bg-primary/15 p-[10%] flex justify-center items-center h-full w-full"
                >
                  <svg
                    class="h-full w-full"
                  >
                    <use
                      href="/src/components/Icon/Icon.sprites.svg#fingerprint"
                    />
                  </svg>
                </span>
              </span>
              <p
                class="text-primary text-base font-normal"
              >
                0xintuition
              </p>
            </button>
            <div
              class="shrink-0 bg-border/20 h-[1px] w-4 group-hover:bg-primary"
              data-orientation="horizontal"
              role="none"
            />
            <button
              class="theme-border font-medium py-0.5 pl-0.5 pr-2 hover:bg-primary/20 disabled:pointer-events-none flex gap-2 items-center rounded-sm group-hover:border-primary group-hover:bg-primary/20"
            >
              <span>
                <span
                  class="bg-primary/15 p-[10%] flex justify-center items-center h-full w-full"
                >
                  <svg
                    class="h-full w-full"
                  >
                    <use
                      href="/src/components/Icon/Icon.sprites.svg#fingerprint"
                    />
                  </svg>
                </span>
              </span>
              <p
                class="text-primary text-base font-normal"
              >
                is really
              </p>
            </button>
            <div
              class="shrink-0 bg-border/20 h-[1px] w-4 group-hover:bg-primary"
              data-orientation="horizontal"
              role="none"
            />
            <button
              class="theme-border font-medium py-0.5 pl-0.5 pr-2 hover:bg-primary/20 disabled:pointer-events-none flex gap-2 items-center rounded-sm group-hover:border-primary group-hover:bg-primary/20"
            >
              <span>
                <span
                  class="bg-primary/15 p-[10%] flex justify-center items-center h-full w-full"
                >
                  <svg
                    class="h-full w-full"
                  >
                    <use
                      href="/src/components/Icon/Icon.sprites.svg#fingerprint"
                    />
                  </svg>
                </span>
              </span>
              <p
                class="text-primary text-base font-normal"
              >
                cool
              </p>
            </button>
          </div>
        </div>
      </DocumentFragment>
    `)
  })
})
