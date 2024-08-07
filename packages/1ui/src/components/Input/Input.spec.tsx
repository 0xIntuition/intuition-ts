import React from 'react'

import { render } from '@testing-library/react'

import { Input } from './Input'

describe('Input', () => {
  it('should render appropriate element', () => {
    const { asFragment } = render(<Input type="email" placeholder="Email" />)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex justify-between gap-2 items-center h-10 px-3 bg-primary/10 theme-border rounded-md text-base"
        >
          <input
            class="flex w-full px-2 bg-transparent ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-none disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Email"
            type="email"
          />
        </div>
      </DocumentFragment>
    `)
  })
  it('should render appropriate element with given `startAdornment` icon name value', () => {
    const { asFragment } = render(
      <Input
        type="text"
        placeholder="Search"
        startAdornment="magnifying-glass"
      />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex justify-between gap-2 items-center h-10 px-3 bg-primary/10 theme-border rounded-md text-base"
        >
          <svg
            class="h-6 w-6 text-secondary-foreground/80"
          >
            <use
              href="/src/components/Icon/Icon.sprites.svg#magnifying-glass"
            />
          </svg>
          <input
            class="flex w-full px-2 bg-transparent ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-none disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Search"
            type="text"
          />
        </div>
      </DocumentFragment>
    `)
  })
  it('should render appropriate element with given `startAdornment` string value', () => {
    const { asFragment } = render(
      <Input
        type="text"
        placeholder="Enter website"
        startAdornment="http://"
      />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex justify-between gap-2 items-center h-10 px-3 bg-primary/10 theme-border rounded-md text-base"
        >
          <div
            class="border-0 border-border/10 py-2 min-w-16 border-r"
          >
            <p
              class="text-base font-medium text-secondary-foreground/80"
            >
              http://
            </p>
          </div>
          <input
            class="flex w-full px-2 bg-transparent ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-none disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Enter website"
            type="text"
          />
        </div>
      </DocumentFragment>
    `)
  })
  it('should render appropriate element with given `endAdornment` icon name value', () => {
    const { asFragment } = render(
      <Input type="number" placeholder="Enter value" endAdornment="etherium" />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex justify-between gap-2 items-center h-10 px-3 bg-primary/10 theme-border rounded-md text-base"
        >
          <input
            class="flex w-full px-2 bg-transparent ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-none disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Enter value"
            type="number"
          />
          <div
            class="border-0 border-border/10 py-2 min-w-16 border-l text-right"
          >
            <p
              class="text-base font-medium text-secondary-foreground/80"
            >
              etherium
            </p>
          </div>
        </div>
      </DocumentFragment>
    `)
  })
  it('should render appropriate element with given `endAdornment` string value', () => {
    const { asFragment } = render(
      <Input type="text" placeholder="Enter website" endAdornment=".com" />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex justify-between gap-2 items-center h-10 px-3 bg-primary/10 theme-border rounded-md text-base"
        >
          <input
            class="flex w-full px-2 bg-transparent ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-none disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Enter website"
            type="text"
          />
          <div
            class="border-0 border-border/10 py-2 min-w-16 border-l text-right"
          >
            <p
              class="text-base font-medium text-secondary-foreground/80"
            >
              .com
            </p>
          </div>
        </div>
      </DocumentFragment>
    `)
  })
})
