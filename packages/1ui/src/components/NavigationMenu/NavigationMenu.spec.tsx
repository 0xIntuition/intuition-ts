import React from 'react'
import { render } from '@testing-library/react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from './NavigationMenu'

describe('NavigationMenu', () => {
  it('should render appropriate elements and classes for horizontal menu', () => {
    const { asFragment } = render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink>Link One</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Item Two</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink>Link Two</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Item Three
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <nav
          aria-label="Main"
          class="primary-gradient-subtle relative z-10 flex flex-1 items-center justify-center data-[orientation=horizontal]:max-w-max data-[orientation=vertical]:flex-col [&>div]:w-full"
          data-orientation="horizontal"
          dir="ltr"
        >
          <div
            style="position: relative;"
          >
            <ul
              class="group flex w-full flex-1 list-none items-center justify-center space-x-1 data-[orientation=vertical]:flex-col data-[orientation=vertical]:gap-1"
              data-orientation="horizontal"
              dir="ltr"
            >
              <li
                class="w-full"
              >
                <button
                  aria-controls="radix-:r0:-content-radix-:r1:"
                  aria-expanded="false"
                  class="bg-transparent hover:cursor-pointer group inline-flex h-10 w-full min-w-max data-[orientation=vertical]:justify-start data-[orientation=horizontal]:w-max items-center data-[orientation=horizontal]:justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent/30 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 group"
                  data-radix-collection-item=""
                  data-state="closed"
                  id="radix-:r0:-trigger-radix-:r1:"
                >
                  Item One 
                  <svg
                    aria-hidden="true"
                    class="lucide lucide-chevron-down relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
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
                    <path
                      d="m6 9 6 6 6-6"
                    />
                  </svg>
                </button>
              </li>
              <li
                class="w-full"
              >
                <button
                  aria-controls="radix-:r0:-content-radix-:r2:"
                  aria-expanded="false"
                  class="bg-transparent hover:cursor-pointer group inline-flex h-10 w-full min-w-max data-[orientation=vertical]:justify-start data-[orientation=horizontal]:w-max items-center data-[orientation=horizontal]:justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent/30 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 group"
                  data-radix-collection-item=""
                  data-state="closed"
                  id="radix-:r0:-trigger-radix-:r2:"
                >
                  Item Two 
                  <svg
                    aria-hidden="true"
                    class="lucide lucide-chevron-down relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
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
                    <path
                      d="m6 9 6 6 6-6"
                    />
                  </svg>
                </button>
              </li>
              <li
                class="w-full"
              >
                <a
                  class="bg-transparent hover:cursor-pointer group inline-flex h-10 w-full min-w-max data-[orientation=vertical]:justify-start data-[orientation=horizontal]:w-max items-center data-[orientation=horizontal]:justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent/30 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                  data-radix-collection-item=""
                >
                  Item Three
                </a>
              </li>
            </ul>
          </div>
          <div
            class="absolute left-0 top-full flex justify-center"
          />
        </nav>
      </DocumentFragment>
    `)
  })
  it('should render appropriate elements and classes for vertical menu', () => {
    const { asFragment } = render(
      <NavigationMenu orientation="vertical">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Item One
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Item Two
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Item Three
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <nav
          aria-label="Main"
          class="primary-gradient-subtle relative z-10 flex flex-1 items-center justify-center data-[orientation=horizontal]:max-w-max data-[orientation=vertical]:flex-col [&>div]:w-full"
          data-orientation="vertical"
          dir="ltr"
        >
          <div
            style="position: relative;"
          >
            <ul
              class="group flex w-full flex-1 list-none items-center justify-center space-x-1 data-[orientation=vertical]:flex-col data-[orientation=vertical]:gap-1"
              data-orientation="vertical"
              dir="ltr"
            >
              <li
                class="w-full"
              >
                <a
                  class="bg-transparent hover:cursor-pointer group inline-flex h-10 w-full min-w-max data-[orientation=vertical]:justify-start data-[orientation=horizontal]:w-max items-center data-[orientation=horizontal]:justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent/30 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                  data-radix-collection-item=""
                >
                  Item One
                </a>
              </li>
              <li
                class="w-full"
              >
                <a
                  class="bg-transparent hover:cursor-pointer group inline-flex h-10 w-full min-w-max data-[orientation=vertical]:justify-start data-[orientation=horizontal]:w-max items-center data-[orientation=horizontal]:justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent/30 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                  data-radix-collection-item=""
                >
                  Item Two
                </a>
              </li>
              <li
                class="w-full"
              >
                <a
                  class="bg-transparent hover:cursor-pointer group inline-flex h-10 w-full min-w-max data-[orientation=vertical]:justify-start data-[orientation=horizontal]:w-max items-center data-[orientation=horizontal]:justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent/30 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                  data-radix-collection-item=""
                >
                  Item Three
                </a>
              </li>
            </ul>
          </div>
          <div
            class="absolute left-0 top-full flex justify-center"
          />
        </nav>
      </DocumentFragment>
    `)
  })
})
