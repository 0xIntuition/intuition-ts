import React from 'react'

import { render } from '@testing-library/react'

import { Avatar } from './Avatar'

describe('Avatar', () => {
  it('should render appropriate elements when given no variant', () => {
    const { asFragment } = render(<Avatar name="Test" />)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <span
          class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-muted"
        >
          <span
            class="flex h-full w-full items-center justify-center bg-inherit"
          >
            TE
          </span>
        </span>
      </DocumentFragment>
    `)
  })
  it('should render appropriate elements when given `entity` variant', () => {
    const { asFragment } = render(<Avatar variant="entity" name="Test" />)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <span
          class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full"
        >
          <span
            class="flex h-full w-full items-center justify-center bg-inherit"
          >
            TE
          </span>
        </span>
      </DocumentFragment>
    `)
  })
})
