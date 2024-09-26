import * as React from 'react'

import { Button, cn, Icon, TagWithValue, Text } from '@0xintuition/1ui'

const TagsListVariants = {
  trustCircle: 'trust circle',
  tag: 'tag',
} as const

type TagsListVariantsType = keyof typeof TagsListVariants

export interface TagsListInputProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant: TagsListVariantsType
  tags: { name: string; id: string; tagCount?: number | null }[]
  maxTags: number
  onAddTag: () => void
  onRemoveTag: (id: string) => void
  PopoverTriggerComponent: React.ComponentType<{ children: React.ReactNode }>
}

const getTagText = (variant: TagsListVariantsType, count: number) => {
  const tagText = TagsListVariants[variant]
  return `${count} ${tagText}${count === 1 ? '' : 's'}`
}

export const TagsListInputPortal = ({
  variant,
  tags,
  maxTags,
  onAddTag,
  onRemoveTag,
  className,
  PopoverTriggerComponent,
  ...props
}: TagsListInputProps) => {
  const tagsLeft = maxTags - tags.length

  return (
    <div className="w-full" {...props}>
      <div className={cn('flex flex-wrap gap-2.5 items-center', className)}>
        {tags.map((tag) => (
          <TagWithValue
            key={tag.id}
            label={tag.name}
            value={tag.tagCount ?? 0}
            onRemove={() => onRemoveTag(tag.id)}
          />
        ))}
        {tags.length < 5 ? (
          <div className="flex items-center gap-2">
            <PopoverTriggerComponent>
              <Button
                variant="secondary"
                size="sm"
                onClick={onAddTag}
                className="rounded-full px-2 mr-1"
              >
                <Icon name="plus-small" />
              </Button>
            </PopoverTriggerComponent>
            <Text variant="footnote" className="text-secondary-foreground">
              {`Add up to ${tagsLeft} ${TagsListVariants[variant]}${tagsLeft === 1 ? '' : 's'}`}
            </Text>
          </div>
        ) : (
          <Text variant="footnote" className="text-secondary-foreground">
            {getTagText(variant, tagsLeft)} left
          </Text>
        )}
      </div>
    </div>
  )
}
