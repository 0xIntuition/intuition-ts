import * as React from 'react'

import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../../styles'

const valueDisplayVariants = cva(
  'inline-flex justify-center min-w-16 bg-primary/10 py-1 px-2',
  {
    variants: {
      variant: {
        default: '',
        directionFor: 'bg-success/20 text-success',
        directionAgainst: 'bg-destructive/20 text-destructive',
        attestorFor: 'text-success',
        attestorAgainst: 'text-destructive',
      },
    },
    defaultVariants: { variant: 'default' },
  },
)

export interface ValueDisplayProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof valueDisplayVariants> {}

const ValueDisplay = ({ className, variant, ...props }: ValueDisplayProps) => {
  return (
    <div
      className={cn(valueDisplayVariants({ variant }), className)}
      {...props}
    />
  )
}

export { ValueDisplay }
