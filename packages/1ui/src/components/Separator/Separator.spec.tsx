import React from 'react'

import { render } from '@testing-library/react'

import { Separator } from './Separator'

describe('Separator', () => {
  it('should render appropriate element when given no props', () => {
    const { asFragment } = render(<Separator />)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="shrink-0 bg-border/30 h-[1px] w-full"
          data-orientation="horizontal"
          role="none"
        />
      </DocumentFragment>
    `)
  })
  it('should render appropriate element when given vertical orientation prop', () => {
    const { asFragment } = render(<Separator orientation="vertical" />)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="shrink-0 bg-border/30 h-full w-[1px]"
          data-orientation="vertical"
          role="none"
        />
      </DocumentFragment>
    `)
  })
})
