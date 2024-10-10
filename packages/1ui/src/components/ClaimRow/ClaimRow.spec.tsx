import React from 'react'

import { render } from '@testing-library/react'

import { Claim } from '..'
import { ClaimRow } from './ClaimRow'

describe('ClaimRow', () => {
  it('should render appropriate element', () => {
    const { asFragment } = render(
      <ClaimRow
        claimsFor={736}
        claimsAgainst={234}
        claimsForValue={1.91}
        claimsAgainstValue={1.92}
        tvl={0.383}
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
      </ClaimRow>,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex justify-between items-center gap-2 max-md:flex-col"
        >
          <div
            class="w-[60%] max-md:w-full"
          >
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
                  style="min-width: 50.13054830287206%;"
                />
              </div>
              <div
                class="flex items-center w-full max-w-max group relative max-sm:flex-col max-sm:m-auto transition-colors duration-200 flex-row"
              >
                <div>
                  <button
                    class="theme-border font-medium py-0.5 pl-0.5 pr-2 hover:bg-primary/10 disabled:pointer-events-none flex gap-2 items-center text-secondary-foreground/70 hover:text-secondary-foreground rounded-md text-base [&>span]:h-6 [&>span]:w-6 relative z-10 identity-tag transition-colors duration-200 group-hover:border-primary"
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
                      class="text-base font-normal relative z-10 identity-tag transition-colors duration-200 text-secondary/70 group-hover:text-primary"
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
                    class="theme-border font-medium py-0.5 pl-0.5 pr-2 hover:bg-primary/10 disabled:pointer-events-none flex gap-2 items-center text-secondary-foreground/70 hover:text-secondary-foreground rounded-md text-base [&>span]:h-6 [&>span]:w-6 relative z-10 identity-tag transition-colors duration-200 group-hover:border-primary"
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
                      class="text-base font-normal relative z-10 identity-tag transition-colors duration-200 text-secondary/70 group-hover:text-primary"
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
                    class="theme-border font-medium py-0.5 pl-0.5 pr-2 hover:bg-primary/10 disabled:pointer-events-none flex gap-2 items-center text-secondary-foreground/70 hover:text-secondary-foreground rounded-md text-base [&>span]:h-6 [&>span]:w-6 relative z-10 identity-tag transition-colors duration-200 group-hover:border-primary"
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
                      class="text-base font-normal relative z-10 identity-tag transition-colors duration-200 text-secondary/70 group-hover:text-primary"
                    >
                      cool
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            class="w-[40%] max-md:w-full"
          >
            <div
              class="flex flex-col items-end max-md:flex-row max-md:justify-between max-md:items-center"
            >
              <div
                class="text-primary text-lg font-medium"
              >
                0.383 ETH
              </div>
              <div
                class="flex gap-2 items-center mt-2 max-md:mt-0"
              >
                <div
                  class="flex gap-1 items-center"
                >
                  <svg
                    class="text-for h-4 w-4"
                  >
                    <use
                      href="/src/components/Icon/Icon.sprites.svg#people"
                    />
                  </svg>
                  <div
                    class="text-base font-normal text-secondary-foreground"
                  >
                    736
                  </div>
                </div>
                <div
                  class="flex gap-1 items-center"
                >
                  <svg
                    class="text-against h-4 w-4"
                  >
                    <use
                      href="/src/components/Icon/Icon.sprites.svg#people"
                    />
                  </svg>
                  <div
                    class="text-base font-normal text-secondary-foreground"
                  >
                    234
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DocumentFragment>
    `)
  })
})
