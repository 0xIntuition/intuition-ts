import React from 'react'

import { render } from '@testing-library/react'

import { IdentityTag } from './IdentityTag'

describe('Identity', () => {
  it('should render appropriate element when given no props', () => {
    const { asFragment } = render(<IdentityTag>something</IdentityTag>)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          class="border border-border/20 font-medium py-1 px-2 hover:bg-primary/20 disabled:pointer-events-none flex gap-2 items-center rounded-full [&>span]:rounded-full [&>span]:overflow-hidden text-sm [&>span]:h-4 [&>span]:w-4"
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
          class="border border-border/20 font-medium py-1 px-2 hover:bg-primary/20 disabled:pointer-events-none flex gap-2 items-center rounded-full [&>span]:rounded-full [&>span]:overflow-hidden text-sm [&>span]:h-4 [&>span]:w-4 disabled:bg-muted disabled:text-muted-foreground disabled:border-muted cursor-not-allowed"
          disabled=""
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
          class="border border-border/20 font-medium py-1 px-2 hover:bg-primary/20 disabled:pointer-events-none flex gap-2 items-center text-sm [&>span]:h-4 [&>span]:w-4"
        >
          <span>
            <img
              alt="identity avatar"
              class="h-full w-full rounded-full"
              src="https://m.media-amazon.com/images/M/MV5BNDhiMWYzMjgtNTRiYi00ZTA3LThlODctNDRkMDk0NzFkMWI3L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNTg0MTkzMzA@._V1_.jpg"
            />
          </span>
          something
        </button>
      </DocumentFragment>
    `)
  })
  it('should render appropriate element when given `sm` size', () => {
    const { asFragment } = render(
      <IdentityTag size="sm">something</IdentityTag>,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          class="border border-border/20 font-medium py-1 px-2 hover:bg-primary/20 disabled:pointer-events-none flex gap-2 items-center rounded-full [&>span]:rounded-full [&>span]:overflow-hidden text-base [&>span]:h-[1.375rem] [&>span]:w-[1.375rem]"
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
          class="border border-border/20 font-medium py-1 px-2 hover:bg-primary/20 disabled:pointer-events-none flex gap-2 items-center rounded-full [&>span]:rounded-full [&>span]:overflow-hidden text-lg [&>span]:h-6 [&>span]:w-6"
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
          class="border border-border/20 font-medium py-1 px-2 hover:bg-primary/20 disabled:pointer-events-none flex gap-2 items-center rounded-full [&>span]:rounded-full [&>span]:overflow-hidden text-xl [&>span]:h-8 [&>span]:w-8"
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
          something
        </button>
      </DocumentFragment>
    `)
  })
  it('should render appropriate element when given `xl` size', () => {
    const { asFragment } = render(
      <IdentityTag size="lg">something</IdentityTag>,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          class="border border-border/20 font-medium py-1 px-2 hover:bg-primary/20 disabled:pointer-events-none flex gap-2 items-center rounded-full [&>span]:rounded-full [&>span]:overflow-hidden text-xl [&>span]:h-8 [&>span]:w-8"
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
          something
        </button>
      </DocumentFragment>
    `)
  })
})
