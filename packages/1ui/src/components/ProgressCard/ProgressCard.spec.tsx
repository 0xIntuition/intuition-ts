import { render } from '@testing-library/react'

import { ProgressCard } from './ProgressCard'

describe('ProgressCard', () => {
  it('should render the appropriate elements', () => {
    const { asFragment } = render(
      <ProgressCard numberTotal={10} numberCompleted={5} />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <p>Something</p>>
    </DocumentFragment>
    `)
  })
  // Add more tests as needed to cover the functionality of your component
  // Additional tests can be written here to check different states and props
})
