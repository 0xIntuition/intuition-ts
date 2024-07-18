import { render } from '@testing-library/react'
import { QuestStatus } from 'types'

import { QuestPointsDisplay } from './QuestPointsDisplay'

describe('QuestPointsDisplay', () => {
  it('should render appropriate element for notStarted status', () => {
    const { asFragment } = render(
      <QuestPointsDisplay points={10} questStatus={QuestStatus.notStarted} />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <p
          class="text-base font-normal text-muted-foreground"
        >
          +10 Points
        </p>
      </DocumentFragment>
    `)
  })

  it('should render appropriate element for inProgress status', () => {
    const { asFragment } = render(
      <QuestPointsDisplay points={10} questStatus={QuestStatus.inProgress} />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <p
          class="text-base font-normal text-muted-foreground"
        >
          +10 Points
        </p>
      </DocumentFragment>
    `)
  })

  it('should render appropriate element for claimable status', () => {
    const { asFragment } = render(
      <QuestPointsDisplay points={10} questStatus={QuestStatus.claimable} />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <p
          class="text-base font-normal text-foreground"
        >
          +10 Points
        </p>
      </DocumentFragment>
    `)
  })

  it('should render appropriate element for completed status', () => {
    const { asFragment } = render(
      <QuestPointsDisplay points={10} questStatus={QuestStatus.completed} />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <p
          class="text-base font-normal text-success"
        >
          +10 Points
        </p>
      </DocumentFragment>
    `)
  })

  it('should render appropriate element for disabled status', () => {
    const { asFragment } = render(
      <QuestPointsDisplay points={10} questStatus={QuestStatus.disabled} />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <p
          class="text-base font-normal text-muted-foreground"
        >
          +10 Points
        </p>
      </DocumentFragment>
    `)
  })

  it('should render "+" for positive points', () => {
    const { getByText } = render(
      <QuestPointsDisplay points={10} questStatus={QuestStatus.inProgress} />,
    )
    expect(getByText('+10 Points')).toBeTruthy()
  })

  it('should render "-" for negative points', () => {
    const { getByText } = render(
      <QuestPointsDisplay points={-10} questStatus={QuestStatus.inProgress} />,
    )
    expect(getByText('-10 Points')).toBeTruthy()
  })

  it('should not render "+" or "-" for zero points', () => {
    const { queryByText } = render(
      <QuestPointsDisplay points={0} questStatus={QuestStatus.inProgress} />,
    )
    expect(queryByText('+0 Points')).toBeFalsy()
    expect(queryByText('-0 Points')).toBeFalsy()
    expect(queryByText('0 Points')).toBeTruthy()
  })
})
