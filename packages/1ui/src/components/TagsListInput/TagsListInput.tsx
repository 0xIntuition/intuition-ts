import * as React from 'react'

import { Button, Icon, TagVariant, TagWithValue, Text } from 'components'
import { cn } from 'styles'

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
  className,
  ...props
}: TagsListInputProps) => {
  const tagsLeft = maxTags - tags.length
  const tagVariant =
    variant === 'trustCircles' ? TagVariant.social : TagVariant.primary

  return (
    <div className="w-full" {...props}>
      <div
        className={cn('flex flex-wrap gap-2.5 items-center', className)}
        {...props}
      >
        {tags.map((tag) => (
          <TagWithValue
            key={tag.id}
            label={tag.name}
            onRemove={() => onRemoveTag(tag.id)}
            variant={tagVariant}
          />
        ))}

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={onAddTag}
            className="px-2 rounded-full"
          >
            <Icon name="plus-small" />
          </Button>
          {tags.length === 0 ? (
            <Text variant="footnote" className="text-secondary-foreground">
              {`Add up to ${tagsLeft} ${variant === 'trustCircles' ? 'trust circles' : 'tags'}`}
            </Text>
          ) : (
            <Text variant="footnote" className="text-secondary-foreground">
              {tagsLeft} {variant === 'trustCircles' ? 'trust circles' : 'tags'}{' '}
              left
            </Text>
          )}
        </div>
      </div>
    </div>
  )
}
