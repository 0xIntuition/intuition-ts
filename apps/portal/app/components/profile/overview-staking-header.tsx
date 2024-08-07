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

export function OverviewStakingHeader({
  totalClaims,
  totalIdentities,
  totalStake,
  link,
  ...props
}: OverviewStakingHeaderProps): React.ReactElement {
  return (
    <div
      className="flex flex-col gap-4 w-full p-6 bg-black rounded-xl border border-neutral-300/20"
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
      <div className="flex flex-col md:flex-row w-full gap-4 md:gap-10">
        <div className="flex justify-between md:flex-col md:items-start">
          <Text
            variant="caption"
            weight="regular"
            className="text-secondary-foreground"
          >
            Identities
          </Text>
          <Text variant="bodyLarge" weight="medium">
            {totalIdentities}
          </Text>
        </div>
        <div className="flex justify-between md:flex-col md:items-start">
          <Text
            variant="caption"
            weight="regular"
            className="text-secondary-foreground"
          >
            Claims
          </Text>
          <Text variant="bodyLarge" weight="medium">
            {totalClaims}
          </Text>
        </div>
        <div className="flex justify-between md:flex-col md:items-start">
          <Text
            variant="caption"
            weight="regular"
            className="text-secondary-foreground"
          >
            Total staked
          </Text>
          <MonetaryValue value={totalStake} currency="ETH" />
        </div>
        <div className="flex justify-center md:justify-end md:ml-auto mt-4 md:mt-0">
          <Link to={link} prefetch="intent">
            <Button
              variant={ButtonVariant.secondary}
              className="w-full md:w-max"
            >
              View all positions
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
