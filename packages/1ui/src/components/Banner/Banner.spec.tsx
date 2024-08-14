import React from 'react'

import { render } from '@testing-library/react'

import { Banner } from './Banner'

describe('Banner', () => {
  it('should render appropriate elements when given no variant', () => {
    const { asFragment } = render(
      <Banner title="Title" message="Here is some information." />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="w-full theme-border rounded-lg"
        >
          <div
            class="flex w-full gap-2 items-center rounded-tl-lg rounded-tr-lg bg-gradient-to-r from-accent/60 to-accent/10 p-3"
          >
            <svg
              class="h-6 w-6"
            >
              <use
                href="/src/components/Icon/Icon.sprites.svg#circle-info"
              />
            </svg>
            <p
              class="text-primary text-lg font-normal"
            >
              Title
            </p>
          </div>
          <div
            class="p-4"
          >
            <p
              class="text-base font-normal text-secondary-foreground/70"
            >
              Here is some information.
            </p>
          </div>
        </div>
      </DocumentFragment>
    `)
  })
  it('should render appropriate elements when given `warning` variant', () => {
    const { asFragment } = render(
      <Banner
        variant="warning"
        title="Title"
        message="Here is some information."
      />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="w-full theme-border rounded-lg"
        >
          <div
            class="flex w-full gap-2 items-center rounded-tl-lg rounded-tr-lg bg-gradient-to-r from-warning/60 to-warning/10 p-3"
          >
            <svg
              class="h-6 w-6"
            >
              <use
                href="/src/components/Icon/Icon.sprites.svg#triangle-exclamation"
              />
            </svg>
            <p
              class="text-primary text-lg font-normal"
            >
              Title
            </p>
          </div>
          <div
            class="p-4"
          >
            <p
              class="text-base font-normal text-secondary-foreground/70"
            >
              Here is some information.
            </p>
          </div>
        </div>
      </DocumentFragment>
    `)
  })
  it('should render appropriate elements when given `error` variant', () => {
    const { asFragment } = render(
      <Banner
        variant="error"
        title="Title"
        message="Here is some information."
      />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="w-full theme-border rounded-lg"
        >
          <div
            class="flex w-full gap-2 items-center rounded-tl-lg rounded-tr-lg bg-gradient-to-r from-destructive/60 to-destructive/10 p-3"
          >
            <svg
              class="h-6 w-6"
            >
              <use
                href="/src/components/Icon/Icon.sprites.svg#circle-x"
              />
            </svg>
            <p
              class="text-primary text-lg font-normal"
            >
              Title
            </p>
          </div>
          <div
            class="p-4"
          >
            <p
              class="text-base font-normal text-secondary-foreground/70"
            >
              Here is some information.
            </p>
          </div>
        </div>
      </DocumentFragment>
    `)
  })
})
