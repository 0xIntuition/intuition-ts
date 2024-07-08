import * as React from 'react'

import { CurrencyType } from 'types'

import { Button, MonetaryValue, Text } from '..'

export interface StakeCardProps extends React.HTMLAttributes<HTMLDivElement> {
  tvl: number
  currency?: CurrencyType
  holders: number
  onBuyClick: () => void
  onViewAllClick: () => void
}

const StakeCard = ({
  tvl,
  currency,
  holders,
  onBuyClick,
  onViewAllClick,
  ...props
}: StakeCardProps) => {
  return (
    <div
      className="flex flex-col gap-2 w-full theme-border px-6 py-4 rounded-lg"
      {...props}
    >
      <Text variant="bodyLarge">Stake</Text>
      <div className="flex justify-between items-center">
        <div>
          <Text className="text-muted-foreground" variant="caption">
            TVL
          </Text>
          <MonetaryValue variant="body" value={tvl} currency={currency} />
        </div>
        <div>
          <Text className="text-muted-foreground" variant="caption">
            Holders
          </Text>
          <Text variant="body">{holders}</Text>
        </div>
      </div>
      <Button className="w-full mt-4" variant="primary" onClick={onBuyClick}>
        Buy
      </Button>
      <Button className="w-full" variant="text" onClick={onViewAllClick}>
        View all positions
      </Button>
    </div>
  )
}

export { StakeCard }
