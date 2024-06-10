import React from 'react'

import { render } from '@testing-library/react'

import { ValueDisplay } from './ValueDisplay'

describe('ValueDisplay', () => {
  it('should render appropriate element for `default` variant', () => {
    const { asFragment } = render(<ValueDisplay>000</ValueDisplay>)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="inline-flex justify-center min-w-16 bg-primary/10 py-1 px-2"
        >
          000
        </div>
      </DocumentFragment>
    `)
  })
  it('should render appropriate element for `directionFor` variant', () => {
    const { asFragment } = render(
      <ValueDisplay variant="directionFor">000</ValueDisplay>,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="inline-flex justify-center min-w-16 py-1 px-2 bg-success/20 text-success"
        >
          000
        </div>
      </DocumentFragment>
    `)
  })
  it('should render appropriate element for `directionAgainst` variant', () => {
    const { asFragment } = render(
      <ValueDisplay variant="directionAgainst">000</ValueDisplay>,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="inline-flex justify-center min-w-16 py-1 px-2 bg-destructive/20 text-destructive"
        >
          000
        </div>
      </DocumentFragment>
    `)
  })
  it('should render appropriate element for `attestorFor` variant', () => {
    const { asFragment } = render(
      <ValueDisplay variant="attestorFor">000</ValueDisplay>,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="inline-flex justify-center min-w-16 bg-primary/10 py-1 px-2 text-success"
        >
          000
        </div>
      </DocumentFragment>
    `)
  })
  it('should render appropriate element for `attestorAgainst` variant', () => {
    const { asFragment } = render(
      <ValueDisplay variant="attestorAgainst">000</ValueDisplay>,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="inline-flex justify-center min-w-16 bg-primary/10 py-1 px-2 text-destructive"
        >
          000
        </div>
      </DocumentFragment>
    `)
  })
})
