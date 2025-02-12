import { render } from '@testing-library/react'
import { Home } from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from './Sidebar'

describe('Sidebar', () => {
  it('should render appropriate element', () => {
    const { asFragment } = render(
      <SidebarProvider>
        <Sidebar>
          <SidebarContent>
            <SidebarHeader>
              <h2>Navigation</h2>
            </SidebarHeader>
            <SidebarGroup>
              <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Home />
                      <span>Home</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar"
          style="--sidebar-width: 16rem; --sidebar-width-icon: 3rem;"
        >
          <div
            class="group peer hidden md:block text-sidebar-foreground"
            data-collapsible=""
            data-side="left"
            data-state="expanded"
            data-variant="sidebar"
          >
            <div
              class="duration-200 relative h-svh w-[--sidebar-width] bg-transparent transition-[width] ease-linear group-data-[collapsible=offcanvas]:w-0 group-data-[side=right]:rotate-180 group-data-[collapsible=icon]:w-[--sidebar-width-icon]"
            />
            <div
              class="duration-200 fixed inset-y-0 z-10 hidden h-svh w-[--sidebar-width] transition-[left,right,width] ease-linear md:flex left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)] group-data-[collapsible=icon]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l"
            >
              <div
                class="flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow"
                data-sidebar="sidebar"
              >
                <div
                  class="flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden"
                  data-sidebar="content"
                >
                  <div
                    class="flex flex-col gap-2 p-2"
                    data-sidebar="header"
                  >
                    <h2>
                      Navigation
                    </h2>
                  </div>
                  <div
                    class="relative flex w-full min-w-0 flex-col p-2"
                    data-sidebar="group"
                  >
                    <div
                      class="duration-200 flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opa] ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0 group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0"
                      data-sidebar="group-label"
                    >
                      Main Menu
                    </div>
                    <div
                      class="w-full text-sm"
                      data-sidebar="group-content"
                    >
                      <ul
                        class="flex w-full min-w-0 flex-col gap-1"
                        data-sidebar="menu"
                      >
                        <li
                          class="group/menu-item relative"
                          data-sidebar="menu-item"
                        >
                          <button
                            class="peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left outline-none ring-sidebar-ring transition-[width,height,padding] focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground h-8 text-sm"
                            data-active="false"
                            data-sidebar="menu-button"
                            data-size="default"
                          >
                            <svg
                              class="lucide lucide-house"
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
                                d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"
                              />
                              <path
                                d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                              />
                            </svg>
                            <span>
                              Home
                            </span>
                          </button>
                        </li>
                      </ul>
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

  it('should render with collapsible mode', () => {
    const { asFragment } = render(
      <SidebarProvider>
        <Sidebar collapsible="icon">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Home">
                      <Home />
                      <span>Home</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar"
          style="--sidebar-width: 16rem; --sidebar-width-icon: 3rem;"
        >
          <div
            class="group peer hidden md:block text-sidebar-foreground"
            data-collapsible=""
            data-side="left"
            data-state="expanded"
            data-variant="sidebar"
          >
            <div
              class="duration-200 relative h-svh w-[--sidebar-width] bg-transparent transition-[width] ease-linear group-data-[collapsible=offcanvas]:w-0 group-data-[side=right]:rotate-180 group-data-[collapsible=icon]:w-[--sidebar-width-icon]"
            />
            <div
              class="duration-200 fixed inset-y-0 z-10 hidden h-svh w-[--sidebar-width] transition-[left,right,width] ease-linear md:flex left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)] group-data-[collapsible=icon]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l"
            >
              <div
                class="flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow"
                data-sidebar="sidebar"
              >
                <div
                  class="flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden"
                  data-sidebar="content"
                >
                  <div
                    class="relative flex w-full min-w-0 flex-col p-2"
                    data-sidebar="group"
                  >
                    <div
                      class="w-full text-sm"
                      data-sidebar="group-content"
                    >
                      <ul
                        class="flex w-full min-w-0 flex-col gap-1"
                        data-sidebar="menu"
                      >
                        <li
                          class="group/menu-item relative"
                          data-sidebar="menu-item"
                        >
                          <button
                            class="peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left outline-none ring-sidebar-ring transition-[width,height,padding] focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground h-8 text-sm"
                            data-active="false"
                            data-sidebar="menu-button"
                            data-size="default"
                            data-state="closed"
                          >
                            <svg
                              class="lucide lucide-house"
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
                                d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"
                              />
                              <path
                                d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                              />
                            </svg>
                            <span>
                              Home
                            </span>
                          </button>
                        </li>
                      </ul>
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
