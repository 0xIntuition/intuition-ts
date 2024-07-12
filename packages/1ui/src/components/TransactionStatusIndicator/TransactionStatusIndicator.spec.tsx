import React from 'react'

import { render } from '@testing-library/react'

import { TransactionStatusIndicator } from './TransactionStatusIndicator'

describe('TransactionStatusIndicator', () => {
  it('should render appropriate elements when given `awaiting` status and `identity` type', () => {
    const { asFragment } = render(
      <TransactionStatusIndicator status="awaiting" type="identity" />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex flex-col gap-2 justify-center items-center"
        >
          <svg
            class="w-20 h-20 text-warning animate-spin"
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
  it('should render appropriate elements when given `error` status and `identity` type', () => {
    const { asFragment } = render(
      <TransactionStatusIndicator status="error" type="identity" />,
    )
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
  it('should render appropriate elements when given `in-progress` status and `identity` type', () => {
    const { asFragment } = render(
      <TransactionStatusIndicator status="in-progress" type="identity" />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex flex-col gap-2 justify-center items-center"
        >
          <svg
            class="lucide lucide-loader-circle w-20 h-20 animate-spin text-accent"
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
          <h6
            class="text-xl font-medium text-foreground"
          >
            In progress
          </h6>
        </div>
      </DocumentFragment>
    `)
  })
  it('should render appropriate elements when given `preparing-identity` status and `identity` type', () => {
    const { asFragment } = render(
      <TransactionStatusIndicator
        status="preparing-identity"
        type="identity"
      />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex flex-col gap-2 justify-center items-center"
        >
          <svg
            class="lucide lucide-loader-circle w-20 h-20 animate-spin text-accent"
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
          <h6
            class="text-xl font-medium text-foreground"
          >
            Preparing identity...
          </h6>
        </div>
      </DocumentFragment>
    `)
  })
  it('should render appropriate elements when given `publishing-identity` status and `identity` type', () => {
    const { asFragment } = render(
      <TransactionStatusIndicator
        status="publishing-identity"
        type="identity"
      />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex flex-col gap-2 justify-center items-center"
        >
          <svg
            class="lucide lucide-loader-circle w-20 h-20 animate-spin text-accent"
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
          <h6
            class="text-xl font-medium text-foreground"
          >
            Publishing identity...
          </h6>
        </div>
      </DocumentFragment>
    `)
  })
  it('should render appropriate elements when given `approve-transaction` status and `identity` type', () => {
    const { asFragment } = render(
      <TransactionStatusIndicator
        status="approve-transaction"
        type="identity"
      />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex flex-col gap-2 justify-center items-center"
        >
          <svg
            class="lucide lucide-loader-circle w-20 h-20 animate-spin text-accent"
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
          <h6
            class="text-xl font-medium text-foreground"
          >
            Approving transaction...
          </h6>
        </div>
      </DocumentFragment>
    `)
  })
  it('should render appropriate elements when given `transaction-pending` status and `identity` type', () => {
    const { asFragment } = render(
      <TransactionStatusIndicator
        status="transaction-pending"
        type="identity"
      />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex flex-col gap-2 justify-center items-center"
        >
          <svg
            class="lucide lucide-loader-circle w-20 h-20 animate-spin text-accent"
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
          <h6
            class="text-xl font-medium text-foreground"
          >
            Transaction pending...
          </h6>
        </div>
      </DocumentFragment>
    `)
  })
  it('should render appropriate elements when given `confirm` status and `identity` type', () => {
    const { asFragment } = render(
      <TransactionStatusIndicator status="confirm" type="identity" />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex flex-col gap-2 justify-center items-center"
        >
          <svg
            class="lucide lucide-loader-circle w-20 h-20 animate-spin text-accent"
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
          <h6
            class="text-xl font-medium text-foreground"
          >
            Confirming transaction...
          </h6>
        </div>
      </DocumentFragment>
    `)
  })
  it('should render appropriate elements when given `success` status and `identity` type', () => {
    const { asFragment } = render(
      <TransactionStatusIndicator status="complete" type="identity" />,
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
