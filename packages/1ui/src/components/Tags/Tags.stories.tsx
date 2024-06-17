import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Tags, TagsBadge, TagsBadges, TagsButton } from './Tags'

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
        <TagsBadges numberOfTags={42}>
          <TagsBadge label="keyboard" value={192} />
          <TagsBadge label="ergonomic" value={168} />
          <TagsBadge label="wireless" value={143} />
          <TagsBadge label="gaming" value={132} />
          <TagsBadge label="mechanical" value={128} />
          <TagsBadge label="tech" value={122} />
          <TagsBadge label="innovation" value={118} />
          <TagsBadge label="typing" value={111} />
          <TagsBadge label="quality" value={98} />
          <TagsBadge label="brand" value={94} />
        </TagsBadges>
        <TagsButton />
      </Tags>
    </div>
  ),
}
