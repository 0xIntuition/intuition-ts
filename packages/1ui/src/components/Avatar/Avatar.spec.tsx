import React from 'react'

import { render } from '@testing-library/react'

import { Avatar } from './Avatar'

describe('Avatar', () => {
  it('should render appropriate elements when given no variant', () => {
    const { asFragment } = render(
      <Avatar
        src="https://avatars.githubusercontent.com/u/94311139?s=200&v=4"
        name="Test"
      />,
    )
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
    const { asFragment } = render(
      <Avatar
        variant="entity"
        src="https://avatars.githubusercontent.com/u/94311139?s=200&v=4"
        name="Test"
      />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <span
          class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded bg-background border border-border/30"
        >
          <span
            class="flex h-full w-full items-center justify-center bg-inherit"
          >
            <svg
              class="h-6 w-6 text-primary/30"
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
  it('should render appropriate fallback elements when given no variant', () => {
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
  it('should render appropriate fallback elements when given `entity` variant', () => {
    const { asFragment } = render(<Avatar variant="entity" name="Test" />)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <span
          class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded bg-background border border-border/30"
        >
          <span
            class="flex h-full w-full items-center justify-center bg-inherit"
          >
            <svg
              class="h-6 w-6 text-primary/30"
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
