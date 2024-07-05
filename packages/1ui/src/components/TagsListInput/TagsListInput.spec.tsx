import { render } from '@testing-library/react'

import { TagsListInput } from './TagsListInput'

describe('TagsListInput', () => {
  it('should render appropriate element', () => {
    const { asFragment } = render(<TagsListInput></TagsListInput>)
    expect(asFragment()).toMatchInlineSnapshot()
  })
})
