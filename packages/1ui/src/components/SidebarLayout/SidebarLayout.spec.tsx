import React from 'react'

import { render } from '@testing-library/react'
import { vi } from 'vitest'

import {
  SidebarLayout,
  SidebarLayoutContent,
  SidebarLayoutNav,
  SidebarLayoutNavAvatar,
  SidebarLayoutNavFooter,
  SidebarLayoutNavFooterItem,
  SidebarLayoutNavHeader,
  SidebarLayoutNavHeaderContent,
  SidebarLayoutNavItem,
  SidebarLayoutNavItems,
  SidebarLayoutProvider,
} from '.'

describe('SidebarLayout', () => {
  it('should render appropriate element', () => {
    const { asFragment } = render(
      <SidebarLayoutProvider>
        <SidebarLayout>
          <SidebarLayoutNav>
            <SidebarLayoutNavHeader>
              <SidebarLayoutNavHeaderContent
                imgLogo={<span>imgLogo</span>}
                textLogo={<span>textLogo</span>}
              />
            </SidebarLayoutNavHeader>
            <SidebarLayoutNavItems>
              <SidebarLayoutNavItem
                iconName="crystal-ball"
                label="Explore This"
                onClick={() => null}
              />
              <SidebarLayoutNavItem
                iconName="megaphone"
                label="Explore That"
                onClick={() => null}
              />
            </SidebarLayoutNavItems>
            <SidebarLayoutNavFooter>
              <SidebarLayoutNavFooterItem
                iconName="settings-gear"
                label="Settings"
                onClick={() => null}
              />
              <SidebarLayoutNavAvatar
                imageSrc="imageSrc"
                name="Super Dave"
                onClick={() => null}
              />
            </SidebarLayoutNavFooter>
          </SidebarLayoutNav>
          <SidebarLayoutContent>Content goes here.</SidebarLayoutContent>
        </SidebarLayout>
      </SidebarLayoutProvider>,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex h-full w-full data-[panel-group-direction=vertical]:flex-col"
          data-panel-group=""
          data-panel-group-direction="horizontal"
          data-panel-group-id=":r0:"
          style="display: flex; flex-direction: row; height: 100%; overflow: hidden; width: 100%;"
        >
          <div
            class=""
            data-panel=""
            data-panel-collapsible="true"
            data-panel-group-id=":r0:"
            data-panel-id=":r1:"
            data-panel-size="30.0"
            style="flex-basis: 0px; flex-grow: 30; flex-shrink: 1; overflow: hidden;"
          >
            <div
              class="from-primary/10 to-primary/2 flex h-full flex-col items-center bg-gradient-to-b"
            >
              <div
                class="border-primary/30 flex w-full items-center gap-2 border-0 border-b-[1px] border-solid p-4"
              >
                <span>
                  imgLogo
                </span>
                <span>
                  textLogo
                </span>
              </div>
              <div
                class="flex w-full flex-col gap-2 p-2"
              >
                <button
                  class="flex items-center gap-2 text-sm font-medium border-solid border disabled:text-muted-foreground disabled:border-muted shadow-md-subtle bg-gradient-to-b from-transparent to-transparent text-primary/70 border-primary/70 rounded-lg hover:text-primary hover:border-primary disabled:bg-transparent aria-selected:primary-gradient-subtle aria-selected:border-primary/10 px-4 py-1.5 w-full"
                >
                  <svg
                    class="h-6 w-6"
                  >
                    <use
                      href="/src/components/Icon/Icon.sprites.svg#crystal-ball"
                    />
                  </svg>
                  Explore This
                </button>
                <button
                  class="flex items-center gap-2 text-sm font-medium border-solid border disabled:text-muted-foreground disabled:border-muted shadow-md-subtle bg-gradient-to-b from-transparent to-transparent text-primary/70 border-primary/70 rounded-lg hover:text-primary hover:border-primary disabled:bg-transparent aria-selected:primary-gradient-subtle aria-selected:border-primary/10 px-4 py-1.5 w-full"
                >
                  <svg
                    class="h-6 w-6"
                  >
                    <use
                      href="/src/components/Icon/Icon.sprites.svg#megaphone"
                    />
                  </svg>
                  Explore That
                </button>
              </div>
              <div
                class="flex h-full w-full flex-col justify-end gap-2 p-2"
              >
                <button
                  class="flex items-center gap-2 text-sm font-medium border-solid border disabled:text-muted-foreground shadow-md-subtle bg-transparent text-primary/70 border-transparent hover:text-primary disabled:border-transparent disabled:bg-transparent px-4 py-1.5 w-full"
                >
                  <svg
                    class="h-6 w-6"
                  >
                    <use
                      href="/src/components/Icon/Icon.sprites.svg#settings-gear"
                    />
                  </svg>
                  Settings
                </button>
                <button
                  class="flex items-center gap-2 text-sm font-medium border-solid border disabled:text-muted-foreground shadow-md-subtle bg-transparent text-primary/70 border-transparent hover:text-primary disabled:border-transparent disabled:bg-transparent px-4 py-1.5 w-full"
                >
                  <span
                    class="relative flex shrink-0 overflow-hidden rounded-full h-6 w-6"
                  >
                    <span
                      class="bg-muted flex h-full w-full items-center justify-center rounded-full text-xs"
                    >
                      SU
                    </span>
                  </span>
                  Super Dave
                </button>
              </div>
            </div>
          </div>
          <div
            class="border-border/30 focus-visible:ring-ring relative flex w-px items-center justify-center border border-solid after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90"
            data-panel-group-direction="horizontal"
            data-panel-group-id=":r0:"
            data-panel-resize-handle-enabled="true"
            data-panel-resize-handle-id=":r2:"
            data-resize-handle=""
            data-resize-handle-state="inactive"
            role="separator"
            style="user-select: none;"
            tabindex="0"
          >
            <div
              class="bg-background border-border/30 z-10 flex h-4 w-3 items-center justify-center rounded-sm border border-solid"
            >
              <svg
                class="lucide lucide-grip-vertical h-2.5 w-2.5"
                fill="none"
                height="24"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="9"
                  cy="12"
                  r="1"
                />
                <circle
                  cx="9"
                  cy="5"
                  r="1"
                />
                <circle
                  cx="9"
                  cy="19"
                  r="1"
                />
                <circle
                  cx="15"
                  cy="12"
                  r="1"
                />
                <circle
                  cx="15"
                  cy="5"
                  r="1"
                />
                <circle
                  cx="15"
                  cy="19"
                  r="1"
                />
              </svg>
            </div>
          </div>
          <div
            class=""
            data-panel=""
            data-panel-group-id=":r0:"
            data-panel-id=":r3:"
            data-panel-size="70.0"
            style="flex-basis: 0px; flex-grow: 70; flex-shrink: 1; overflow: hidden;"
          >
            <div
              class="flex h-full items-center justify-center p-3"
            >
              Content goes here.
            </div>
          </div>
        </div>
      </DocumentFragment>
    `)
  })

  it('should throw an error if there is no provider wrapper', () => {
    const consoleSpy = vi.spyOn(console, 'error')
    try {
      render(
        <SidebarLayout>
          <SidebarLayoutNav>
            <SidebarLayoutNavHeader>
              <SidebarLayoutNavHeaderContent
                imgLogo={<span>imgLogo</span>}
                textLogo={<span>textLogo</span>}
              />
            </SidebarLayoutNavHeader>
            <SidebarLayoutNavItems>
              <SidebarLayoutNavItem
                iconName="crystal-ball"
                label="Explore This"
                onClick={() => null}
              />
              <SidebarLayoutNavItem
                iconName="megaphone"
                label="Explore That"
                onClick={() => null}
              />
            </SidebarLayoutNavItems>
            <SidebarLayoutNavFooter>
              <SidebarLayoutNavFooterItem
                iconName="settings-gear"
                label="Settings"
                onClick={() => null}
              />
              <SidebarLayoutNavAvatar
                imageSrc="imageSrc"
                name="Super Dave"
                onClick={() => null}
              />
            </SidebarLayoutNavFooter>
          </SidebarLayoutNav>
          <SidebarLayoutContent>Content goes here.</SidebarLayoutContent>
        </SidebarLayout>,
      )
    } catch (e) {
      expect(consoleSpy).toHaveBeenCalled()
    }
  })
})
