import React from 'react'

import { render } from '@testing-library/react'

import { Claim, ClaimProps } from './Claim'

describe('Claim', () => {
  const defaultProps: ClaimProps = {
    size: 'md',
    subject: {
      label: 'Alice',
      variant: 'user',
      imgSrc:
        'https://m.media-amazon.com/images/M/MV5BNDhiMWYzMjgtNTRiYi00ZTA3LThlODctNDRkMDk0NzFkMWI3L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNTg0MTkzMzA@._V1_.jpg',
    },
    predicate: {
      label: 'likes',
      variant: 'non-user',
    },
    object: {
      label: 'pizza',
      variant: 'non-user',
    },
  }

  it('should render with default props', () => {
    const { asFragment } = render(<Claim {...defaultProps} />)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex items-center w-full max-w-full group"
        >
          <button
            class="theme-border font-medium py-0.5 pl-0.5 pr-2 hover:bg-primary/20 disabled:pointer-events-none flex gap-2 items-center rounded-full [&>span]:rounded-full [&>span]:overflow-hidden text-base [&>span]:h-7 [&>span]:w-7 group-hover:border-primary group-hover:bg-primary/20"
          >
            <span
              class="relative flex h-10 w-10 shrink-0 overflow-hidden aspect-square rounded-full bg-muted"
            >
              <span
                class="flex h-full w-full items-center justify-center bg-inherit"
              >
                ID
              </span>
            </span>
            <p
              class="text-primary text-base font-normal"
            >
              Alice
            </p>
          </button>
          <div
            class="shrink-0 bg-border/20 h-[1px] w-4 group-hover:bg-primary"
            data-orientation="horizontal"
            role="none"
          />
          <button
            class="theme-border font-medium py-0.5 pl-0.5 pr-2 hover:bg-primary/20 disabled:pointer-events-none flex gap-2 items-center rounded-sm text-base [&>span]:h-7 [&>span]:w-7 group-hover:border-primary group-hover:bg-primary/20"
          >
            <span
              class="relative flex h-10 w-10 shrink-0 overflow-hidden aspect-square rounded bg-background theme-border"
            >
              <span
                class="flex h-full w-full items-center justify-center bg-inherit"
              >
                <svg
                  class="text-primary/30 w-[80%] h-[80%] max-w-8 max-h-8"
                >
                  <use
                    href="/src/components/Icon/Icon.sprites.svg#fingerprint"
                  />
                </svg>
              </span>
            </span>
            <p
              class="text-primary text-base font-normal"
            >
              likes
            </p>
          </button>
          <div
            class="shrink-0 bg-border/20 h-[1px] w-4 group-hover:bg-primary"
            data-orientation="horizontal"
            role="none"
          />
          <button
            class="theme-border font-medium py-0.5 pl-0.5 pr-2 hover:bg-primary/20 disabled:pointer-events-none flex gap-2 items-center rounded-sm text-base [&>span]:h-7 [&>span]:w-7 group-hover:border-primary group-hover:bg-primary/20"
          >
            <span
              class="relative flex h-10 w-10 shrink-0 overflow-hidden aspect-square rounded bg-background theme-border"
            >
              <span
                class="flex h-full w-full items-center justify-center bg-inherit"
              >
                <svg
                  class="text-primary/30 w-[80%] h-[80%] max-w-8 max-h-8"
                >
                  <use
                    href="/src/components/Icon/Icon.sprites.svg#fingerprint"
                  />
                </svg>
              </span>
            </span>
            <p
              class="text-primary text-base font-normal"
            >
              pizza
            </p>
          </button>
        </div>
      </DocumentFragment>
    `)
  })

  it('should render in disabled state', () => {
    const { asFragment } = render(<Claim {...defaultProps} disabled />)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex items-center w-full max-w-full group"
        >
          <button
            class="theme-border font-medium py-0.5 pl-0.5 pr-2 hover:bg-primary/20 disabled:pointer-events-none flex gap-2 items-center rounded-full [&>span]:rounded-full [&>span]:overflow-hidden text-base [&>span]:h-7 [&>span]:w-7 disabled:bg-muted disabled:text-muted-foreground disabled:border-muted cursor-not-allowed group-hover:border-primary group-hover:bg-primary/20"
            disabled=""
          >
            <span
              class="relative flex h-10 w-10 shrink-0 overflow-hidden aspect-square rounded-full bg-muted"
            >
              <span
                class="flex h-full w-full items-center justify-center bg-inherit"
              >
                ID
              </span>
            </span>
            <p
              class="text-primary text-base font-normal"
            >
              Alice
            </p>
          </button>
          <div
            class="shrink-0 bg-border/20 h-[1px] w-4 group-hover:bg-primary"
            data-orientation="horizontal"
            role="none"
          />
          <button
            class="theme-border font-medium py-0.5 pl-0.5 pr-2 hover:bg-primary/20 disabled:pointer-events-none flex gap-2 items-center rounded-sm text-base [&>span]:h-7 [&>span]:w-7 disabled:bg-muted disabled:text-muted-foreground disabled:border-muted cursor-not-allowed group-hover:border-primary group-hover:bg-primary/20"
            disabled=""
          >
            <span
              class="relative flex h-10 w-10 shrink-0 overflow-hidden aspect-square rounded bg-background theme-border"
            >
              <span
                class="flex h-full w-full items-center justify-center bg-inherit"
              >
                <svg
                  class="text-primary/30 w-[80%] h-[80%] max-w-8 max-h-8"
                >
                  <use
                    href="/src/components/Icon/Icon.sprites.svg#fingerprint"
                  />
                </svg>
              </span>
            </span>
            <p
              class="text-primary text-base font-normal"
            >
              likes
            </p>
          </button>
          <div
            class="shrink-0 bg-border/20 h-[1px] w-4 group-hover:bg-primary"
            data-orientation="horizontal"
            role="none"
          />
          <button
            class="theme-border font-medium py-0.5 pl-0.5 pr-2 hover:bg-primary/20 disabled:pointer-events-none flex gap-2 items-center rounded-sm text-base [&>span]:h-7 [&>span]:w-7 disabled:bg-muted disabled:text-muted-foreground disabled:border-muted cursor-not-allowed group-hover:border-primary group-hover:bg-primary/20"
            disabled=""
          >
            <span
              class="relative flex h-10 w-10 shrink-0 overflow-hidden aspect-square rounded bg-background theme-border"
            >
              <span
                class="flex h-full w-full items-center justify-center bg-inherit"
              >
                <svg
                  class="text-primary/30 w-[80%] h-[80%] max-w-8 max-h-8"
                >
                  <use
                    href="/src/components/Icon/Icon.sprites.svg#fingerprint"
                  />
                </svg>
              </span>
            </span>
            <p
              class="text-primary text-base font-normal"
            >
              pizza
            </p>
          </button>
        </div>
      </DocumentFragment>
    `)
  })

  it('should render with different sizes', () => {
    const { asFragment: smFragment } = render(
      <Claim {...defaultProps} size="sm" />,
    )
    expect(smFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex items-center w-full max-w-full group"
        >
          <button
            class="theme-border font-medium py-0.5 pl-0.5 pr-2 hover:bg-primary/20 disabled:pointer-events-none flex gap-2 items-center rounded-full [&>span]:rounded-full [&>span]:overflow-hidden group-hover:border-primary group-hover:bg-primary/20"
          >
            <span
              class="relative flex h-10 w-10 shrink-0 overflow-hidden aspect-square rounded-full bg-muted"
            >
              <span
                class="flex h-full w-full items-center justify-center bg-inherit"
              >
                ID
              </span>
            </span>
            <p
              class="text-primary text-base font-normal"
            >
              Alice
            </p>
          </button>
          <div
            class="shrink-0 bg-border/20 h-[1px] w-4 group-hover:bg-primary"
            data-orientation="horizontal"
            role="none"
          />
          <button
            class="theme-border font-medium py-0.5 pl-0.5 pr-2 hover:bg-primary/20 disabled:pointer-events-none flex gap-2 items-center rounded-sm group-hover:border-primary group-hover:bg-primary/20"
          >
            <span
              class="relative flex h-10 w-10 shrink-0 overflow-hidden aspect-square rounded bg-background theme-border"
            >
              <span
                class="flex h-full w-full items-center justify-center bg-inherit"
              >
                <svg
                  class="text-primary/30 w-[80%] h-[80%] max-w-8 max-h-8"
                >
                  <use
                    href="/src/components/Icon/Icon.sprites.svg#fingerprint"
                  />
                </svg>
              </span>
            </span>
            <p
              class="text-primary text-base font-normal"
            >
              likes
            </p>
          </button>
          <div
            class="shrink-0 bg-border/20 h-[1px] w-4 group-hover:bg-primary"
            data-orientation="horizontal"
            role="none"
          />
          <button
            class="theme-border font-medium py-0.5 pl-0.5 pr-2 hover:bg-primary/20 disabled:pointer-events-none flex gap-2 items-center rounded-sm group-hover:border-primary group-hover:bg-primary/20"
          >
            <span
              class="relative flex h-10 w-10 shrink-0 overflow-hidden aspect-square rounded bg-background theme-border"
            >
              <span
                class="flex h-full w-full items-center justify-center bg-inherit"
              >
                <svg
                  class="text-primary/30 w-[80%] h-[80%] max-w-8 max-h-8"
                >
                  <use
                    href="/src/components/Icon/Icon.sprites.svg#fingerprint"
                  />
                </svg>
              </span>
            </span>
            <p
              class="text-primary text-base font-normal"
            >
              pizza
            </p>
          </button>
        </div>
      </DocumentFragment>
    `)

    const { asFragment: lgFragment } = render(
      <Claim {...defaultProps} size="lg" />,
    )
    expect(lgFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex items-center w-full max-w-full group"
        >
          <button
            class="theme-border font-medium py-0.5 pl-0.5 pr-2 hover:bg-primary/20 disabled:pointer-events-none flex gap-2 items-center rounded-full [&>span]:rounded-full [&>span]:overflow-hidden text-lg [&>span]:h-8 [&>span]:w-8 group-hover:border-primary group-hover:bg-primary/20"
          >
            <span
              class="relative flex h-10 w-10 shrink-0 overflow-hidden aspect-square rounded-full bg-muted"
            >
              <span
                class="flex h-full w-full items-center justify-center bg-inherit"
              >
                ID
              </span>
            </span>
            <p
              class="text-primary text-base font-normal"
            >
              Alice
            </p>
          </button>
          <div
            class="shrink-0 bg-border/20 h-[1px] w-4 group-hover:bg-primary"
            data-orientation="horizontal"
            role="none"
          />
          <button
            class="theme-border font-medium py-0.5 pl-0.5 pr-2 hover:bg-primary/20 disabled:pointer-events-none flex gap-2 items-center rounded-sm text-lg [&>span]:h-8 [&>span]:w-8 group-hover:border-primary group-hover:bg-primary/20"
          >
            <span
              class="relative flex h-10 w-10 shrink-0 overflow-hidden aspect-square rounded bg-background theme-border"
            >
              <span
                class="flex h-full w-full items-center justify-center bg-inherit"
              >
                <svg
                  class="text-primary/30 w-[80%] h-[80%] max-w-8 max-h-8"
                >
                  <use
                    href="/src/components/Icon/Icon.sprites.svg#fingerprint"
                  />
                </svg>
              </span>
            </span>
            <p
              class="text-primary text-base font-normal"
            >
              likes
            </p>
          </button>
          <div
            class="shrink-0 bg-border/20 h-[1px] w-4 group-hover:bg-primary"
            data-orientation="horizontal"
            role="none"
          />
          <button
            class="theme-border font-medium py-0.5 pl-0.5 pr-2 hover:bg-primary/20 disabled:pointer-events-none flex gap-2 items-center rounded-sm text-lg [&>span]:h-8 [&>span]:w-8 group-hover:border-primary group-hover:bg-primary/20"
          >
            <span
              class="relative flex h-10 w-10 shrink-0 overflow-hidden aspect-square rounded bg-background theme-border"
            >
              <span
                class="flex h-full w-full items-center justify-center bg-inherit"
              >
                <svg
                  class="text-primary/30 w-[80%] h-[80%] max-w-8 max-h-8"
                >
                  <use
                    href="/src/components/Icon/Icon.sprites.svg#fingerprint"
                  />
                </svg>
              </span>
            </span>
            <p
              class="text-primary text-base font-normal"
            >
              pizza
            </p>
          </button>
        </div>
      </DocumentFragment>
    `)
  })
})
