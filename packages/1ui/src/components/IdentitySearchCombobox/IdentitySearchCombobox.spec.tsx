import React from 'react'

import { render } from '@testing-library/react'
import { vi } from 'vitest'

import {
  IdentitySearchCombobox,
  IdentitySearchComboboxItem,
} from './IdentitySearchCombobox'

describe('IdentitySearchCombobox', () => {
  beforeEach(() => {
    const ResizeObserverMock = vi.fn(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }))

    vi.stubGlobal('ResizeObserver', ResizeObserverMock)

    window.HTMLElement.prototype.scrollIntoView = function () {}
  })
  it('should render appropriate element', () => {
    const { asFragment } = render(
      <IdentitySearchCombobox onCreateIdentityClick={() => null}>
        <IdentitySearchComboboxItem
          variant="non-user"
          name="mech"
          value={0.039}
          walletAddress="0x1234567890abcdef1234567890abcdef12345678"
          socialCount={34}
          tagCount={34}
        />
        <IdentitySearchComboboxItem
          variant="non-user"
          name="mechanical"
          value={0.345}
          walletAddress="0x1234567890abcdef1234567890abcdef12345678"
        />
      </IdentitySearchCombobox>,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="min-w-96"
        >
          <div
            class="flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground border border-border/30"
            cmdk-root=""
            tabindex="-1"
          >
            <label
              cmdk-label=""
              for=":r2:"
              id=":r1:"
              style="position: absolute; width: 1px; height: 1px; padding: 0px; margin: -1px; overflow: hidden; clip: rect(0px, 0px, 0px, 0px); white-space: nowrap; border-width: 0px;"
            />
            <div
              class="flex items-center border-b border-border/30 px-3"
              cmdk-input-wrapper=""
            >
              <svg
                class="mr-2 h-4 w-4 shrink-0 opacity-50"
              >
                <use
                  href="/src/components/Icon/Icon.sprites.svg#magnifying-glass"
                />
              </svg>
              <input
                aria-autocomplete="list"
                aria-controls=":r0:"
                aria-expanded="true"
                aria-labelledby=":r1:"
                autocomplete="off"
                autocorrect="off"
                class="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                cmdk-input=""
                id=":r2:"
                placeholder="Search for an identity..."
                role="combobox"
                spellcheck="false"
                type="text"
                value=""
              />
            </div>
            <button
              class="flex items-center disabled:text-muted-foreground bg-transparent text-primary/70 hover:text-primary disabled:border-transparent disabled:bg-transparent shadow-md-subtle text-base gap-1.5 font-light justify-start p-3 border-border/30 border-0 border-b"
            >
              <svg
                class="h-4 w-4"
              >
                <use
                  href="/src/components/Icon/Icon.sprites.svg#plus-large"
                />
              </svg>
              Create a new identity
            </button>
            <div
              aria-label="Suggestions"
              class="max-h-[300px] overflow-y-auto overflow-x-hidden"
              cmdk-list=""
              id=":r0:"
              role="listbox"
            >
              <div
                cmdk-list-sizer=""
              >
                <div
                  cmdk-group=""
                  data-value="undefined"
                  role="presentation"
                >
                  <div
                    cmdk-group-items=""
                    role="group"
                  >
                    <div
                      aria-disabled="false"
                      aria-selected="true"
                      class="relative flex cursor-default select-none items-center text-sm outline-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 border border-transparent rounded-lg aria-selected:bg-primary/10 aria-selected:text-primary hover:border-border/30 px-2 py-4"
                      cmdk-item=""
                      data-disabled="false"
                      data-selected="true"
                      data-value="mech0.039 ETH0x1234...56783434"
                      id=":r5:"
                      role="option"
                    >
                      <div
                        class="flex justify-between items-center w-full"
                      >
                        <div
                          class="flex gap-2 items-center"
                        >
                          <span
                            class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded bg-background border border-border/30"
                          >
                            <span
                              class="flex h-full w-full items-center justify-center bg-inherit"
                            >
                              <svg
                                class="h-6 w-6 text-primary/30"
                              >
                                <use
                                  href="/src/components/Icon/Icon.sprites.svg#fingerprint"
                                />
                              </svg>
                            </span>
                          </span>
                          <div>
                            <div
                              class="flex gap-2 items-center"
                            >
                              <p
                                class="text-base font-normal text-primary/80"
                              >
                                mech
                              </p>
                              <div
                                class="inline-flex items-center gap-1 rounded-md pl-1 pr-1.5 py-0.5 text-sm font-light text-foreground/65 bg-primary/15"
                              >
                                0.039 ETH
                              </div>
                            </div>
                            <p
                              class="text-sm font-normal text-muted-foreground"
                            >
                              0x1234...5678
                            </p>
                          </div>
                        </div>
                        <div
                          class="flex items-center gap-1"
                        >
                          <button
                            data-state="closed"
                          >
                            <div
                              class="inline-flex items-center gap-1 rounded-md pl-1 pr-1.5 py-0.5 text-sm font-light text-foreground/65 bg-social/50"
                            >
                              <svg
                                class="h-3 w-3"
                              >
                                <use
                                  href="/src/components/Icon/Icon.sprites.svg#trust-circle"
                                />
                              </svg>
                              34
                            </div>
                          </button>
                          <button
                            data-state="closed"
                          >
                            <div
                              class="inline-flex items-center gap-1 rounded-md pl-1 pr-1.5 py-0.5 text-sm font-light text-foreground/65 bg-primary/15"
                            >
                              <svg
                                class="h-3 w-3"
                              >
                                <use
                                  href="/src/components/Icon/Icon.sprites.svg#tag"
                                />
                              </svg>
                              34
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div
                      aria-disabled="false"
                      aria-selected="false"
                      class="relative flex cursor-default select-none items-center text-sm outline-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 border border-transparent rounded-lg aria-selected:bg-primary/10 aria-selected:text-primary hover:border-border/30 px-2 py-4"
                      cmdk-item=""
                      data-disabled="false"
                      data-selected="false"
                      data-value="mechanical0.345 ETH0x1234...567800"
                      id=":r8:"
                      role="option"
                    >
                      <div
                        class="flex justify-between items-center w-full"
                      >
                        <div
                          class="flex gap-2 items-center"
                        >
                          <span
                            class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded bg-background border border-border/30"
                          >
                            <span
                              class="flex h-full w-full items-center justify-center bg-inherit"
                            >
                              <svg
                                class="h-6 w-6 text-primary/30"
                              >
                                <use
                                  href="/src/components/Icon/Icon.sprites.svg#fingerprint"
                                />
                              </svg>
                            </span>
                          </span>
                          <div>
                            <div
                              class="flex gap-2 items-center"
                            >
                              <p
                                class="text-base font-normal text-primary/80"
                              >
                                mechanical
                              </p>
                              <div
                                class="inline-flex items-center gap-1 rounded-md pl-1 pr-1.5 py-0.5 text-sm font-light text-foreground/65 bg-primary/15"
                              >
                                0.345 ETH
                              </div>
                            </div>
                            <p
                              class="text-sm font-normal text-muted-foreground"
                            >
                              0x1234...5678
                            </p>
                          </div>
                        </div>
                        <div
                          class="flex items-center gap-1"
                        >
                          <button
                            data-state="closed"
                          >
                            <div
                              class="inline-flex items-center gap-1 rounded-md pl-1 pr-1.5 py-0.5 text-sm font-light text-foreground/65 bg-social/50"
                            >
                              <svg
                                class="h-3 w-3"
                              >
                                <use
                                  href="/src/components/Icon/Icon.sprites.svg#trust-circle"
                                />
                              </svg>
                              0
                            </div>
                          </button>
                          <button
                            data-state="closed"
                          >
                            <div
                              class="inline-flex items-center gap-1 rounded-md pl-1 pr-1.5 py-0.5 text-sm font-light text-foreground/65 bg-primary/15"
                            >
                              <svg
                                class="h-3 w-3"
                              >
                                <use
                                  href="/src/components/Icon/Icon.sprites.svg#tag"
                                />
                              </svg>
                              0
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DocumentFragment>
    `)
  })
  it('should render appropriate elements when not given `onCreateIdentityClick` value', () => {
    const { asFragment } = render(
      <IdentitySearchCombobox>
        <IdentitySearchComboboxItem
          variant="non-user"
          name="mech"
          value={0.039}
          walletAddress="0x1234567890abcdef1234567890abcdef12345678"
          socialCount={34}
          tagCount={34}
        />
        <IdentitySearchComboboxItem
          variant="non-user"
          name="mechanical"
          value={0.345}
          walletAddress="0x1234567890abcdef1234567890abcdef12345678"
        />
      </IdentitySearchCombobox>,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="min-w-96"
        >
          <div
            class="flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground border border-border/30"
            cmdk-root=""
            tabindex="-1"
          >
            <label
              cmdk-label=""
              for=":rd:"
              id=":rc:"
              style="position: absolute; width: 1px; height: 1px; padding: 0px; margin: -1px; overflow: hidden; clip: rect(0px, 0px, 0px, 0px); white-space: nowrap; border-width: 0px;"
            />
            <div
              class="flex items-center border-b border-border/30 px-3"
              cmdk-input-wrapper=""
            >
              <svg
                class="mr-2 h-4 w-4 shrink-0 opacity-50"
              >
                <use
                  href="/src/components/Icon/Icon.sprites.svg#magnifying-glass"
                />
              </svg>
              <input
                aria-autocomplete="list"
                aria-controls=":rb:"
                aria-expanded="true"
                aria-labelledby=":rc:"
                autocomplete="off"
                autocorrect="off"
                class="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                cmdk-input=""
                id=":rd:"
                placeholder="Search for an identity..."
                role="combobox"
                spellcheck="false"
                type="text"
                value=""
              />
            </div>
            <div
              aria-label="Suggestions"
              class="max-h-[300px] overflow-y-auto overflow-x-hidden"
              cmdk-list=""
              id=":rb:"
              role="listbox"
            >
              <div
                cmdk-list-sizer=""
              >
                <div
                  cmdk-group=""
                  data-value="undefined"
                  role="presentation"
                >
                  <div
                    cmdk-group-items=""
                    role="group"
                  >
                    <div
                      aria-disabled="false"
                      aria-selected="true"
                      class="relative flex cursor-default select-none items-center text-sm outline-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 border border-transparent rounded-lg aria-selected:bg-primary/10 aria-selected:text-primary hover:border-border/30 px-2 py-4"
                      cmdk-item=""
                      data-disabled="false"
                      data-selected="true"
                      data-value="mech0.039 ETH0x1234...56783434"
                      id=":rg:"
                      role="option"
                    >
                      <div
                        class="flex justify-between items-center w-full"
                      >
                        <div
                          class="flex gap-2 items-center"
                        >
                          <span
                            class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded bg-background border border-border/30"
                          >
                            <span
                              class="flex h-full w-full items-center justify-center bg-inherit"
                            >
                              <svg
                                class="h-6 w-6 text-primary/30"
                              >
                                <use
                                  href="/src/components/Icon/Icon.sprites.svg#fingerprint"
                                />
                              </svg>
                            </span>
                          </span>
                          <div>
                            <div
                              class="flex gap-2 items-center"
                            >
                              <p
                                class="text-base font-normal text-primary/80"
                              >
                                mech
                              </p>
                              <div
                                class="inline-flex items-center gap-1 rounded-md pl-1 pr-1.5 py-0.5 text-sm font-light text-foreground/65 bg-primary/15"
                              >
                                0.039 ETH
                              </div>
                            </div>
                            <p
                              class="text-sm font-normal text-muted-foreground"
                            >
                              0x1234...5678
                            </p>
                          </div>
                        </div>
                        <div
                          class="flex items-center gap-1"
                        >
                          <button
                            data-state="closed"
                          >
                            <div
                              class="inline-flex items-center gap-1 rounded-md pl-1 pr-1.5 py-0.5 text-sm font-light text-foreground/65 bg-social/50"
                            >
                              <svg
                                class="h-3 w-3"
                              >
                                <use
                                  href="/src/components/Icon/Icon.sprites.svg#trust-circle"
                                />
                              </svg>
                              34
                            </div>
                          </button>
                          <button
                            data-state="closed"
                          >
                            <div
                              class="inline-flex items-center gap-1 rounded-md pl-1 pr-1.5 py-0.5 text-sm font-light text-foreground/65 bg-primary/15"
                            >
                              <svg
                                class="h-3 w-3"
                              >
                                <use
                                  href="/src/components/Icon/Icon.sprites.svg#tag"
                                />
                              </svg>
                              34
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div
                      aria-disabled="false"
                      aria-selected="false"
                      class="relative flex cursor-default select-none items-center text-sm outline-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 border border-transparent rounded-lg aria-selected:bg-primary/10 aria-selected:text-primary hover:border-border/30 px-2 py-4"
                      cmdk-item=""
                      data-disabled="false"
                      data-selected="false"
                      data-value="mechanical0.345 ETH0x1234...567800"
                      id=":rj:"
                      role="option"
                    >
                      <div
                        class="flex justify-between items-center w-full"
                      >
                        <div
                          class="flex gap-2 items-center"
                        >
                          <span
                            class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded bg-background border border-border/30"
                          >
                            <span
                              class="flex h-full w-full items-center justify-center bg-inherit"
                            >
                              <svg
                                class="h-6 w-6 text-primary/30"
                              >
                                <use
                                  href="/src/components/Icon/Icon.sprites.svg#fingerprint"
                                />
                              </svg>
                            </span>
                          </span>
                          <div>
                            <div
                              class="flex gap-2 items-center"
                            >
                              <p
                                class="text-base font-normal text-primary/80"
                              >
                                mechanical
                              </p>
                              <div
                                class="inline-flex items-center gap-1 rounded-md pl-1 pr-1.5 py-0.5 text-sm font-light text-foreground/65 bg-primary/15"
                              >
                                0.345 ETH
                              </div>
                            </div>
                            <p
                              class="text-sm font-normal text-muted-foreground"
                            >
                              0x1234...5678
                            </p>
                          </div>
                        </div>
                        <div
                          class="flex items-center gap-1"
                        >
                          <button
                            data-state="closed"
                          >
                            <div
                              class="inline-flex items-center gap-1 rounded-md pl-1 pr-1.5 py-0.5 text-sm font-light text-foreground/65 bg-social/50"
                            >
                              <svg
                                class="h-3 w-3"
                              >
                                <use
                                  href="/src/components/Icon/Icon.sprites.svg#trust-circle"
                                />
                              </svg>
                              0
                            </div>
                          </button>
                          <button
                            data-state="closed"
                          >
                            <div
                              class="inline-flex items-center gap-1 rounded-md pl-1 pr-1.5 py-0.5 text-sm font-light text-foreground/65 bg-primary/15"
                            >
                              <svg
                                class="h-3 w-3"
                              >
                                <use
                                  href="/src/components/Icon/Icon.sprites.svg#tag"
                                />
                              </svg>
                              0
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
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
