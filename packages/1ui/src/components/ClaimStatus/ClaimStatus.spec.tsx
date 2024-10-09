import { render } from '@testing-library/react'
import { Claim } from 'components/Claim'

import { ClaimStatus } from './ClaimStatus'

describe('ClaimStatus', () => {
  it('should render the ClaimStatus component', () => {
    const { asFragment } = render(
      <ClaimStatus
        claimsFor={2}
        claimsAgainst={1}
        claimsForValue={10}
        claimsAgainstValue={5}
      >
        <Claim
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
          class="flex flex-col justify-between max-md:w-full max-md:justify-center"
        >
          <div
            class="flex items-center h-[6px] mb-4"
          >
            <button
              class="h-full w-full bg-for block rounded-r-sm"
              data-state="closed"
            />
            <button
              class="h-full bg-against block rounded-l-sm"
              data-state="closed"
              style="min-width: 33.33333333333333%;"
            />
          </div>
          <div
            class="flex items-center w-full max-w-max group relative max-sm:flex-col max-sm:m-auto transition-colors duration-200 flex-row"
          >
            <div>
              <button
                class="theme-border font-medium py-0.5 pl-0.5 pr-2 hover:bg-primary/10 disabled:pointer-events-none flex gap-2 items-center rounded-md text-base [&>span]:h-6 [&>span]:w-6 relative z-10 identity-tag transition-colors duration-200 group-hover:border-primary"
                data-state="closed"
              >
                <span
                  class="relative flex h-10 w-10 shrink-0 overflow-hidden aspect-square bg-background theme-border rounded"
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
                  class="text-primary text-base font-normal"
                >
                  0xintuition
                </div>
              </button>
            </div>
            <div
              class="shrink-0 bg-border/20 h-[1px] transition-colors duration-200 w-4 max-sm:w-px max-sm:h-2 group-hover:bg-primary"
              data-orientation="horizontal"
              role="none"
            />
            <div>
              <button
                class="theme-border font-medium py-0.5 pl-0.5 pr-2 hover:bg-primary/10 disabled:pointer-events-none flex gap-2 items-center rounded-md text-base [&>span]:h-6 [&>span]:w-6 relative z-10 identity-tag transition-colors duration-200 group-hover:border-primary"
                data-state="closed"
              >
                <span
                  class="relative flex h-10 w-10 shrink-0 overflow-hidden aspect-square bg-background theme-border rounded"
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
                  class="text-primary text-base font-normal"
                >
                  is really
                </div>
              </button>
            </div>
            <div
              class="shrink-0 bg-border/20 h-[1px] transition-colors duration-200 w-4 max-sm:w-px max-sm:h-2 group-hover:bg-primary"
              data-orientation="horizontal"
              role="none"
            />
            <div>
              <button
                class="theme-border font-medium py-0.5 pl-0.5 pr-2 hover:bg-primary/10 disabled:pointer-events-none flex gap-2 items-center rounded-md text-base [&>span]:h-6 [&>span]:w-6 relative z-10 identity-tag transition-colors duration-200 group-hover:border-primary"
                data-state="closed"
              >
                <span
                  class="relative flex h-10 w-10 shrink-0 overflow-hidden aspect-square bg-background theme-border rounded"
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
                  class="text-primary text-base font-normal"
                >
                  cool
                </div>
              </button>
            </div>
          </div>
        </div>
      </DocumentFragment>
    `)
  })
})
