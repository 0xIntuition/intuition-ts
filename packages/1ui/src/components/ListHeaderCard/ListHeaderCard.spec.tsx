import React from 'react'

import { render } from '@testing-library/react'
import { Claim } from 'components'

import { ListHeaderCard } from './ListHeaderCard'

describe('ListHeaderCard', () => {
  it('should render appropriate element', () => {
    const { asFragment } = render(
      <ListHeaderCard label="Identities" value={35}>
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
      </ListHeaderCard>,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex items-center justify-between w-full p-6 theme-border rounded-xl"
        >
          <div
            class="flex flex-col"
          >
            <p
              class="text-sm font-normal text-muted-foreground mb-0.5"
            >
              Identities
            </p>
            <p
              class="text-primary text-lg font-medium"
            >
              35
            </p>
          </div>
          <div
            class="flex items-center"
          >
            <div
              class="flex items-center w-full max-w-full group"
            >
              <button
                class="theme-border font-medium py-0.5 pl-0.5 pr-2 hover:bg-primary/20 disabled:pointer-events-none flex gap-2 items-center rounded-sm text-base [&>span]:h-6 [&>span]:w-6 group-hover:border-primary group-hover:bg-primary/20"
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
                0xintuition
              </button>
              <div
                class="shrink-0 bg-border/20 h-[1px] w-4 group-hover:bg-primary"
                data-orientation="horizontal"
                role="none"
              />
              <button
                class="theme-border font-medium py-0.5 pl-0.5 pr-2 hover:bg-primary/20 disabled:pointer-events-none flex gap-2 items-center rounded-sm text-base [&>span]:h-6 [&>span]:w-6 group-hover:border-primary group-hover:bg-primary/20"
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
                is really
              </button>
              <div
                class="shrink-0 bg-border/20 h-[1px] w-4 group-hover:bg-primary"
                data-orientation="horizontal"
                role="none"
              />
              <button
                class="theme-border font-medium py-0.5 pl-0.5 pr-2 hover:bg-primary/20 disabled:pointer-events-none flex gap-2 items-center rounded-sm text-base [&>span]:h-6 [&>span]:w-6 group-hover:border-primary group-hover:bg-primary/20"
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
                cool
              </button>
            </div>
          </div>
        </div>
      </DocumentFragment>
    `)
  })
})
