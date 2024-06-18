import * as React from 'react'

import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../../styles'

export const ValueDisplayVariant = {
  default: 'default',
  directionFor: 'directionFor',
  directionAgainst: 'directionAgainst',
  attestorFor: 'attestorFor',
  attestorAgainst: 'attestorAgainst',
}

const valueDisplayVariants = cva(
  'inline-flex justify-center min-w-16 bg-primary/10 py-1 px-2',
  {
    variants: {
      variant: {
        [ValueDisplayVariant.default]: '',
        [ValueDisplayVariant.directionFor]: 'bg-success/20 text-success',
        [ValueDisplayVariant.directionAgainst]:
          'bg-destructive/20 text-destructive',
        [ValueDisplayVariant.attestorFor]: 'text-success',
        [ValueDisplayVariant.attestorAgainst]: 'text-destructive',
      },
    },
    defaultVariants: { variant: ValueDisplayVariant.default },
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
