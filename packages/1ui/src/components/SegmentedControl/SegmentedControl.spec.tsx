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
        <div
          class="rounded-full border p-px border-solid border-border/30 primary-gradient-subtle"
          role="tablist"
        >
          <button
            aria-selected="true"
            class="rounded-full border border-solid border-transparent transition duration-300 ease-in-out hover:border-border/30 aria-selected:border-border/30 py-2 px-3 aria-selected:bg-background"
            role="tab"
          >
            One
          </button>
          <button
            class="rounded-full border border-solid border-transparent transition duration-300 ease-in-out hover:border-border/30 aria-selected:border-border/30 py-2 px-3 aria-selected:bg-background"
            role="tab"
          >
            Two
          </button>
        </div>
      </DocumentFragment>
    `)
  })
})
