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
      <div className="flex justify-between items-center max-sm:flex-col max-sm:gap-5">
        <div className="flex gap-10 max-sm:flex-col max-sm:gap-3 max-sm:items-center">
          <div className="flex gap-10">
            <div className="flex flex-col max-sm:items-center">
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
            <div className="flex flex-col max-sm:items-center">
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
          </div>
          <div className="flex flex-col max-sm:items-center">
            <Text
              variant="caption"
              weight="regular"
              className="text-secondary-foreground"
            >
              Total staked
            </Text>
            <MonetaryValue value={totalStake} currency="ETH" />
          </div>
        </div>
        <div className="flex">
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