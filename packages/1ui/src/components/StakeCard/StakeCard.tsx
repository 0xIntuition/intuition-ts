import * as React from 'react'

import { cn } from 'styles'
import { CurrencyType, Identity, IdentityType } from 'types'

import { Button, IdentityTag, MonetaryValue, Text, Trunctacular } from '..'

export interface StakeCardProps extends React.HTMLAttributes<HTMLDivElement> {
  tvl: number
  currency?: CurrencyType
  holders: number
  variant?: IdentityType
  identityImgSrc: string
  identityDisplayName: string
  onBuyClick: () => void
  onViewAllClick?: () => void
}

const StakeCard = ({
  tvl,
  currency,
  holders,
  variant = Identity.user,
  identityImgSrc,
  identityDisplayName,
  onBuyClick,
  onViewAllClick,
  className,
  ...props
}: StakeCardProps) => {
  return (
    <div
      className={cn(
        'flex flex-col justify-between w-full h-full theme-border px-6 py-4 rounded-lg',
        className,
      )}
      {...props}
    >
      <div className="flex flex-col gap-2 w-full">
        <Text variant="bodyLarge" className="flex flex-row gap-1.5">
          Conviction in{' '}
          <IdentityTag imgSrc={identityImgSrc} variant={variant}>
            <Trunctacular value={identityDisplayName} maxStringLength={16} />
          </IdentityTag>
        </Text>
        <div className="flex justify-between items-center">
          <div>
            <Text className="text-muted-foreground" variant="caption">
              TVL
            </Text>
            <MonetaryValue variant="body" value={tvl} currency={currency} />
          </div>
          <div className="flex flex-col items-end">
            <Text className="text-muted-foreground" variant="caption">
              Depositors
            </Text>
            <Text variant="body">{holders}</Text>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <Button className="w-full mt-4" variant="primary" onClick={onBuyClick}>
          Deposit
        </Button>
        {onViewAllClick && (
          <Button className="w-full" variant="text" onClick={onViewAllClick}>
            View all positions
          </Button>
        )}
      </div>
    </div>
  )
}

export { StakeCard }
