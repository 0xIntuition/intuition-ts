import React from 'react'

import { render } from '@testing-library/react'

import { AppSidebar } from './AppSidebar'

describe('AppSidebar', () => {
  it('should render basic sidebar', () => {
    const { asFragment } = render(
      <AppSidebar
        user={{
          name: 'jojikun.eth',
          avatar: 'https://github.com/shadcn.png',
        }}
        activeItem="Network"
      />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar"
          style="--sidebar-width: 16rem; --sidebar-width-icon: 3rem;"
        >
          <div
            class="group peer hidden md:block"
            data-collapsible=""
            data-side="left"
            data-state="expanded"
            data-variant="sidebar"
          >
            <div
              class="duration-200 fixed inset-y-0 z-10 hidden h-svh w-[--sidebar-width] transition-[left,right,width] ease-linear md:flex bg-[#0D0D0D] text-white/80 left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)] group-data-[collapsible=icon]:w-[--sidebar-width-icon] border-r border-border/10"
            >
              <div
                class="flex h-full w-full flex-col"
                data-sidebar="sidebar"
              >
                <div
                  class="flex flex-col gap-2 p-2 px-2 py-3"
                  data-sidebar="header"
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
                        aria-expanded="false"
                        aria-haspopup="menu"
                        class="flex items-center rounded-md px-3 py-2 text-sm font-medium outline-none transition-colors text-white/80 hover:bg-white/5 w-full gap-3"
                        data-active="false"
                        data-sidebar="menu-button"
                        data-size="lg"
                        data-state="closed"
                        id="radix-:r0:"
                        type="button"
                      >
                        <span
                          class="relative flex shrink-0 overflow-hidden aspect-square bg-background theme-border rounded-full h-8 w-8 border border-border/10"
                        >
                          <span
                            class="flex h-full w-full items-center justify-center bg-inherit"
                          >
                            <svg
                              class="text-primary/30 w-[80%] h-[80%]"
                            >
                              <use
                                href="/src/components/Icon/Icon.sprites.svg#crypto-punk"
                              />
                            </svg>
                          </span>
                        </span>
                        <div
                          class="flex flex-1 items-center justify-between"
                        >
                          <span
                            class="text-sm font-medium"
                          >
                            jojikun.eth
                          </span>
                          <svg
                            class="lucide lucide-ellipsis-vertical h-4 w-4 text-muted-foreground/70"
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
                              cx="12"
                              cy="12"
                              r="1"
                            />
                            <circle
                              cx="12"
                              cy="5"
                              r="1"
                            />
                            <circle
                              cx="12"
                              cy="19"
                              r="1"
                            />
                          </svg>
                        </div>
                      </button>
                    </li>
                  </ul>
                </div>
                <div
                  class="min-h-0 flex-1 gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden flex flex-col justify-between"
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
                          <a
                            class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium outline-none transition-colors text-white/80 hover:bg-white/5 flex items-center gap-3"
                            data-active="false"
                            data-sidebar="menu-button"
                            data-size="default"
                            href="/#"
                          >
                            <svg
                              class="lucide lucide-house h-4 w-4"
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
                          </a>
                        </li>
                        <li
                          class="group/menu-item relative"
                          data-sidebar="menu-item"
                        >
                          <a
                            class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium outline-none transition-colors text-white/80 hover:bg-white/5 flex items-center gap-3"
                            data-active="false"
                            data-sidebar="menu-button"
                            data-size="default"
                            href="/#"
                          >
                            <svg
                              class="lucide lucide-layout-grid h-4 w-4"
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
                              <rect
                                height="7"
                                rx="1"
                                width="7"
                                x="3"
                                y="3"
                              />
                              <rect
                                height="7"
                                rx="1"
                                width="7"
                                x="14"
                                y="3"
                              />
                              <rect
                                height="7"
                                rx="1"
                                width="7"
                                x="14"
                                y="14"
                              />
                              <rect
                                height="7"
                                rx="1"
                                width="7"
                                x="3"
                                y="14"
                              />
                            </svg>
                            <span>
                              Dashboard
                            </span>
                          </a>
                        </li>
                        <li
                          class="group/menu-item relative"
                          data-sidebar="menu-item"
                        >
                          <a
                            class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium outline-none transition-colors text-white/80 hover:bg-white/5 flex items-center gap-3"
                            data-active="false"
                            data-sidebar="menu-button"
                            data-size="default"
                            href="/#"
                          >
                            <svg
                              class="lucide lucide-globe h-4 w-4"
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
                                cx="12"
                                cy="12"
                                r="10"
                              />
                              <path
                                d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"
                              />
                              <path
                                d="M2 12h20"
                              />
                            </svg>
                            <span>
                              Discover
                            </span>
                          </a>
                        </li>
                        <li
                          class="group/menu-item relative"
                          data-sidebar="menu-item"
                        >
                          <a
                            class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium outline-none transition-colors hover:bg-white/5 bg-white/10 text-accent flex items-center gap-3"
                            data-active="true"
                            data-sidebar="menu-button"
                            data-size="default"
                            href="/#"
                          >
                            <svg
                              class="lucide lucide-activity h-4 w-4"
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
                                d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"
                              />
                            </svg>
                            <span>
                              Network
                            </span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
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
                          <a
                            class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium outline-none transition-colors text-white/80 hover:bg-white/5 flex items-center gap-3"
                            data-active="false"
                            data-sidebar="menu-button"
                            data-size="default"
                            href="/#"
                          >
                            <svg
                              class="lucide lucide-file-text h-4 w-4"
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
                                d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"
                              />
                              <path
                                d="M14 2v4a2 2 0 0 0 2 2h4"
                              />
                              <path
                                d="M10 9H8"
                              />
                              <path
                                d="M16 13H8"
                              />
                              <path
                                d="M16 17H8"
                              />
                            </svg>
                            <span>
                              Developer Docs
                            </span>
                          </a>
                        </li>
                        <li
                          class="group/menu-item relative"
                          data-sidebar="menu-item"
                        >
                          <a
                            class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium outline-none transition-colors text-white/80 hover:bg-white/5 flex items-center gap-3"
                            data-active="false"
                            data-sidebar="menu-button"
                            data-size="default"
                            href="/#"
                          >
                            <svg
                              class="lucide lucide-github h-4 w-4"
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
                                d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
                              />
                              <path
                                d="M9 18c-4.51 2-5-2-7-2"
                              />
                            </svg>
                            <span>
                              Github
                            </span>
                          </a>
                        </li>
                        <li
                          class="group/menu-item relative"
                          data-sidebar="menu-item"
                        >
                          <a
                            class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium outline-none transition-colors text-white/80 hover:bg-white/5 flex items-center gap-3"
                            data-active="false"
                            data-sidebar="menu-button"
                            data-size="default"
                            href="/#"
                          >
                            <svg
                              class="lucide lucide-upload h-4 w-4"
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
                                d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
                              />
                              <polyline
                                points="17 8 12 3 7 8"
                              />
                              <line
                                x1="12"
                                x2="12"
                                y1="3"
                                y2="15"
                              />
                            </svg>
                            <span>
                              Bulk Uploader
                            </span>
                          </a>
                        </li>
                        <li
                          class="group/menu-item relative"
                          data-sidebar="menu-item"
                        >
                          <a
                            class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium outline-none transition-colors text-white/80 hover:bg-white/5 flex items-center gap-3"
                            data-active="false"
                            data-sidebar="menu-button"
                            data-size="default"
                            href="/#"
                          >
                            <svg
                              class="lucide lucide-circle h-4 w-4"
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
                                cx="12"
                                cy="12"
                                r="10"
                              />
                            </svg>
                            <span>
                              Ecosystem
                            </span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <button
                  aria-label="Toggle Sidebar"
                  class="absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex [[data-side=left]_&]:cursor-w-resize [[data-side=right]_&]:cursor-e-resize [[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full group-data-[collapsible=offcanvas]:hover:bg-sidebar [[data-side=left][data-collapsible=offcanvas]_&]:-right-2 [[data-side=right][data-collapsible=offcanvas]_&]:-left-2"
                  data-sidebar="rail"
                  tabindex="-1"
                  title="Toggle Sidebar"
                />
              </div>
            </div>
          </div>
        </div>
      </DocumentFragment>
    `)
  })

  it('should render minimal variant', () => {
    const { asFragment } = render(
      <AppSidebar
        variant="minimal"
        user={{
          name: 'jojikun.eth',
          avatar: 'https://github.com/shadcn.png',
        }}
        activeItem="Network"
      />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar"
          style="--sidebar-width: 16rem; --sidebar-width-icon: 3rem;"
        >
          <div
            class="group peer hidden md:block"
            data-collapsible=""
            data-side="left"
            data-state="expanded"
            data-variant="sidebar"
          >
            <div
              class="duration-200 fixed inset-y-0 z-10 hidden h-svh w-[--sidebar-width] transition-[left,right,width] ease-linear md:flex bg-[#0D0D0D] text-white/80 left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)] group-data-[collapsible=icon]:w-[--sidebar-width-icon] border-r border-border/10"
            >
              <div
                class="flex h-full w-full flex-col"
                data-sidebar="sidebar"
              >
                <div
                  class="flex flex-col gap-2 p-2 px-2 py-3"
                  data-sidebar="header"
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
                        aria-expanded="false"
                        aria-haspopup="menu"
                        class="flex items-center rounded-md px-3 py-2 text-sm font-medium outline-none transition-colors text-white/80 hover:bg-white/5 w-full gap-3"
                        data-active="false"
                        data-sidebar="menu-button"
                        data-size="lg"
                        data-state="closed"
                        id="radix-:r2:"
                        type="button"
                      >
                        <span
                          class="relative flex shrink-0 overflow-hidden aspect-square bg-background theme-border rounded-full h-8 w-8 border border-border/10"
                        >
                          <span
                            class="flex h-full w-full items-center justify-center bg-inherit"
                          >
                            <svg
                              class="text-primary/30 w-[80%] h-[80%]"
                            >
                              <use
                                href="/src/components/Icon/Icon.sprites.svg#crypto-punk"
                              />
                            </svg>
                          </span>
                        </span>
                      </button>
                    </li>
                  </ul>
                </div>
                <div
                  class="min-h-0 flex-1 gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden flex flex-col justify-between"
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
                          <a
                            class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium outline-none transition-colors text-white/80 hover:bg-white/5 flex items-center gap-3"
                            data-active="false"
                            data-sidebar="menu-button"
                            data-size="default"
                            href="/#"
                          >
                            <svg
                              class="lucide lucide-house h-4 w-4"
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
                          </a>
                        </li>
                        <li
                          class="group/menu-item relative"
                          data-sidebar="menu-item"
                        >
                          <a
                            class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium outline-none transition-colors text-white/80 hover:bg-white/5 flex items-center gap-3"
                            data-active="false"
                            data-sidebar="menu-button"
                            data-size="default"
                            href="/#"
                          >
                            <svg
                              class="lucide lucide-layout-grid h-4 w-4"
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
                              <rect
                                height="7"
                                rx="1"
                                width="7"
                                x="3"
                                y="3"
                              />
                              <rect
                                height="7"
                                rx="1"
                                width="7"
                                x="14"
                                y="3"
                              />
                              <rect
                                height="7"
                                rx="1"
                                width="7"
                                x="14"
                                y="14"
                              />
                              <rect
                                height="7"
                                rx="1"
                                width="7"
                                x="3"
                                y="14"
                              />
                            </svg>
                          </a>
                        </li>
                        <li
                          class="group/menu-item relative"
                          data-sidebar="menu-item"
                        >
                          <a
                            class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium outline-none transition-colors text-white/80 hover:bg-white/5 flex items-center gap-3"
                            data-active="false"
                            data-sidebar="menu-button"
                            data-size="default"
                            href="/#"
                          >
                            <svg
                              class="lucide lucide-globe h-4 w-4"
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
                                cx="12"
                                cy="12"
                                r="10"
                              />
                              <path
                                d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"
                              />
                              <path
                                d="M2 12h20"
                              />
                            </svg>
                          </a>
                        </li>
                        <li
                          class="group/menu-item relative"
                          data-sidebar="menu-item"
                        >
                          <a
                            class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium outline-none transition-colors hover:bg-white/5 bg-white/10 text-accent flex items-center gap-3"
                            data-active="true"
                            data-sidebar="menu-button"
                            data-size="default"
                            href="/#"
                          >
                            <svg
                              class="lucide lucide-activity h-4 w-4"
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
                                d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"
                              />
                            </svg>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
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
                          <a
                            class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium outline-none transition-colors text-white/80 hover:bg-white/5 flex items-center gap-3"
                            data-active="false"
                            data-sidebar="menu-button"
                            data-size="default"
                            href="/#"
                          >
                            <svg
                              class="lucide lucide-file-text h-4 w-4"
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
                                d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"
                              />
                              <path
                                d="M14 2v4a2 2 0 0 0 2 2h4"
                              />
                              <path
                                d="M10 9H8"
                              />
                              <path
                                d="M16 13H8"
                              />
                              <path
                                d="M16 17H8"
                              />
                            </svg>
                          </a>
                        </li>
                        <li
                          class="group/menu-item relative"
                          data-sidebar="menu-item"
                        >
                          <a
                            class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium outline-none transition-colors text-white/80 hover:bg-white/5 flex items-center gap-3"
                            data-active="false"
                            data-sidebar="menu-button"
                            data-size="default"
                            href="/#"
                          >
                            <svg
                              class="lucide lucide-github h-4 w-4"
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
                                d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
                              />
                              <path
                                d="M9 18c-4.51 2-5-2-7-2"
                              />
                            </svg>
                          </a>
                        </li>
                        <li
                          class="group/menu-item relative"
                          data-sidebar="menu-item"
                        >
                          <a
                            class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium outline-none transition-colors text-white/80 hover:bg-white/5 flex items-center gap-3"
                            data-active="false"
                            data-sidebar="menu-button"
                            data-size="default"
                            href="/#"
                          >
                            <svg
                              class="lucide lucide-upload h-4 w-4"
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
                                d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
                              />
                              <polyline
                                points="17 8 12 3 7 8"
                              />
                              <line
                                x1="12"
                                x2="12"
                                y1="3"
                                y2="15"
                              />
                            </svg>
                          </a>
                        </li>
                        <li
                          class="group/menu-item relative"
                          data-sidebar="menu-item"
                        >
                          <a
                            class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium outline-none transition-colors text-white/80 hover:bg-white/5 flex items-center gap-3"
                            data-active="false"
                            data-sidebar="menu-button"
                            data-size="default"
                            href="/#"
                          >
                            <svg
                              class="lucide lucide-circle h-4 w-4"
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
                                cx="12"
                                cy="12"
                                r="10"
                              />
                            </svg>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <button
                  aria-label="Toggle Sidebar"
                  class="absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex [[data-side=left]_&]:cursor-w-resize [[data-side=right]_&]:cursor-e-resize [[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full group-data-[collapsible=offcanvas]:hover:bg-sidebar [[data-side=left][data-collapsible=offcanvas]_&]:-right-2 [[data-side=right][data-collapsible=offcanvas]_&]:-left-2"
                  data-sidebar="rail"
                  tabindex="-1"
                  title="Toggle Sidebar"
                />
              </div>
            </div>
          </div>
        </div>
      </DocumentFragment>
    `)
  })
})
