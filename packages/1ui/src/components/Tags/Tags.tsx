import * as React from 'react'

import {
  Button,
  Icon,
  Tag,
  TagProps,
  Text,
  TextVariant,
  Trunctacular,
} from 'components'

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
      {numberOfTagsNotDisplayed > 0 && (
        <Text variant={TextVariant.body}>
          + {numberOfTagsNotDisplayed} more
        </Text>
      )}
    </div>
  )
}

export interface TagWithValueProps extends TagProps {
  label?: string
  value?: string | number
  onRemove?: () => void
  onStake?: () => void
  className?: string | undefined
}

const TagWithValue = ({
  label,
  value,
  onRemove,
  onStake,
  className,
  ...props
}: TagWithValueProps) => {
  const TagContent = (
    <>
      <Trunctacular value={label ? label : ''} />
      {value && (
        <>
          <span className="h-[2px] w-[2px] bg-primary mx-1" />
          {value}
        </>
      )}
      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onRemove()
          }}
          className="ml-2 cursor-pointer"
          aria-label="Remove tag"
        >
          <Icon name="cross-large" className="h-3 w-3" />
        </button>
      )}
    </>
  )

  return onStake ? (
    <button onClick={onStake} className={cn('cursor-pointer', className)}>
      <Tag {...props} className={cn('flex items-center pl-2', className)}>
        {TagContent}
      </Tag>
    </button>
  ) : (
    <Tag
      {...props}
      className={cn('flex items-center cursor-default pl-2', className)}
    >
      {TagContent}
    </Tag>
  )
}

export interface TagsButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {}

const TagsButton = ({ ...props }: TagsButtonProps) => {
  return (
    <Button variant="secondary" {...props}>
      View all tags
    </Button>
  )
}

export { Tags, TagsContent, TagWithValue, TagsButton }
