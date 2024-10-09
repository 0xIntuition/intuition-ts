import * as React from 'react'

import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../../styles'

export const BadgeVariant = {
  default: 'default',
  success: 'success',
  accent: 'accent',
  social: 'social',
  warning: 'warning',
  against: 'against',
  for: 'for',
  destructive: 'destructive',
}

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-md pl-1 pr-1.5 py-0.5 text-sm font-light text-foreground/65',
  {
    variants: {
      variant: {
        [BadgeVariant.default]: 'bg-primary/10',
        [BadgeVariant.success]: 'bg-success/50',
        [BadgeVariant.accent]: 'bg-accent/50',
        [BadgeVariant.social]: 'bg-social/50',
        [BadgeVariant.warning]: 'bg-warning/50',
        [BadgeVariant.against]: 'bg-against/50',
        [BadgeVariant.for]: 'bg-for/50',
        [BadgeVariant.destructive]: 'bg-destructive/50',
      },
    },
    defaultVariants: {
      variant: BadgeVariant.default,
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
