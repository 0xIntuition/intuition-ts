import React from 'react'

import { render } from '@testing-library/react'

import { IdentityInput } from './IdentityInput'

describe('IdentityInput', () => {
  it('should render appropriate elements when given `showLabels` and default placeholders', () => {
    const { asFragment } = render(
      <IdentityInput
        showLabels
        subject={{
          selectedValue: { name: 'Super Dave' },
        }}
        predicate={{
          selectedValue: { name: 'is a', variant: 'non-user' },
        }}
        object={{
          selectedValue: { name: 'daredevil', variant: 'non-user' },
        }}
      />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex items-center"
        >
          <div
            class="flex flex-col gap-2"
          >
            <div
              class="flex gap-1 items-center"
            >
              <p
                class="text-xs font-normal text-primary/60"
              >
                Subject
              </p>
              <button
                data-state="closed"
              >
                <svg
                  class="h-4 w-4 text-primary/60"
                >
                  <use
                    href="/src/components/Icon/Icon.sprites.svg#circle-question-mark"
                  />
                </svg>
              </button>
            </div>
            <button
              class="border border-border/20 font-medium py-0.5 pl-0.5 pr-2 hover:bg-primary/20 disabled:pointer-events-none flex gap-2 items-center rounded-full [&>span]:rounded-full [&>span]:overflow-hidden text-lg [&>span]:h-8 [&>span]:w-8"
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
              super dave
            </button>
          </div>
          <span
            class="h-px w-2.5 flex bg-border/30 self-end mb-[1.2rem]"
          />
          <div
            class="flex flex-col gap-2"
          >
            <div
              class="flex gap-1 items-center"
            >
              <p
                class="text-xs font-normal text-primary/60"
              >
                Predicate
              </p>
              <button
                data-state="closed"
              >
                <svg
                  class="h-4 w-4 text-primary/60"
                >
                  <use
                    href="/src/components/Icon/Icon.sprites.svg#circle-question-mark"
                  />
                </svg>
              </button>
            </div>
            <button
              class="border border-border/20 font-medium py-0.5 pl-0.5 pr-2 hover:bg-primary/20 disabled:pointer-events-none flex gap-2 items-center rounded-sm text-lg [&>span]:h-8 [&>span]:w-8"
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
              is a
            </button>
          </div>
          <span
            class="h-px w-2.5 flex bg-border/30 self-end mb-[1.2rem]"
          />
          <div
            class="flex flex-col gap-2"
          >
            <div
              class="flex gap-1 items-center"
            >
              <p
                class="text-xs font-normal text-primary/60"
              >
                Object
              </p>
              <button
                data-state="closed"
              >
                <svg
                  class="h-4 w-4 text-primary/60"
                >
                  <use
                    href="/src/components/Icon/Icon.sprites.svg#circle-question-mark"
                  />
                </svg>
              </button>
            </div>
            <button
              class="border border-border/20 font-medium py-0.5 pl-0.5 pr-2 hover:bg-primary/20 disabled:pointer-events-none flex gap-2 items-center rounded-sm text-lg [&>span]:h-8 [&>span]:w-8"
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
              daredevil
            </button>
          </div>
        </div>
      </DocumentFragment>
    `)
  })
  it('should render appropriate elements when not given `showLabels` and given custom placeholders', () => {
    const { asFragment } = render(
      <IdentityInput
        subject={{
          placeholder: 'Select an identity',
          selectedValue: {},
        }}
        predicate={{
          placeholder: 'Select an identity',
          selectedValue: {},
        }}
        object={{
          placeholder: 'Select an identity',
          selectedValue: {},
        }}
      />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex items-center"
        >
          <div
            class="flex flex-col gap-2"
          >
            <button
              class="flex justify-center items-center font-medium border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted primary-gradient-subtle text-primary/60 border-primary/10 rounded-lg hover:text-primary disabled:from-muted disabled:to-muted shadow-md-subtle px-4 py-2 gap-3 text-base"
            >
              <svg
                class="h-4 w-4"
              >
                <use
                  href="/src/components/Icon/Icon.sprites.svg#plus-large"
                />
              </svg>
              Select an identity
            </button>
          </div>
          <span
            class="h-px w-2.5 flex bg-border/30 self-end mb-[1.2rem]"
          />
          <div
            class="flex flex-col gap-2"
          >
            <button
              class="flex justify-center items-center font-medium border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted primary-gradient-subtle text-primary/60 border-primary/10 rounded-lg hover:text-primary disabled:from-muted disabled:to-muted shadow-md-subtle px-4 py-2 gap-3 text-base"
            >
              <svg
                class="h-4 w-4"
              >
                <use
                  href="/src/components/Icon/Icon.sprites.svg#plus-large"
                />
              </svg>
              Select an identity
            </button>
          </div>
          <span
            class="h-px w-2.5 flex bg-border/30 self-end mb-[1.2rem]"
          />
          <div
            class="flex flex-col gap-2"
          >
            <button
              class="flex justify-center items-center font-medium border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted primary-gradient-subtle text-primary/60 border-primary/10 rounded-lg hover:text-primary disabled:from-muted disabled:to-muted shadow-md-subtle px-4 py-2 gap-3 text-base"
            >
              <svg
                class="h-4 w-4"
              >
                <use
                  href="/src/components/Icon/Icon.sprites.svg#plus-large"
                />
              </svg>
              Select an identity
            </button>
          </div>
        </div>
      </DocumentFragment>
    `)
  })
})
