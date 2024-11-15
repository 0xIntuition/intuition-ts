import React from 'react'

import { render } from '@testing-library/react'

import { IdentityTag } from './IdentityTag'

describe('Identity', () => {
  it('should render appropriate element when given no props', () => {
    const { asFragment } = render(<IdentityTag>something</IdentityTag>)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          class="theme-border font-medium py-0.5 pl-0.5 pr-2 hover:bg-primary/10 disabled:pointer-events-none flex gap-2 items-center text-secondary/70 hover:text-secondary rounded-full [&>span]:rounded-full [&>span]:overflow-hidden text-base [&>span]:h-6 [&>span]:w-6"
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
          something
        </button>
      </DocumentFragment>
    `)
  })
  it('should render appropriate element when disabled', () => {
    const { asFragment } = render(<IdentityTag disabled>something</IdentityTag>)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          class="theme-border font-medium py-0.5 pl-0.5 pr-2 hover:bg-primary/10 disabled:pointer-events-none flex gap-2 items-center text-secondary/70 hover:text-secondary rounded-full [&>span]:rounded-full [&>span]:overflow-hidden text-base [&>span]:h-6 [&>span]:w-6 disabled:opacity-50 cursor-not-allowed"
          disabled=""
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
          something
        </button>
      </DocumentFragment>
    `)
  })
  it('should render appropriate element when given `non-user` variant', () => {
    const { asFragment } = render(
      <IdentityTag
        variant="non-user"
        imgSrc="https://m.media-amazon.com/images/M/MV5BNDhiMWYzMjgtNTRiYi00ZTA3LThlODctNDRkMDk0NzFkMWI3L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNTg0MTkzMzA@._V1_.jpg"
      >
        something
      </IdentityTag>,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          class="theme-border font-medium py-0.5 pl-0.5 pr-2 hover:bg-primary/10 disabled:pointer-events-none flex gap-2 items-center text-secondary/70 hover:text-secondary rounded-md text-base [&>span]:h-6 [&>span]:w-6"
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
          something
        </button>
      </DocumentFragment>
    `)
  })
  it('should render appropriate element when given `md` size', () => {
    const { asFragment } = render(
      <IdentityTag size="md">something</IdentityTag>,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          class="theme-border font-medium py-0.5 pl-0.5 pr-2 hover:bg-primary/10 disabled:pointer-events-none flex gap-2 items-center text-secondary/70 hover:text-secondary rounded-full [&>span]:rounded-full [&>span]:overflow-hidden text-base [&>span]:h-7 [&>span]:w-7"
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
          something
        </button>
      </DocumentFragment>
    `)
  })
  it('should render appropriate element when given `md` size', () => {
    const { asFragment } = render(
      <IdentityTag size="md">something</IdentityTag>,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          class="theme-border font-medium py-0.5 pl-0.5 pr-2 hover:bg-primary/10 disabled:pointer-events-none flex gap-2 items-center text-secondary/70 hover:text-secondary rounded-full [&>span]:rounded-full [&>span]:overflow-hidden text-base [&>span]:h-7 [&>span]:w-7"
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
          something
        </button>
      </DocumentFragment>
    `)
  })
  it('should render appropriate element when given `lg` size', () => {
    const { asFragment } = render(
      <IdentityTag size="lg">something</IdentityTag>,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
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
          something
        </button>
      </DocumentFragment>
    `)
  })
  it('should render appropriate element when given `xl` size', () => {
    const { asFragment } = render(
      <IdentityTag size="xl">something</IdentityTag>,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          class="theme-border font-medium py-0.5 pl-0.5 pr-2 hover:bg-primary/10 disabled:pointer-events-none flex gap-2 items-center text-secondary/70 hover:text-secondary rounded-full [&>span]:rounded-full [&>span]:overflow-hidden text-xl [&>span]:h-11 [&>span]:w-11"
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
          something
        </button>
      </DocumentFragment>
    `)
  })
  it('should render appropriate element when given hoverCardContent', () => {
    const { asFragment } = render(
      <IdentityTag hoverCardContent={<div>test</div>}>something</IdentityTag>,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <a
          data-state="closed"
        >
          <button
            class="theme-border font-medium py-0.5 pl-0.5 pr-2 hover:bg-primary/10 disabled:pointer-events-none flex gap-2 items-center text-secondary/70 hover:text-secondary rounded-full [&>span]:rounded-full [&>span]:overflow-hidden text-base [&>span]:h-6 [&>span]:w-6"
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
            something
          </button>
        </a>
      </DocumentFragment>
    `)
  })
})
