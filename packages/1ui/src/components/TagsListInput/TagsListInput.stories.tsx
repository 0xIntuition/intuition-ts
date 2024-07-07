import * as React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { TagsListInput } from './TagsListInput'

const meta: Meta<typeof TagsListInput> = {
  title: 'Components/TagsListInput',
  component: TagsListInput,
}

export default meta

type Story = StoryObj<typeof TagsListInput>

const tags = [
  { name: 'Tag Name 1', id: '1' },
  { name: 'Tag Name 2', id: '2' },
  { name: 'Tag Name 3', id: '3' },
]

export const TrustCirclesVariant: Story = {
  render: () => (
    <div className="w-[400px]">
      <TagsListInput
        variant="trustCircles"
        tags={tags}
        maxTags={3}
        onAddTag={() => console.log('Add Tag')}
        onRemoveTag={(id: string) => console.log('Remove Tag', id)}
      />
    </div>
  ),
}

export const TagsVariant: Story = {
  render: () => (
    <div className="w-[400px]">
      <TagsListInput
        variant="tags"
        tags={tags}
        maxTags={5}
        onAddTag={() => console.log('Add Tag')}
        onRemoveTag={(id: string) => console.log('Remove Tag', id)}
      />
    </div>
  ),
}
