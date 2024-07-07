import * as React from 'react'

import { Tags, TagsContent, TagVariant, TagWithValue, Text } from 'components'

export interface TagsListInputProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant: 'trustCircles' | 'tags'
  tags: { name: string; id: string }[]
  maxTags: number
  onAddTag: () => void
  onRemoveTag: (id: string) => void
}

export const TagsListInput = ({
  variant,
  tags,
  maxTags,
  onAddTag,
  onRemoveTag,
  ...props
}: TagsListInputProps) => {
  const tagsLeft = maxTags - tags.length
  const tagVariant =
    variant === 'trustCircles' ? TagVariant.social : TagVariant.primary

  return (
    <div className="w-full" {...props}>
      <Tags>
        <TagsContent numberOfTags={tagsLeft}>
          {tags.map((tag) => (
            <TagWithValue
              key={tag.id}
              label={tag.name}
              onRemove={() => onRemoveTag(tag.id)}
              variant={tagVariant}
            />
          ))}
        </TagsContent>
        <Text variant="small" className="mt-2">
          {tagsLeft} {variant === 'trustCircles' ? 'trust circles' : 'tags'}{' '}
          left
        </Text>
      </Tags>
    </div>
  )
}
