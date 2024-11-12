import * as React from 'react'

import {
  Button,
  ButtonVariant,
  Icon,
  IconName,
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
  link?: string
}

const TagsContent = ({
  className,
  children,
  numberOfTags,
  link,
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
        <a href={link}>
          <Text variant={TextVariant.body}>
            + {numberOfTagsNotDisplayed} more
          </Text>
        </a>
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
  maxStringLength?: number
}

const TagWithValue = ({
  label,
  value,
  onRemove,
  onStake,
  className,
  maxStringLength = 24,
  ...props
}: TagWithValueProps) => {
  const TagContent = (
    <div className="flex flex-row gap-1.5 items-center">
      <Trunctacular
        value={label ? label : ''}
        maxStringLength={maxStringLength}
        className="px-0.5"
      />
      {value !== undefined && value !== null && (
        <div className="flex flex-row gap-1.5 items-center">
          <span className="h-[2px] w-[2px] bg-primary" />
          {value}
        </div>
      )}
      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onRemove()
          }}
          className="ml-1 cursor-pointer"
          aria-label="Remove tag"
        >
          <Icon name="cross-large" className="h-3 w-3" />
        </button>
      )}
    </div>
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
    <Button variant={ButtonVariant.secondary} className="w-full" {...props}>
      <Icon name={IconName.bookmark} className="w-4 h-4" />
      View All Tags
    </Button>
  )
}

export { Tags, TagsButton, TagsContent, TagWithValue }
