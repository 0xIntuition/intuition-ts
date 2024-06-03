import React from 'react'

import { render } from '@testing-library/react'

import { Switch } from './Switch'

describe('Switch', () => {
  it('should render appropriate element', () => {
    const { asFragment } = render(<Switch />)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          aria-checked="false"
          class="peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-primary/40"
          data-state="unchecked"
          role="switch"
          type="button"
          value="on"
        >
          <span
            class="pointer-events-none block h-5 w-5 rounded-full bg-primary shadow-lg ring-0 transition-transform data-[state=checked]:bg-background data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-1"
            data-state="unchecked"
          />
        </button>
      </DocumentFragment>
    `)
  })
})
