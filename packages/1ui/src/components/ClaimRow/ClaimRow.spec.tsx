import React from 'react'

import { render } from '@testing-library/react'

import { Claim } from '..'
import { ClaimRow } from './ClaimRow'

describe('ClaimRow', () => {
  it('should render appropriate element', () => {
    const { asFragment } = render(
      <ClaimRow claimsFor={736} claimsAgainst={234} amount={0.383}>
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
      </ClaimRow>,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex justify-between items-center gap-2"
        >
          <div
            class="w-[60%]"
          >
            <div
              class="flex flex-col justify-between"
            >
              <div
                class="flex items-center h-[6px] mb-4"
              >
                <span
                  class="h-full bg-against block rounded-l-sm"
                  style="min-width: 24.123711340206185%;"
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
                  <span
                    class="relative flex h-10 w-10 shrink-0 overflow-hidden aspect-square rounded bg-background theme-border"
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
                  <span
                    class="relative flex h-10 w-10 shrink-0 overflow-hidden aspect-square rounded bg-background theme-border"
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
                  <span
                    class="relative flex h-10 w-10 shrink-0 overflow-hidden aspect-square rounded bg-background theme-border"
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
                  <p
                    class="text-primary text-base font-normal"
                  >
                    cool
                  </p>
                </button>
              </div>
            </div>
          </div>
          <div
            class="w-[40%]"
          >
            <div
              class="flex flex-col items-end"
            >
              <p
                class="text-primary text-lg font-normal"
              >
                0.383 ETH
              </p>
              <div
                class="flex gap-2 items-center mt-2"
              >
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
                  <p
                    class="text-base font-normal text-secondary-foreground"
                  >
                    234
                  </p>
                </div>
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
                  <p
                    class="text-base font-normal text-secondary-foreground"
                  >
                    736
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DocumentFragment>
    `)
  })
})
