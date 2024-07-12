import { render } from '@testing-library/react'
import { QuestCriteriaStatus, QuestStatus } from 'types'

import { QuestCriteriaCard } from './QuestCriteriaCard'

describe('QuestCriteriaCard', () => {
  it('should render appropriate elements for notStarted status', () => {
    const { asFragment } = render(
      <QuestCriteriaCard
        criteria={{
          criteria: 'Test',
          status: QuestCriteriaStatus.notStarted,
        }}
        points={10}
        questStatus={QuestStatus.notStarted}
      />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="p-5 rounded-lg theme-border space-y-8"
        >
          <div
            class="space-y-2.5"
          >
            <p
              class="text-lg font-normal text-foreground/70"
            >
              Tasks
            </p>
            <div
              class="space-y-2"
            >
              <p
                class="text-base font-medium text-foreground/70 flex items-center gap-2"
              >
                <svg
                  class="w-4 h-4 text-muted-foreground"
                >
                  <use
                    href="/src/components/Icon/Icon.sprites.svg#circle"
                  />
                </svg>
                Test
              </p>
            </div>
          </div>
          <div
            class="space-y-2.5"
          >
            <p
              class="text-lg font-normal text-foreground/70"
            >
              Points
            </p>
            <p
              class="text-base font-normal text-muted-foreground"
            >
              +10 Points
            </p>
          </div>
        </div>
      </DocumentFragment>
    `)
  })

  it('should render appropriate elements for partiallyFulfilled status', () => {
    const { asFragment } = render(
      <QuestCriteriaCard
        criteria={{
          criteria: 'Test',
          status: QuestCriteriaStatus.partiallyFulfilled,
        }}
        points={10}
        questStatus={QuestStatus.notStarted}
      />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="p-5 rounded-lg theme-border space-y-8"
        >
          <div
            class="space-y-2.5"
          >
            <p
              class="text-lg font-normal text-foreground/70"
            >
              Tasks
            </p>
            <div
              class="space-y-2"
            >
              <p
                class="text-base font-medium text-warning flex items-center gap-2"
              >
                <svg
                  class="w-4 h-4 text-warning"
                >
                  <use
                    href="/src/components/Icon/Icon.sprites.svg#circle"
                  />
                </svg>
                Test
              </p>
            </div>
          </div>
          <div
            class="space-y-2.5"
          >
            <p
              class="text-lg font-normal text-foreground/70"
            >
              Points
            </p>
            <p
              class="text-base font-normal text-muted-foreground"
            >
              +10 Points
            </p>
          </div>
        </div>
      </DocumentFragment>
    `)
  })

  it('should render appropriate elements for fulfilled status', () => {
    const { asFragment } = render(
      <QuestCriteriaCard
        criteria={{
          criteria: 'Test',
          status: QuestCriteriaStatus.fulfilled,
        }}
        points={10}
        questStatus={QuestStatus.notStarted}
      />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="p-5 rounded-lg theme-border space-y-8"
        >
          <div
            class="space-y-2.5"
          >
            <p
              class="text-lg font-normal text-foreground/70"
            >
              Tasks
            </p>
            <div
              class="space-y-2"
            >
              <p
                class="text-base font-medium text-success flex items-center gap-2"
              >
                <svg
                  class="w-4 h-4 text-success"
                >
                  <use
                    href="/src/components/Icon/Icon.sprites.svg#circle-check-filled"
                  />
                </svg>
                Test
              </p>
            </div>
          </div>
          <div
            class="space-y-2.5"
          >
            <p
              class="text-lg font-normal text-foreground/70"
            >
              Points
            </p>
            <p
              class="text-base font-normal text-muted-foreground"
            >
              +10 Points
            </p>
          </div>
        </div>
      </DocumentFragment>
    `)
  })

  it('should render appropriate elements for inProgress questStatus', () => {
    const { asFragment } = render(
      <QuestCriteriaCard
        criteria={{
          criteria: 'Test',
          status: QuestCriteriaStatus.notStarted,
        }}
        points={10}
        questStatus={QuestStatus.inProgress}
      />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="p-5 rounded-lg theme-border space-y-8"
        >
          <div
            class="space-y-2.5"
          >
            <p
              class="text-lg font-normal text-foreground/70"
            >
              Tasks
            </p>
            <div
              class="space-y-2"
            >
              <p
                class="text-base font-medium text-foreground/70 flex items-center gap-2"
              >
                <svg
                  class="w-4 h-4 text-muted-foreground"
                >
                  <use
                    href="/src/components/Icon/Icon.sprites.svg#circle"
                  />
                </svg>
                Test
              </p>
            </div>
          </div>
          <div
            class="space-y-2.5"
          >
            <p
              class="text-lg font-normal text-foreground/70"
            >
              Points
            </p>
            <p
              class="text-base font-normal text-muted-foreground"
            >
              +10 Points
            </p>
          </div>
        </div>
      </DocumentFragment>
    `)
  })

  it('should render appropriate elements for claimable questStatus', () => {
    const { asFragment } = render(
      <QuestCriteriaCard
        criteria={{
          criteria: 'Test',
          status: QuestCriteriaStatus.notStarted,
        }}
        points={10}
        questStatus={QuestStatus.claimable}
      />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="p-5 rounded-lg theme-border space-y-8"
        >
          <div
            class="space-y-2.5"
          >
            <p
              class="text-lg font-normal text-foreground/70"
            >
              Tasks
            </p>
            <div
              class="space-y-2"
            >
              <p
                class="text-base font-medium text-foreground/70 flex items-center gap-2"
              >
                <svg
                  class="w-4 h-4 text-muted-foreground"
                >
                  <use
                    href="/src/components/Icon/Icon.sprites.svg#circle"
                  />
                </svg>
                Test
              </p>
            </div>
          </div>
          <div
            class="space-y-2.5"
          >
            <p
              class="text-lg font-normal text-foreground/70"
            >
              Points
            </p>
            <p
              class="text-base font-normal text-foreground"
            >
              +10 Points
            </p>
          </div>
        </div>
      </DocumentFragment>
    `)
  })

  it('should render appropriate elements for completed questStatus', () => {
    const { asFragment } = render(
      <QuestCriteriaCard
        criteria={{
          criteria: 'Test',
          status: QuestCriteriaStatus.notStarted,
        }}
        points={10}
        questStatus={QuestStatus.completed}
      />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="p-5 rounded-lg theme-border space-y-8"
        >
          <div
            class="space-y-2.5"
          >
            <p
              class="text-lg font-normal text-foreground/70"
            >
              Tasks
            </p>
            <div
              class="space-y-2"
            >
              <p
                class="text-base font-medium text-foreground/70 flex items-center gap-2"
              >
                <svg
                  class="w-4 h-4 text-muted-foreground"
                >
                  <use
                    href="/src/components/Icon/Icon.sprites.svg#circle"
                  />
                </svg>
                Test
              </p>
            </div>
          </div>
          <div
            class="space-y-2.5"
          >
            <p
              class="text-lg font-normal text-foreground/70"
            >
              Points
            </p>
            <p
              class="text-base font-normal text-success"
            >
              +10 Points
            </p>
          </div>
        </div>
      </DocumentFragment>
    `)
  })

  it('should render appropriate elements for disabled questStatus', () => {
    const { asFragment } = render(
      <QuestCriteriaCard
        criteria={{
          criteria: 'Test',
          status: QuestCriteriaStatus.notStarted,
        }}
        points={10}
        questStatus={QuestStatus.disabled}
      />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="p-5 rounded-lg theme-border space-y-8"
        >
          <div
            class="space-y-2.5"
          >
            <p
              class="text-lg font-normal text-foreground/70"
            >
              Tasks
            </p>
            <div
              class="space-y-2"
            >
              <p
                class="text-base font-medium text-foreground/70 flex items-center gap-2"
              >
                <svg
                  class="w-4 h-4 text-muted-foreground"
                >
                  <use
                    href="/src/components/Icon/Icon.sprites.svg#circle"
                  />
                </svg>
                Test
              </p>
            </div>
          </div>
          <div
            class="space-y-2.5"
          >
            <p
              class="text-lg font-normal text-foreground/70"
            >
              Points
            </p>
            <p
              class="text-base font-normal text-muted-foreground"
            >
              +10 Points
            </p>
          </div>
        </div>
      </DocumentFragment>
    `)
  })

  it('should render "+" for positive points', () => {
    const { getByText } = render(
      <QuestCriteriaCard
        criteria={{
          criteria: 'Test',
          status: QuestCriteriaStatus.notStarted,
        }}
        points={10}
        questStatus={QuestStatus.notStarted}
      />,
    )
    expect(getByText('+10 Points')).toBeTruthy()
  })

  it('should render "-" for negative points', () => {
    const { getByText } = render(
      <QuestCriteriaCard
        criteria={{
          criteria: 'Test',
          status: QuestCriteriaStatus.notStarted,
        }}
        points={-10}
        questStatus={QuestStatus.notStarted}
      />,
    )
    expect(getByText('-10 Points')).toBeTruthy()
  })

  it('should not render "+" or "-" for zero points', () => {
    const { queryByText } = render(
      <QuestCriteriaCard
        criteria={{
          criteria: 'Test',
          status: QuestCriteriaStatus.notStarted,
        }}
        points={0}
        questStatus={QuestStatus.notStarted}
      />,
    )
    expect(queryByText('+0 Points')).toBeFalsy()
    expect(queryByText('-0 Points')).toBeFalsy()
  })
})
