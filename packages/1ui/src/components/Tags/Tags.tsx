import * as React from 'react'

import { Button, Icon, Tag, TagProps, Text, TextVariant } from 'components'

import { cn } from '../../styles'

export interface TagsProps extends React.HTMLAttributes<HTMLDivElement> {}

const Tags = ({ className, ...props }: TagsProps) => {
  return (
    <div
      className={cn('flex flex-col gap-4 w-full', className)}
      {...props}
    ></div>
  )
}

export interface TagsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  numberOfTags: number
}

const TagsContent = ({
  className,
  children,
  numberOfTags,
  ...props
}: TagsContentProps) => {
  const numberOfTagsNotDisplayed =
    numberOfTags - React.Children.toArray(children).length
  return (
    <div
      className={cn('flex flex-wrap gap-2 items-center', className)}
      {...props}
    >
      {children}
      <Text variant={TextVariant.body}>+ {numberOfTagsNotDisplayed} more</Text>
    </div>
  )
}

export interface TagWithValueProps extends TagProps {
  label?: string
  value?: string | number
  onRemove?: () => void
}

const TagWithValue = ({
  label,
  value,
  onRemove,
  ...props
}: TagWithValueProps) => {
  return (
    <Tag {...props} className="flex items-center cursor-default">
      {label}
      {value && (
        <>
          <span className="h-[2px] w-[2px] bg-primary mx-1" />
          {value}
        </>
      )}
      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-2 cursor-pointer"
          aria-label="Remove tag"
        >
          <Icon name="cross-large" className="h-3 w-3" />
        </button>
      )}
    </Tag>
  )
}

export interface TagsButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {}

const TagsButton = ({ ...props }: TagsButtonProps) => {
  return (
    <Button variant="secondary" {...props}>
      Add tags
    </Button>
  )
}

export { Tags, TagsContent, TagWithValue, TagsButton }
