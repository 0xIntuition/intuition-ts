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
          class="rounded-full flex border border-border/30 primary-gradient-subtle items-center"
          role="tablist"
        >
          <li>
            <a
              aria-selected="true"
              class="rounded-full border border-transparent transition duration-300 ease-in-out hover:border-border/30 aria-selected:border-border/30 py-2 px-3 aria-selected:bg-background"
              role="tab"
            >
              One
            </a>
          </li>
          <li>
            <a
              class="rounded-full border border-transparent transition duration-300 ease-in-out hover:border-border/30 aria-selected:border-border/30 py-2 px-3 aria-selected:bg-background"
              role="tab"
            >
              Two
            </a>
          </li>
        </ul>
      </DocumentFragment>
    `)
  })
})
