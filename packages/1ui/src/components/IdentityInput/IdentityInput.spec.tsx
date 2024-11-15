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
              <div
                class="text-xs font-normal text-primary/60"
              >
                Subject
              </div>
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
              class="theme-border font-medium py-0.5 pl-0.5 pr-2 hover:bg-primary/10 disabled:pointer-events-none flex gap-2 items-center text-secondary/70 hover:text-secondary rounded-full [&>span]:rounded-full [&>span]:overflow-hidden text-lg [&>span]:h-8 [&>span]:w-8"
            >
              <span
                class="relative flex h-10 w-10 shrink-0 overflow-hidden aspect-square bg-background border-border/10 rounded-full"
              >
                <span
                  class="flex h-full w-full items-center justify-center bg-inherit"
                >
                  <svg
                    class="text-primary/30 w-1/2 h-1/2 max-h-10 max-w-10"
                  >
                    <use
                      href="/src/components/Icon/Icon.sprites.svg#crypto-punk"
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
              <div
                class="text-xs font-normal text-primary/60"
              >
                Predicate
              </div>
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
              class="theme-border font-medium py-0.5 pl-0.5 pr-2 hover:bg-primary/10 disabled:pointer-events-none flex gap-2 items-center text-secondary/70 hover:text-secondary rounded-md text-lg [&>span]:h-8 [&>span]:w-8"
            >
              <span
                class="relative flex h-10 w-10 shrink-0 overflow-hidden aspect-square bg-background border-border/10 rounded"
              >
                <span
                  class="flex h-full w-full items-center justify-center bg-inherit"
                >
                  <svg
                    class="text-primary/30 w-1/2 h-1/2 max-h-10 max-w-10"
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
              <div
                class="text-xs font-normal text-primary/60"
              >
                Object
              </div>
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
              class="theme-border font-medium py-0.5 pl-0.5 pr-2 hover:bg-primary/10 disabled:pointer-events-none flex gap-2 items-center text-secondary/70 hover:text-secondary rounded-md text-lg [&>span]:h-8 [&>span]:w-8"
            >
              <span
                class="relative flex h-10 w-10 shrink-0 overflow-hidden aspect-square bg-background border-border/10 rounded"
              >
                <span
                  class="flex h-full w-full items-center justify-center bg-inherit"
                >
                  <svg
                    class="text-primary/30 w-1/2 h-1/2 max-h-10 max-w-10"
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
              class="flex justify-center items-center font-medium border disabled:bg-muted aria-disabled:bg-muted disabled:text-muted-foreground aria-disabled:text-muted-foreground disabled:border-muted aria-disabled:border-muted aria-disabled:pointer-events-none primary-gradient-subtle text-primary/60 border-primary/10 rounded-lg hover:text-primary disabled:from-muted aria-disabled:from-muted disabled:to-muted aria-disabled:to-muted shadow-md-subtle px-4 py-2 gap-2 text-base"
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
              class="flex justify-center items-center font-medium border disabled:bg-muted aria-disabled:bg-muted disabled:text-muted-foreground aria-disabled:text-muted-foreground disabled:border-muted aria-disabled:border-muted aria-disabled:pointer-events-none primary-gradient-subtle text-primary/60 border-primary/10 rounded-lg hover:text-primary disabled:from-muted aria-disabled:from-muted disabled:to-muted aria-disabled:to-muted shadow-md-subtle px-4 py-2 gap-2 text-base"
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
              class="flex justify-center items-center font-medium border disabled:bg-muted aria-disabled:bg-muted disabled:text-muted-foreground aria-disabled:text-muted-foreground disabled:border-muted aria-disabled:border-muted aria-disabled:pointer-events-none primary-gradient-subtle text-primary/60 border-primary/10 rounded-lg hover:text-primary disabled:from-muted aria-disabled:from-muted disabled:to-muted aria-disabled:to-muted shadow-md-subtle px-4 py-2 gap-2 text-base"
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
