import React from 'react'

import { render } from '@testing-library/react'

import { SegmentedControl, SegmentedControlItem } from './SegmentedControl'

describe('SegmentedControl', () => {
  it('should render appropriate element', () => {
    const { asFragment } = render(
      <SegmentedControl>
        <SegmentedControlItem isActive>One</SegmentedControlItem>
        <SegmentedControlItem>Two</SegmentedControlItem>
      </SegmentedControl>,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <ul
          class="rounded-full flex items-center gap-1 border p-px border-border/20 primary-gradient-subtle max-sm:overflow-x-auto max-sm:rounded-lg max-sm:p-3"
          role="tablist"
        >
          <li>
            <button
              aria-selected="true"
              class="rounded-full border border-transparent transition duration-300 ease-in-out hover:border-border/30 aria-selected:border-border/30 py-1 px-3 aria-selected:bg-background text-base max-sm:text-nowrap"
              role="tab"
            >
              One
            </button>
          </li>
          <li>
            <button
              class="rounded-full border border-transparent transition duration-300 ease-in-out hover:border-border/30 aria-selected:border-border/30 py-1 px-3 aria-selected:bg-background text-base max-sm:text-nowrap"
              role="tab"
            >
              Two
            </button>
          </li>
        </ul>
      </DocumentFragment>
    `)
  })
})
