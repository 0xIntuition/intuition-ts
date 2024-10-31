import React from 'react'

import { cva, VariantProps } from 'class-variance-authority'
import { Button, ButtonVariant } from 'components/Button'
import { Icon, IconName } from 'components/Icon'
import { Text, TextVariant } from 'components/Text'
import { cn } from 'styles'

export const StakeButtonVariant = {
  identity: 'identity',
  claimFor: 'claimFor',
  claimAgainst: 'claimAgainst',
}

const stakeButtonVariants = cva('py-0.5 px-2.5 gap-1.5 h-9 w-16', {
  variants: {
    variant: {
      [StakeButtonVariant.identity]:
        'bg-primary/10 border-primary/30 hover:bg-primary/20 hover:border-primary/60 disabled:bg-primary/5 disabled:border-primary/20 text-primary',
      [StakeButtonVariant.claimFor]:
        'bg-for/10 border-for/30 hover:bg-for hover:border-for/50 text-for',
      [StakeButtonVariant.claimAgainst]:
        'bg-against/10 border-against/30 hover:bg-against hover:border-against/50 text-against',
    },
  },
  defaultVariants: {
    variant: StakeButtonVariant.identity,
  },
})

export interface StakeButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof stakeButtonVariants> {
  numPositions: number
  className?: string
}

const StakeButton = React.forwardRef<HTMLButtonElement, StakeButtonProps>(
  ({ className, variant, numPositions, ...props }, ref) => {
    return (
      <Button
        variant={ButtonVariant.ghost}
        className={cn(stakeButtonVariants({ variant, className }))}
        ref={ref}
        onClick={() => console.log('Button Clicked!')}
        {...props}
      >
        <Icon name={IconName.arrowUp} className="h-4 w-4" />{' '}
        <Text variant={TextVariant.caption} className="text-inherit">
          {numPositions}
        </Text>
      </Button>
    )
  },
)

StakeButton.displayName = 'StakeButton'

export { StakeButton }
