import React from 'react'

import { Text } from '@0xintuition/1ui'

interface HomeStatsHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  totalIdentities: number
  totalClaims: number
  totalUsers: number
  totalVolume: number
  totalStaked: number
  totalSignals: number
}

export function HomeStatsHeader({
  totalIdentities,
  totalClaims,
  totalUsers,
  totalVolume,
  totalStaked,
  totalSignals,
  ...props
}: HomeStatsHeaderProps) {
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
            {/* <MonetaryValue value={totalStake} currency="ETH" /> */}
          </div>
        </div>
      </div>
    </div>
  )
}
