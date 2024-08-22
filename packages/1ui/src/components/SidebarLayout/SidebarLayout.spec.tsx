import React from 'react'

import { render } from '@testing-library/react'
import { vi } from 'vitest'

import {
  SidebarLayout,
  SidebarLayoutContent,
  SidebarLayoutNav,
  SidebarLayoutNavAvatar,
  SidebarLayoutNavBody,
  SidebarLayoutNavHeader,
  SidebarLayoutNavHeaderButton,
  SidebarLayoutProvider,
  SidebarNavItem,
} from '.'

describe('SidebarLayout', () => {
  it('should render appropriate element', () => {
    const { asFragment } = render(
      <SidebarLayoutProvider>
        <SidebarLayout>
          <SidebarLayoutNav>
            <SidebarLayoutNavHeader>
              <SidebarLayoutNavHeaderButton
                imgLogo={<span>imgLogo</span>}
                textLogo={<span>textLogo</span>}
                productLogo={<span>productLogo</span>}
              />
            </SidebarLayoutNavHeader>
            <SidebarLayoutNavBody className="flex flex-col justify-between">
              <div className="flex flex-col gap-px">
                <SidebarNavItem
                  iconName="crystal-ball"
                  label="Explore This"
                  onClick={() => null}
                />
                <SidebarNavItem
                  iconName="megaphone"
                  label="Explore That"
                  onClick={() => null}
                />
              </div>
              <div className="flex flex-col gap-px">
                <SidebarNavItem
                  iconName="settings-gear"
                  label="Settings"
                  onClick={() => null}
                />
                <SidebarLayoutNavAvatar
                  imageSrc="https://m.media-amazon.com/images/M/MV5BNDhiMWYzMjgtNTRiYi00ZTA3LThlODctNDRkMDk0NzFkMWI3L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNTg0MTkzMzA@._V1_.jpg"
                  name="Super Dave"
                  onClick={() => null}
                />
              </div>
            </SidebarLayoutNavBody>
          </SidebarLayoutNav>
          <SidebarLayoutContent>Content goes here.</SidebarLayoutContent>
        </SidebarLayout>
      </SidebarLayoutProvider>,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex h-full w-full overflow-x-hidden flex-col"
        >
          <div
            class="theme-border border-0"
            style="width: 100%;"
          >
            <div
              class="from-primary/10 to-primary/2 bg-gradient-to-b flex flex-col h-full w-full relative top-0"
            >
              <div
                class="border-border/20 flex w-full items-center border-0 border-b-[1px] p-2"
              >
                <button
                  class="w-full px-4 py-2 flex gap-3 items-center"
                >
                  <span>
                    imgLogo
                  </span>
                  <span>
                    textLogo
                  </span>
                  <span>
                    productLogo
                  </span>
                </button>
                <button
                  class="flex justify-center items-center gap-2 text-sm font-medium border disabled:text-muted-foreground aria-disabled:text-muted-foreground aria-disabled:pointer-events-none bg-transparent text-primary/70 border-transparent hover:text-primary disabled:border-transparent aria-disabled:border-transparent disabled:bg-transparent aria-disabled:bg-transparent shadow-none p-1"
                >
                  <svg
                    class="h-6 w-6"
                  >
                    <use
                      href="/src/components/Icon/Icon.sprites.svg#hamburger"
                    />
                  </svg>
                </button>
              </div>
              <div
                class="w-full p-2 fixed top-[3.45rem] left-0 right-0 bottom-0 bg-background overflow-none z-50 h-auto from-primary/10 to-primary/2 bg-gradient-to-b collapse flex flex-col justify-between"
              >
                <div
                  class="flex flex-col gap-px"
                >
                  <button
                    class="flex items-center font-medium border disabled:bg-muted aria-disabled:bg-muted disabled:border-muted aria-disabled:border-muted aria-disabled:pointer-events-none bg-transparent text-secondary-foreground/70 border-transparent rounded-lg hover:text-secondary-foreground hover:border-border/20 aria-selected:bg-primary/10 aria-selected:text-secondary-foreground/80 aria-disabled:text-muted-foreground px-5 py-2.5 gap-4 text-lg w-full justify-start truncate disabled:text-muted"
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
                    class="flex items-center font-medium border disabled:bg-muted aria-disabled:bg-muted disabled:border-muted aria-disabled:border-muted aria-disabled:pointer-events-none bg-transparent text-secondary-foreground/70 border-transparent rounded-lg hover:text-secondary-foreground hover:border-border/20 aria-selected:bg-primary/10 aria-selected:text-secondary-foreground/80 aria-disabled:text-muted-foreground px-5 py-2.5 gap-4 text-lg w-full justify-start truncate disabled:text-muted"
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
                  class="flex flex-col gap-px"
                >
                  <button
                    class="flex items-center font-medium border disabled:bg-muted aria-disabled:bg-muted disabled:border-muted aria-disabled:border-muted aria-disabled:pointer-events-none bg-transparent text-secondary-foreground/70 border-transparent rounded-lg hover:text-secondary-foreground hover:border-border/20 aria-selected:bg-primary/10 aria-selected:text-secondary-foreground/80 aria-disabled:text-muted-foreground px-5 py-2.5 gap-4 text-lg w-full justify-start truncate disabled:text-muted"
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
                  <div
                    class="flex items-center font-medium border disabled:bg-muted aria-disabled:bg-muted disabled:border-muted aria-disabled:border-muted aria-disabled:pointer-events-none bg-transparent text-secondary-foreground/70 border-transparent rounded-lg hover:text-secondary-foreground hover:border-border/20 aria-selected:bg-primary/10 aria-selected:text-secondary-foreground/80 disabled:text-muted-foreground aria-disabled:text-muted-foreground px-5 py-2.5 gap-4 text-lg w-full justify-start"
                  >
                    <span
                      class="relative flex shrink-0 overflow-hidden aspect-square bg-background theme-border rounded-full h-6 w-6"
                    >
                      <span
                        class="flex h-full w-full items-center justify-center bg-inherit"
                      >
                        <svg
                          class="text-primary/30 w-[80%] h-[80%] max-w-8 max-h-8"
                        >
                          <use
                            href="/src/components/Icon/Icon.sprites.svg#crypto-punk"
                          />
                        </svg>
                      </span>
                    </span>
                    <div
                      class="bg-transparent text-secondary-foreground/70 font-medium border-transparent rounded-lg hover:text-secondary-foreground hover:border-border/20 aria-selected:bg-primary/10 aria-selected:text-secondary-foreground/80 disabled:text-muted-foreground aria-disabled:text-muted-foreground"
                    >
                      Super Dave
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="h-full w-full overflow-y-auto overflow-x-hidden flex justify-center"
          >
            Content goes here.
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
              <SidebarLayoutNavHeaderButton
                imgLogo={<span>imgLogo</span>}
                textLogo={<span>textLogo</span>}
                productLogo={<span>productLogo</span>}
              />
            </SidebarLayoutNavHeader>
            <SidebarLayoutNavBody className="flex flex-col justify-between">
              <div className="flex flex-col gap-px">
                <SidebarNavItem
                  iconName="crystal-ball"
                  label="Explore This"
                  onClick={() => null}
                />
                <SidebarNavItem
                  iconName="megaphone"
                  label="Explore That"
                  onClick={() => null}
                />
              </div>
              <div className="flex flex-col gap-px">
                <SidebarNavItem
                  iconName="settings-gear"
                  label="Settings"
                  onClick={() => null}
                />
                <SidebarLayoutNavAvatar
                  imageSrc="https://m.media-amazon.com/images/M/MV5BNDhiMWYzMjgtNTRiYi00ZTA3LThlODctNDRkMDk0NzFkMWI3L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNTg0MTkzMzA@._V1_.jpg"
                  name="Super Dave"
                  onClick={() => null}
                />
              </div>
            </SidebarLayoutNavBody>
          </SidebarLayoutNav>
          <SidebarLayoutContent>Content goes here.</SidebarLayoutContent>
        </SidebarLayout>,
      )
    } catch (e) {
      expect(consoleSpy).toHaveBeenCalled()
    }
  })
})
