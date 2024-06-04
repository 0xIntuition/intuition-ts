import React from 'react'

import { render } from '@testing-library/react'

import { Input } from './Input'

describe('Input', () => {
  it('should render appropriate element', () => {
    const { asFragment } = render(<Input type="email" placeholder="Email" />)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <input
          class="flex h-10 w-full rounded-md border border-solid border-input/30 bg-primary/10 px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Email"
          type="email"
        />
      </DocumentFragment>
    `)
  })
})
