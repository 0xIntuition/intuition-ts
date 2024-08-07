import React from 'react'

import { Button, ButtonVariant, MonetaryValue, Text } from '@0xintuition/1ui'

import { Link } from '@remix-run/react'

interface OverviewStakingHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  totalClaims: number
  totalIdentities: number
  totalStake: number
  link: string
}

const OverviewStakingHeader: React.FC<OverviewStakingHeaderProps> = ({
  totalClaims,
  totalIdentities,
  totalStake,
  link,
  ...props
}) => {
  return (
    <div
      className="flex flex-col gap-4 w-full p-6 bg-black rounded-xl border border-neutral-300/20 max-md:items-center"
      {...props}
    >
      <div className="flex items-center gap-1.5">
        <Text
          variant="body"
          weight="regular"
          className="text-secondary-foreground"
        >
          Staking
        </Text>
      </div>
      <div className="flex w-full gap-10">
        <div className="flex flex-col items-end max-md:items-center">
          <Text
            variant="caption"
            weight="regular"
            className="text-secondary-foreground"
          >
            Identities
          </Text>
          <Text variant="bodyLarge" weight="medium" className="items-center">
            {totalIdentities}
          </Text>
        </div>
        <div className="flex flex-col items-end max-md:items-center">
          <Text
            variant="caption"
            weight="regular"
            className="text-secondary-foreground"
          >
            Claims
          </Text>
          <Text variant="bodyLarge" weight="medium" className="items-center">
            {totalClaims}
          </Text>
        </div>
        <div className="flex flex-col items-end max-md:items-center">
          <Text
            variant="caption"
            weight="regular"
            className="text-secondary-foreground"
          >
            Total staked
          </Text>
          <MonetaryValue value={totalStake} currency="ETH" />
        </div>
        <div className="flex flex-col items-end justify-end ml-auto">
          <Link to={link} prefetch="intent">
            <Button variant={ButtonVariant.secondary} className="w-max mb-1">
              View all positions
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default OverviewStakingHeader
