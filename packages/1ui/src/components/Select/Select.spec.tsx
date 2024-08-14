import React from 'react'

import { render } from '@testing-library/react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './Select'

describe('Select', () => {
  it('should render appropriate element', () => {
    const { asFragment } = render(
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          aria-autocomplete="none"
          aria-controls="radix-:r0:"
          aria-expanded="false"
          class="flex h-10 items-center justify-between rounded-md theme-border primary-gradient-subtle px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 hover:bg-primary/5 w-[180px]"
          data-placeholder=""
          data-state="closed"
          dir="ltr"
          role="combobox"
          type="button"
        >
          <span
            style="pointer-events: none;"
          >
            Select a fruit
          </span>
          <svg
            class="h-4 w-4"
          >
            <use
              href="/src/components/Icon/Icon.sprites.svg#chevron-grabber-vertical"
            />
          </svg>
        </button>
      </DocumentFragment>
    `)
  })
})
