import React from 'react'

import { render } from '@testing-library/react'
import { vi } from 'vitest'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from './Command'

describe('Command', () => {
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
      <Command>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search Emoji</CommandItem>
            <CommandItem>Calculator</CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>Profile</CommandItem>
            <CommandItem>Billing</CommandItem>
            <CommandItem>Settings</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
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
              placeholder="Type a command or search..."
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
            id=":r0:"
            role="listbox"
          >
            <div
              cmdk-list-sizer=""
            >
              <div
                class="overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-sm [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground"
                cmdk-group=""
                data-value="Suggestions"
                role="presentation"
              >
                <div
                  aria-hidden="true"
                  cmdk-group-heading=""
                  id=":r4:"
                >
                  Suggestions
                </div>
                <div
                  aria-labelledby=":r4:"
                  cmdk-group-items=""
                  role="group"
                >
                  <div
                    aria-disabled="false"
                    aria-selected="true"
                    class="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent/30 aria-selected:text-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50"
                    cmdk-item=""
                    data-disabled="false"
                    data-selected="true"
                    data-value="Calendar"
                    id=":r5:"
                    role="option"
                  >
                    Calendar
                  </div>
                  <div
                    aria-disabled="false"
                    aria-selected="false"
                    class="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent/30 aria-selected:text-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50"
                    cmdk-item=""
                    data-disabled="false"
                    data-selected="false"
                    data-value="Search Emoji"
                    id=":r6:"
                    role="option"
                  >
                    Search Emoji
                  </div>
                  <div
                    aria-disabled="false"
                    aria-selected="false"
                    class="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent/30 aria-selected:text-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50"
                    cmdk-item=""
                    data-disabled="false"
                    data-selected="false"
                    data-value="Calculator"
                    id=":r7:"
                    role="option"
                  >
                    Calculator
                  </div>
                </div>
              </div>
              <div
                class="-mx-1 h-px bg-border/30"
                cmdk-separator=""
                role="separator"
              />
              <div
                class="overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-sm [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground"
                cmdk-group=""
                data-value="Settings"
                role="presentation"
              >
                <div
                  aria-hidden="true"
                  cmdk-group-heading=""
                  id=":r9:"
                >
                  Settings
                </div>
                <div
                  aria-labelledby=":r9:"
                  cmdk-group-items=""
                  role="group"
                >
                  <div
                    aria-disabled="false"
                    aria-selected="false"
                    class="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent/30 aria-selected:text-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50"
                    cmdk-item=""
                    data-disabled="false"
                    data-selected="false"
                    data-value="Profile"
                    id=":ra:"
                    role="option"
                  >
                    Profile
                  </div>
                  <div
                    aria-disabled="false"
                    aria-selected="false"
                    class="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent/30 aria-selected:text-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50"
                    cmdk-item=""
                    data-disabled="false"
                    data-selected="false"
                    data-value="Billing"
                    id=":rb:"
                    role="option"
                  >
                    Billing
                  </div>
                  <div
                    aria-disabled="false"
                    aria-selected="false"
                    class="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent/30 aria-selected:text-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50"
                    cmdk-item=""
                    data-disabled="false"
                    data-selected="false"
                    data-value="Settings"
                    id=":rc:"
                    role="option"
                  >
                    Settings
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
