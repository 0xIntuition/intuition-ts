import * as React from 'react'

import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../../styles'

export const TagVariant = {
  primary: 'primary',
  success: 'success',
  accent: 'accent',
  social: 'social',
  warning: 'warning',
  against: 'against',
  for: 'for',
  destructive: 'destructive',
}

export const TagSize = {
  default: 'default',
  sm: 'sm',
}

const tagVariants = cva(
  'inline-flex items-center gap-1 rounded-full px-2 py-0.5 border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted-foreground',
  {
    variants: {
      variant: {
        [TagVariant.primary]:
          'bg-primary/10 text-primary/90 border-primary/20 hover:bg-primary/20 hover:text-primary hover:border-primary/40',
        [TagVariant.success]:
          'bg-success/10 text-success/90 border-success/40 hover:bg-success/30 hover:text-success hover:border-success/60',
        [TagVariant.accent]:
          'bg-accent/10 text-accent/90 border-accent/40 hover:bg-accent/30 hover:text-accent hover:border-accent/60',
        [TagVariant.social]:
          'bg-social/10 text-social/90 border-social/40 hover:bg-social/30 hover:text-social hover:border-social/60',
        [TagVariant.warning]:
          'bg-warning/10 text-warning/90 border-warning/40 hover:bg-warning/30 hover:text-warning hover:border-warning/60',
        [TagVariant.against]:
          'bg-against/10 text-against/90 border-against/40 hover:bg-against/30 hover:text-against hover:border-against/60',
        [TagVariant.for]:
          'bg-for/10 text-for/90 border-for/30 hover:bg-for/40 hover:text-for hover:border-for/60',
        [TagVariant.destructive]:
          'bg-destructive/10 text-destructive/90 border-destructive/40 hover:bg-destructive/30 hover:text-destructive hover:border-destructive/60',
      },
      size: {
        [TagSize.default]: 'text-base font-normal',
        [TagSize.sm]: 'text-xs font-medium',
      },
    },
    defaultVariants: {
      variant: TagVariant.primary,
      size: TagSize.default,
    },
  },
)

export interface TagProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof tagVariants> {}

function Tag({ className, variant, size, ...props }: TagProps) {
  return (
    <button
      className={cn(tagVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Tag, tagVariants }
