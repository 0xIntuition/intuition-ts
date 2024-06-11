import React from 'react'

import { render } from '@testing-library/react'

import { Identity } from './Identity'

describe('Identity', () => {
  it('should render appropriate element when given no props', () => {
    const { asFragment } = render(<Identity>something</Identity>)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          class="border border-solid border-border/20 font-medium py-1 px-2 hover:bg-primary/20 disabled:pointer-events-none flex gap-2 items-center text-base [&>span]:h-[1.375rem] [&>span]:w-[1.375rem]"
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
    const { asFragment } = render(<Identity disabled>something</Identity>)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          class="border border-solid border-border/20 font-medium py-1 px-2 hover:bg-primary/20 disabled:pointer-events-none flex gap-2 items-center text-base [&>span]:h-[1.375rem] [&>span]:w-[1.375rem]"
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
  it('should render appropriate element when given `user` variant', () => {
    const { asFragment } = render(
      <Identity
        variant="user"
        imgSrc="https://m.media-amazon.com/images/M/MV5BNDhiMWYzMjgtNTRiYi00ZTA3LThlODctNDRkMDk0NzFkMWI3L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNTg0MTkzMzA@._V1_.jpg"
      >
        something
      </Identity>,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          class="border border-solid border-border/20 font-medium py-1 px-2 hover:bg-primary/20 disabled:pointer-events-none flex gap-2 items-center rounded-full [&>span]:rounded-full [&>span]:overflow-hidden text-base [&>span]:h-[1.375rem] [&>span]:w-[1.375rem]"
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
    const { asFragment } = render(<Identity size="sm">something</Identity>)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          class="border border-solid border-border/20 font-medium py-1 px-2 hover:bg-primary/20 disabled:pointer-events-none flex gap-2 items-center text-sm [&>span]:h-4 [&>span]:w-4"
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
    const { asFragment } = render(<Identity size="md">something</Identity>)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          class="border border-solid border-border/20 font-medium py-1 px-2 hover:bg-primary/20 disabled:pointer-events-none flex gap-2 items-center text-lg [&>span]:h-6 [&>span]:w-6"
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
    const { asFragment } = render(<Identity size="lg">something</Identity>)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          class="border border-solid border-border/20 font-medium py-1 px-2 hover:bg-primary/20 disabled:pointer-events-none flex gap-2 items-center text-xl [&>span]:h-8 [&>span]:w-8"
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
    const { asFragment } = render(<Identity size="xl">something</Identity>)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          class="border border-solid border-border/20 font-medium py-1 px-2 hover:bg-primary/20 disabled:pointer-events-none flex gap-2 items-center text-2xl [&>span]:h-10 [&>span]:w-10"
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
