import React from 'react'

import { render } from '@testing-library/react'

import { TransactionStatusCard } from './TransactionStatusCard'

describe('TransactionStatusCard', () => {
  it('should render appropriate elements when given `awaiting` status', () => {
    const { asFragment } = render(<TransactionStatusCard status="awaiting" />)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          data-state="closed"
        >
          <div
            class="flex items-center gap-2 bg-primary/10 rounded-md theme-border p-3"
          >
            <svg
              class="text-warning h-4 w-4"
            >
              <use
                href="/src/components/Icon/Icon.sprites.svg#wallet-2"
              />
            </svg>
            <div
              class="text-primary text-base font-normal"
            >
              Awaiting wallet approval
            </div>
            <svg
              class="text-primary/20 h-4 w-4"
            >
              <use
                href="/src/components/Icon/Icon.sprites.svg#circle-question-mark"
              />
            </svg>
          </div>
        </button>
      </DocumentFragment>
    `)
  })
  it('should render appropriate elements when given `error` status', () => {
    const { asFragment } = render(<TransactionStatusCard status="error" />)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex items-center gap-2 bg-primary/10 rounded-md theme-border p-3"
        >
          <svg
            class="text-destructive h-4 w-4"
          >
            <use
              href="/src/components/Icon/Icon.sprites.svg#triangle-exclamation"
            />
          </svg>
          <div
            class="text-primary text-base font-normal"
          >
            Transaction failed
          </div>
        </div>
      </DocumentFragment>
    `)
  })
  it('should render appropriate elements when given `in-progress` status', () => {
    const { asFragment } = render(
      <TransactionStatusCard status="in-progress" />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex items-center gap-2 bg-primary/10 rounded-md theme-border p-3"
        >
          <svg
            class="text-accent animate-spin h-4 w-4"
          >
            <use
              href="/src/components/Icon/Icon.sprites.svg#in-progress"
            />
          </svg>
          <div
            class="text-primary text-base font-normal"
          >
            Creating Identity in the Intuition Network...
          </div>
        </div>
      </DocumentFragment>
    `)
  })
  it('should render appropriate elements when given `preparing-identity` status', () => {
    const { asFragment } = render(
      <TransactionStatusCard status="preparing-identity" />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex items-center gap-2 bg-primary/10 rounded-md theme-border p-3"
        >
          <svg
            class="text-accent animate-spin h-4 w-4"
          >
            <use
              href="/src/components/Icon/Icon.sprites.svg#in-progress"
            />
          </svg>
          <div
            class="text-primary text-base font-normal"
          >
            Creating Identity in the Intuition Network...
          </div>
        </div>
      </DocumentFragment>
    `)
  })
  it('should render appropriate elements when given `publishing-identity` status', () => {
    const { asFragment } = render(
      <TransactionStatusCard status="publishing-identity" />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex items-center gap-2 bg-primary/10 rounded-md theme-border p-3"
        >
          <svg
            class="text-accent animate-spin h-4 w-4"
          >
            <use
              href="/src/components/Icon/Icon.sprites.svg#in-progress"
            />
          </svg>
          <div
            class="text-primary text-base font-normal"
          >
            Publishing Identity to IPFS...
          </div>
        </div>
      </DocumentFragment>
    `)
  })
  it('should render appropriate elements when given `approve-transaction` status', () => {
    const { asFragment } = render(
      <TransactionStatusCard status="approve-transaction" />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex items-center gap-2 bg-primary/10 rounded-md theme-border p-3"
        >
          <svg
            class="text-warning h-4 w-4"
          >
            <use
              href="/src/components/Icon/Icon.sprites.svg#wallet-2"
            />
          </svg>
          <div
            class="text-primary text-base font-normal"
          >
            Approve transaction in your wallet
          </div>
        </div>
      </DocumentFragment>
    `)
  })
  it('should render appropriate elements when given `transaction-pending` status', () => {
    const { asFragment } = render(
      <TransactionStatusCard status="transaction-pending" />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex items-center gap-2 bg-primary/10 rounded-md theme-border p-3"
        >
          <svg
            class="text-accent animate-spin h-4 w-4"
          >
            <use
              href="/src/components/Icon/Icon.sprites.svg#in-progress"
            />
          </svg>
          <div
            class="text-primary text-base font-normal"
          >
            Transaction pending
          </div>
        </div>
      </DocumentFragment>
    `)
  })
  it('should render appropriate elements when given `confirm` status', () => {
    const { asFragment } = render(<TransactionStatusCard status="confirm" />)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex items-center gap-2 bg-primary/10 rounded-md theme-border p-3"
        >
          <svg
            class="text-accent animate-spin h-4 w-4"
          >
            <use
              href="/src/components/Icon/Icon.sprites.svg#in-progress"
            />
          </svg>
          <div
            class="text-primary text-base font-normal"
          >
            Confirming transaction
          </div>
        </div>
      </DocumentFragment>
    `)
  })
  it('should render appropriate elements when given `success` status', () => {
    const { asFragment } = render(<TransactionStatusCard status="complete" />)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex items-center gap-2 bg-primary/10 rounded-md theme-border p-3"
        >
          <svg
            class="text-success h-4 w-4"
          >
            <use
              href="/src/components/Icon/Icon.sprites.svg#circle-check"
            />
          </svg>
          <div
            class="text-primary text-base font-normal"
          >
            Transaction complete
          </div>
        </div>
      </DocumentFragment>
    `)
  })
})
