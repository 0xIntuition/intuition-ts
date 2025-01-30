import React from 'react'

import {
  Button,
  ButtonVariant,
  ClaimPosition,
  ClaimPositionType,
  cn,
  Text,
  TextVariant,
} from '@0xintuition/1ui'

import { cva, VariantProps } from 'class-variance-authority'
import { ArrowBigDown, ArrowBigUp } from 'lucide-react'

export const StakeButtonVariant = {
  identity: 'identity',
  claimFor: 'claimFor',
  claimAgainst: 'claimAgainst',
}

const stakeButtonVariants = cva(
  'py-0.5 px-2 gap-1 h-9 w-12 rounded-xl disabled:opacity-50',
  {
    variants: {
      variant: {
        [StakeButtonVariant.identity]:
          'bg-primary/10 border-primary/30 hover:bg-primary/20 hover:border-primary/60 text-secondary',
        [StakeButtonVariant.claimFor]:
          'bg-success/10 border-success/30 hover:bg-success/20 hover:border-success/50 hover:text-success text-success fill-success disabled:fill-transparent',
        [StakeButtonVariant.claimAgainst]:
          'bg-destructive/10 border-destructive/30 hover:bg-destructive/20 hover:border-destructive/50 hover:text-destructive text-destructive fill-destructive',
      },
      positionDirection: {
        [ClaimPosition.claimFor]:
          'text-success fill-success bg-success/10 border-success/30 hover:border-success/30',
        [ClaimPosition.claimAgainst]:
          'text-destructive fill-destructive bg-destructive/10 border-destructive/30 hover:border-destructive/30',
      },
    },
    defaultVariants: {
      variant: StakeButtonVariant.identity,
    },
  },
)

export interface SignalButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof stakeButtonVariants> {
  numPositions: number
  direction?: ClaimPositionType
  positionDirection?: ClaimPositionType
  className?: string
  onClick: () => void
}

const SignalButton = React.forwardRef<HTMLButtonElement, SignalButtonProps>(
  (
    {
      className,
      variant,
      numPositions,
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
            positionDirection,
            className,
          }),
        )}
        ref={ref}
        onClick={onClick}
        {...props}
      >
        {direction === ClaimPosition.claimAgainst ? (
          <ArrowBigDown className="w-4 h-4 fill-inherit" />
        ) : (
          <ArrowBigUp className="w-4 h-4 fill-inherit" />
        )}
        <Text variant={TextVariant.caption} className="text-inherit">
          {numPositions}
        </Text>
      </Button>
    )
  },
)

SignalButton.displayName = 'SignalButton'

export { SignalButton }
