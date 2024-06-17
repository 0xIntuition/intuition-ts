import * as React from 'react'

import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../../styles'

export const BadgeVariant = {
  default: 'default',
  secondary: 'secondary',
  destructive: 'destructive',
  outline: 'outline',
}

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow-md-subtle',
  {
    variants: {
      variant: {
        [BadgeVariant.default]:
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        [BadgeVariant.secondary]:
          'primary-gradient-subtle text-primary/70 border-primary/10 hover:text-primary',
        [BadgeVariant.destructive]:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        [BadgeVariant.outline]:
          'text-foreground border-border/30 hover:bg-primary/20',
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
