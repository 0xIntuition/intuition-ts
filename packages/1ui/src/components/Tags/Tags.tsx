import * as React from 'react'

import { Badge, BadgeProps, Button, Text, TextVariant } from '..'
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

export interface TagsBadgesProps extends React.HTMLAttributes<HTMLDivElement> {
  numberOfTags: number
}

const TagsBadges = ({
  className,
  children,
  numberOfTags,
  ...props
}: TagsBadgesProps) => {
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

export interface TagsBadgeProps extends BadgeProps {
  label: string
  value: string | number
}

const TagsBadge = ({ className, label, value, ...props }: TagsBadgeProps) => {
  return (
    <Badge
      variant="outline"
      className={cn('flex gap-1 w-min text-sm font-normal', className)}
      {...props}
    >
      {label}
      <span className="h-[2px] w-[2px] bg-primary" />
      {value}
    </Badge>
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

export { Tags, TagsBadges, TagsBadge, TagsButton }
