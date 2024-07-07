import { render } from '@testing-library/react'

import { TagsListInput } from './TagsListInput'

describe('TagsListInput', () => {
  const tags = [
    { name: 'Tag Name 1', id: '1' },
    { name: 'Tag Name 2', id: '2' },
    { name: 'Tag Name 3', id: '3' },
  ]

  it('should render appropriate element', () => {
    const { asFragment } = render(
      <TagsListInput
        variant="tags"
        tags={tags}
        maxTags={5}
        onAddTag={() => {}}
        onRemoveTag={() => {}}
      />,
    )
    expect(asFragment()).toMatchInlineSnapshot()
  })
})
