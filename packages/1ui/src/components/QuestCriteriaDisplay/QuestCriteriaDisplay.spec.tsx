import { render } from '@testing-library/react'
import { QuestCriteriaStatus } from 'types'

import { QuestCriteriaDisplay } from './QuestCriteriaDisplay'

describe('QuestCriteriaDisplay', () => {
  it('should render the appropriate elements for notStarted status', () => {
    const { asFragment } = render(
      <QuestCriteriaDisplay
        criteria="Test"
        status={QuestCriteriaStatus.notStarted}
      />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
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
      </DocumentFragment>
    `)
  })

  it('should render the appropriate elements for partiallyFulfilled status', () => {
    const { asFragment } = render(
      <QuestCriteriaDisplay
        criteria="Test"
        status={QuestCriteriaStatus.partiallyFulfilled}
      />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
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
      </DocumentFragment>
    `)
  })

  it('should render the appropriate elements for fulfilled status', () => {
    const { asFragment } = render(
      <QuestCriteriaDisplay
        criteria="Test"
        status={QuestCriteriaStatus.fulfilled}
      />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
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
      </DocumentFragment>
    `)
  })
})
