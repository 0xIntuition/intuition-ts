import * as React from 'react'

import { Button, Text } from '..'

export interface StakeCardProps extends React.HTMLAttributes<HTMLDivElement> {
  tvl: string
  holders: number
  onBuyClick: () => void
  onViewAllClick: () => void
}

const StakeCard = ({
  tvl,
  holders,
  onBuyClick,
  onViewAllClick,
  ...props
}: StakeCardProps) => {
  return (
    <div
      className="flex flex-col gap-2 w-full border border-border/30 px-6 py-4 rounded-lg"
      {...props}
    >
      <Text variant="bodyLarge">Stake</Text>
      <div className="flex justify-between items-center">
        <div>
          <Text className="text-primary/80" variant="caption">
            TVL
          </Text>
          <Text variant="body">{tvl}</Text>
        </div>
        <div>
          <Text className="text-primary/80" variant="caption">
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
