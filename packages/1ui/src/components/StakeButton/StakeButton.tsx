import React from 'react'

import { cva, VariantProps } from 'class-variance-authority'
import { Button, ButtonVariant } from 'components/Button'
import { Icon, IconName } from 'components/Icon'
import { Text, TextVariant } from 'components/Text'
import { cn } from 'styles'
import { ClaimPosition, ClaimPositionType } from 'types'

export const StakeButtonVariant = {
  identity: 'identity',
  claimFor: 'claimFor',
  claimAgainst: 'claimAgainst',
}

const stakeButtonVariants = cva(
  'py-0.5 px-2.5 gap-1.5 h-9 w-16 rounded-xl disabled:bg-primary/5 disabled:border-primary/20 disabled:text-primary/20',
  {
    variants: {
      variant: {
        [StakeButtonVariant.identity]:
          'bg-primary/10 border-primary/30 hover:bg-primary/20 hover:border-primary/60 text-secondary',
        [StakeButtonVariant.claimFor]:
          'bg-for/10 border-for/30 hover:bg-for hover:border-for/50 text-for',
        [StakeButtonVariant.claimAgainst]:
          'bg-against/10 border-against/30 hover:bg-against hover:border-against/50 text-against',
      },
      userPosition: {
        true: 'bg-primary/20 border-primary/60 hover:border-primary/60',
      },
      positionDirection: {
        [ClaimPosition.claimFor]:
          'text-primary bg-for border-border/30 hover:border-border/30',
        [ClaimPosition.claimAgainst]:
          'text-primary bg-against border-border/30 hover:border-border/30',
      },
    },
    defaultVariants: {
      variant: StakeButtonVariant.identity,
    },
  },
)

export interface StakeButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof stakeButtonVariants> {
  numPositions: number
  direction?: ClaimPositionType
  userPosition?: boolean
  positionDirection?: ClaimPositionType
  className?: string
  onClick: () => void
}

const StakeButton = React.forwardRef<HTMLButtonElement, StakeButtonProps>(
  (
    {
      className,
      variant,
      numPositions,
      userPosition,
      direction,
      positionDirection,
      onClick,
      ...props
    },
    ref,
  ) => {
    return (
      <Button
        variant={ButtonVariant.ghost}
        className={cn(
          stakeButtonVariants({
            variant,
            userPosition,
            positionDirection,
            className,
          }),
        )}
        ref={ref}
        onClick={onClick}
        {...props}
      >
        <Icon
          name={
            direction === ClaimPosition.claimAgainst
              ? IconName.arrowDown
              : IconName.arrowUp
          }
          className="h-4 w-4"
        />
        <Text variant={TextVariant.caption} className="text-inherit">
          {numPositions}
        </Text>
      </Button>
    )
  },
)

StakeButton.displayName = 'StakeButton'

export { StakeButton }
