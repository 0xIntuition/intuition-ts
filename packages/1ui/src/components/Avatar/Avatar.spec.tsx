import React from 'react'

import { render } from '@testing-library/react'

import { Avatar } from './Avatar'

describe('Avatar', () => {
  it('should render appropriate elements when given no variant', () => {
    const { asFragment } = render(<Avatar name="Test" />)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <span
          class="relative flex h-10 w-10 shrink-0 overflow-hidden aspect-square bg-background theme-border rounded-full"
        >
          <span
            class="flex h-full w-full items-center justify-center bg-inherit"
          >
            <svg
              class="text-primary/30 w-1/2 h-1/2 max-h-10 max-w-10"
            >
              <use
                href="/src/components/Icon/Icon.sprites.svg#crypto-punk"
              />
            </svg>
          </span>
        </span>
      </DocumentFragment>
    `)
  })
  it('should render appropriate elements when given `entity` variant', () => {
    const { asFragment } = render(<Avatar variant="non-user" name="Test" />)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <span
          class="relative flex h-10 w-10 shrink-0 overflow-hidden aspect-square bg-background theme-border rounded"
        >
          <span
            class="flex h-full w-full items-center justify-center bg-inherit"
          >
            <svg
              class="text-primary/30 w-1/2 h-1/2 max-h-10 max-w-10"
            >
              <use
                href="/src/components/Icon/Icon.sprites.svg#fingerprint"
              />
            </svg>
          </span>
        </span>
      </DocumentFragment>
    `)
  })
})
