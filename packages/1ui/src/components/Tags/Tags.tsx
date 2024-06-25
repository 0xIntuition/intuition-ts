import * as React from 'react'

import { Button, Text, TextVariant } from '..'
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

export interface TagsBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string
  value?: string | number
}

const TagsBadge = ({
  className,
  label,
  value,
  children,
  ...props
}: TagsBadgeProps) => {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow-md-subtle gap-1 w-min text-sm font-normal text-foreground border-border/30 hover:bg-primary/20',
        className,
      )}
      {...props}
    >
      {label || children}
      {value && (
        <>
          <span className="h-[2px] w-[2px] bg-primary" />
          {value}
        </>
      )}
    </div>
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
