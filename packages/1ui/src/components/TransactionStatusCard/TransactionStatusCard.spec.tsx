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
            <p
              class="text-primary text-base font-normal"
            >
              Awaiting wallet approval
            </p>
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
          <p
            class="text-primary text-base font-normal"
          >
            Transaction failed
          </p>
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
            class="lucide lucide-loader-circle animate-spin h-4 w-4 text-accent"
            fill="none"
            height="24"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 12a9 9 0 1 1-6.219-8.56"
            />
          </svg>
          <p
            class="text-primary text-base font-normal"
          >
            Submitting transaction
          </p>
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
            class="lucide lucide-loader-circle animate-spin h-4 w-4 text-accent"
            fill="none"
            height="24"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 12a9 9 0 1 1-6.219-8.56"
            />
          </svg>
          <p
            class="text-primary text-base font-normal"
          >
            Submitting transaction
          </p>
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
            class="lucide lucide-loader-circle animate-spin h-4 w-4 text-accent"
            fill="none"
            height="24"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 12a9 9 0 1 1-6.219-8.56"
            />
          </svg>
          <p
            class="text-primary text-base font-normal"
          >
            Submitting transaction
          </p>
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
            class="lucide lucide-loader-circle animate-spin h-4 w-4 text-accent"
            fill="none"
            height="24"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 12a9 9 0 1 1-6.219-8.56"
            />
          </svg>
          <p
            class="text-primary text-base font-normal"
          >
            Submitting transaction
          </p>
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
            class="lucide lucide-loader-circle animate-spin h-4 w-4 text-accent"
            fill="none"
            height="24"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 12a9 9 0 1 1-6.219-8.56"
            />
          </svg>
          <p
            class="text-primary text-base font-normal"
          >
            Submitting transaction
          </p>
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
            class="lucide lucide-loader-circle animate-spin h-4 w-4 text-accent"
            fill="none"
            height="24"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 12a9 9 0 1 1-6.219-8.56"
            />
          </svg>
          <p
            class="text-primary text-base font-normal"
          >
            Submitting transaction
          </p>
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
          <p
            class="text-primary text-base font-normal"
          >
            Transaction complete
          </p>
        </div>
      </DocumentFragment>
    `)
  })
})
