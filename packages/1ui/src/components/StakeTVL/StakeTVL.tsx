import React from 'react'

import { Text, TextVariant } from 'components/Text'
import { cn } from 'styles'

export interface StakeTVLProps {
  amount: string
  currency: string
  className?: string
}

const StakeTVL = React.forwardRef<HTMLDivElement, StakeTVLProps>(
  ({ amount, currency, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex flex-col items-end', className)}
        {...props}
      >
        <Text variant={TextVariant.caption} className="text-primary/70">
          TVL
        </Text>
        <Text variant={TextVariant.caption}>
          {amount} {currency}
        </Text>
      </div>
    )
  },
)

StakeTVL.displayName = 'StakeTVL'

export { StakeTVL }
