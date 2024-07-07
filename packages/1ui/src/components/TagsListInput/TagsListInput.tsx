import * as React from 'react'

import { Button, Icon, TagVariant, TagWithValue, Text } from 'components'
import { cn } from 'styles'

const TAGS_LIST_VARIANTS = {
  trustCircles: 'trust circles',
  tags: 'tags',
} as const

type TagsListVariants = keyof typeof TAGS_LIST_VARIANTS

export interface TagsListInputProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant: TagsListVariants
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
  className,
  ...props
}: TagsListInputProps) => {
  const tagsLeft = maxTags - tags.length
  const tagVariant =
    variant === 'trustCircles' ? TagVariant.social : TagVariant.primary

  return (
    <div className="w-full" {...props}>
      <div className={cn('flex flex-wrap gap-2.5 items-center', className)}>
        {tags.map((tag) => (
          <TagWithValue
            key={tag.id}
            label={tag.name}
            onRemove={() => onRemoveTag(tag.id)}
            variant={tagVariant}
          />
        ))}

        {tags.length === 0 ? (
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={onAddTag}
              className="rounded-full px-2 mr-1"
            >
              <Icon name="plus-small" />
            </Button>
            <Text variant="footnote" className="text-secondary-foreground">
              {`Add up to ${tagsLeft} ${TAGS_LIST_VARIANTS[variant]}`}
            </Text>
          </div>
        ) : (
          <Text variant="footnote" className="text-secondary-foreground">
            {tagsLeft} {TAGS_LIST_VARIANTS[variant]} left
          </Text>
        )}
      </div>
    </div>
  )
}
