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
            variant: 'default',
            label: '0xintuition',
          }}
          predicate={{ label: 'is really' }}
          object={{ label: 'cool' }}
        />
      </ClaimRow>,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex-col gap-2"
        >
          <div
            class="flex justify-between items-center"
          >
            <div
              class="flex items-center h-[6px] w-[60%]"
            >
              <span
                class="h-full bg-against block rounded-l-sm"
                style="width: 24.123711340206185%;"
              />
              <span
                class="h-full w-full bg-for block rounded-r-sm"
              />
            </div>
            <p
              class="text-primary text-lg font-normal"
            >
              0.383 ETH
            </p>
          </div>
          <div
            class="flex justify-between items-center"
          >
            <div
              class="flex items-center w-full max-w-full group"
            >
              <button
                class="border border-border/20 font-medium py-1 px-2 hover:bg-primary/20 disabled:pointer-events-none flex gap-2 items-center text-base [&>span]:h-[1.375rem] [&>span]:w-[1.375rem] group-hover:border-primary group-hover:bg-primary/20"
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
                0xintuition
              </button>
              <div
                class="shrink-0 bg-border/30 h-[1px] w-2"
                data-orientation="horizontal"
                role="none"
              />
              <button
                class="border border-border/20 font-medium py-1 px-2 hover:bg-primary/20 disabled:pointer-events-none flex gap-2 items-center text-base [&>span]:h-[1.375rem] [&>span]:w-[1.375rem] group-hover:border-primary group-hover:bg-primary/20"
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
                is really
              </button>
              <div
                class="shrink-0 bg-border/30 h-[1px] w-2"
                data-orientation="horizontal"
                role="none"
              />
              <button
                class="border border-border/20 font-medium py-1 px-2 hover:bg-primary/20 disabled:pointer-events-none flex gap-2 items-center text-base [&>span]:h-[1.375rem] [&>span]:w-[1.375rem] group-hover:border-primary group-hover:bg-primary/20"
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
                cool
              </button>
            </div>
            <div
              class="flex gap-2 items-center"
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
      </DocumentFragment>
    `)
  })
})
