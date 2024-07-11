import { render } from '@testing-library/react'

import { QuestStatusCard } from './QuestStatusCard'

describe('QuestStatusCard', () => {
  it('should render appropriate elements when given `not-started` status', () => {
    const { asFragment } = render(<QuestStatusCard status="not-started" />)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex items-center gap-2 rounded-md theme-border p-3 bg-primary/10"
        >
          <svg
            class="text-muted-foreground h-4 w-4"
          >
            <use
              href="/src/components/Icon/Icon.sprites.svg#await-action"
            />
          </svg>
          <p
            class="text-base font-normal text-muted-foreground"
          >
            Not Started
          </p>
        </div>
      </DocumentFragment>
    `)
  })

  it('should render appropriate elements when given `in-progress` status', () => {
    const { asFragment } = render(<QuestStatusCard status="in-progress" />)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex items-center gap-2 rounded-md theme-border p-3 bg-warning/20"
        >
          <svg
            class="text-warning h-4 w-4"
          >
            <use
              href="/src/components/Icon/Icon.sprites.svg#await-action"
            />
          </svg>
          <p
            class="text-base font-normal text-warning"
          >
            In Progress
          </p>
        </div>
      </DocumentFragment>
    `)
  })

  it('should render appropriate elements when given `claimable` status', () => {
    const { asFragment } = render(<QuestStatusCard status="claimable" />)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex items-center gap-2 rounded-md theme-border p-3 bg-primary/10"
        >
          <svg
            class="text-success h-4 w-4"
          >
            <use
              href="/src/components/Icon/Icon.sprites.svg#circle-check"
            />
          </svg>
          <p
            class="text-base font-normal text-success"
          >
            Ready to Claim
          </p>
        </div>
      </DocumentFragment>
    `)
  })

  it('should render appropriate elements when given `completed` status', () => {
    const { asFragment } = render(<QuestStatusCard status="completed" />)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex items-center gap-2 rounded-md theme-border p-3 bg-success/20"
        >
          <svg
            class="text-success h-4 w-4"
          >
            <use
              href="/src/components/Icon/Icon.sprites.svg#circle-check-filled"
            />
          </svg>
          <p
            class="text-base font-normal text-success"
          >
            Complete
          </p>
        </div>
      </DocumentFragment>
    `)
  })

  it('should render appropriate elements when a tooltip is provided', () => {
    const { asFragment } = render(
      <QuestStatusCard status="not-started" tooltip="Example text" />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          data-state="closed"
        >
          <div
            class="flex items-center gap-2 rounded-md theme-border p-3 bg-primary/10"
          >
            <svg
              class="text-muted-foreground h-4 w-4"
            >
              <use
                href="/src/components/Icon/Icon.sprites.svg#await-action"
              />
            </svg>
            <p
              class="text-base font-normal text-muted-foreground"
            >
              Not Started
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
})
