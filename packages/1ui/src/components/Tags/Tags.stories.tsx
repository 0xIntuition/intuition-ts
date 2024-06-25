import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Tags, TagsButton, TagsContent, TagWithValue } from './Tags'

const meta: Meta<typeof Tags> = {
  title: 'Components/Tags',
  component: Tags,
}

export default meta

type Story = StoryObj<typeof Tags>

export const BasicUsage: Story = {
  render: () => (
    <div className="w-[250px]">
      <Tags>
        <TagsContent numberOfTags={42}>
          <TagWithValue label="keyboard" value={192} />
          <TagWithValue label="ergonomic" value={168} />
          <TagWithValue label="wireless" value={143} />
          <TagWithValue label="gaming" value={132} />
          <TagWithValue label="mechanical" value={128} />
          <TagWithValue label="tech" value={122} />
          <TagWithValue label="innovation" value={118} />
          <TagWithValue label="typing" value={111} />
          <TagWithValue label="quality" value={98} />
          <TagWithValue label="brand" value={94} />
        </TagsContent>
        <TagsButton />
      </Tags>
    </div>
  ),
}
