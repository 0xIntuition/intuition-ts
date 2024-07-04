import React from 'react'

import { render } from '@testing-library/react'

import { TransactionStatusIndicator } from './TransactionStatusIndicator'

describe('TransactionStatusIndicator', () => {
  it('should render appropriate elements when given `awaiting` status', () => {
    const { asFragment } = render(
      <TransactionStatusIndicator status="awaiting" />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex flex-col gap-2 justify-center items-center"
        >
          <svg
            class="w-20 h-20 text-warning"
          >
            <use
              href="/src/components/Icon/Icon.sprites.svg#await-action"
            />
          </svg>
          <h6
            class="text-xl font-medium text-foreground"
          >
            Awaiting
          </h6>
        </div>
      </DocumentFragment>
    `)
  })
  it('should render appropriate elements when given `error` status', () => {
    const { asFragment } = render(<TransactionStatusIndicator status="error" />)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex flex-col gap-2 justify-center items-center"
        >
          <svg
            class="w-20 h-20 text-destructive"
          >
            <use
              href="/src/components/Icon/Icon.sprites.svg#triangle-exclamation"
            />
          </svg>
          <h6
            class="text-xl font-medium text-foreground"
          >
            Failed to create identity
          </h6>
        </div>
      </DocumentFragment>
    `)
  })
  it('should render appropriate elements when given `in-progress` status', () => {
    const { asFragment } = render(
      <TransactionStatusIndicator status="in-progress" />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex flex-col gap-2 justify-center items-center"
        >
          <svg
            class="w-20 h-20 text-accent"
          >
            <use
              href="/src/components/Icon/Icon.sprites.svg#in-progress"
            />
          </svg>
          <h6
            class="text-xl font-medium text-foreground"
          >
            In Progress
          </h6>
        </div>
      </DocumentFragment>
    `)
  })
  it('should render appropriate elements when given `success` status', () => {
    const { asFragment } = render(
      <TransactionStatusIndicator status="success" />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex flex-col gap-2 justify-center items-center"
        >
          <svg
            class="w-20 h-20 text-success"
          >
            <use
              href="/src/components/Icon/Icon.sprites.svg#circle-check"
            />
          </svg>
          <h6
            class="text-xl font-medium text-foreground"
          >
            Identity created successfully
          </h6>
        </div>
      </DocumentFragment>
    `)
  })
})
