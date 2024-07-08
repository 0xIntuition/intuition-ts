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
  { name: 'Tag Name 4', id: '4' },
]

export const EmptyStateVariant: Story = {
  render: () => (
    <div className="w-[400px]">
      <TagsListInput
        variant="tag"
        tags={[]}
        maxTags={5}
        onAddTag={() => console.log('Add Tag')}
        onRemoveTag={(id: string) => console.log('Remove Tag', id)}
      />
    </div>
  ),
}

export const TrustCirclesVariant: Story = {
  render: () => (
    <div className="w-[400px]">
      <TagsListInput
        variant="trustCircle"
        tags={tags}
        maxTags={5}
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
        variant="tag"
        tags={tags}
        maxTags={5}
        onAddTag={() => console.log('Add Tag')}
        onRemoveTag={(id: string) => console.log('Remove Tag', id)}
      />
    </div>
  ),
}
