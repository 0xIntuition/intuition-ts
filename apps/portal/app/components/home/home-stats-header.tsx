import React from 'react'

import { Separator, Text } from '@0xintuition/1ui'

interface HomeStatsHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  totalIdentities: number
  totalClaims: number
  totalUsers: number
  // totalVolume?: number  omitting until we can support this
  totalStaked?: number
  totalSignals: number
}

export function HomeStatsHeader({
  totalIdentities,
  totalClaims,
  totalUsers,
  // totalVolume,  omitting until we can support this
  // totalStaked,
  totalSignals,
  ...props
}: HomeStatsHeaderProps) {
  return (
    <div
      className="flex justify-between items-start md:items-center w-full py-4 px-6 bg-black rounded-xl theme-border"
      {...props}
    >
      <div className="flex gap-8 max-lg:flex-col max-lg:gap-2">
        <StatItem label="Identities" value={totalIdentities} />
        <StatItem label="Claims" value={totalClaims} />
        {/* <StatItem label="Users" value={totalUsers} /> */}
      </div>
      <Separator
        orientation="vertical"
        className="mx-8 h-12 w-px bg-gradient-radial from-white via-white/20"
      />
      <div className="flex gap-8 max-lg:flex-col max-lg:gap-2">
        {/* {totalStaked && <StatItem label="TVL" value={`${totalStaked} ETH`} />} */}
        <StatItem label="Users" value={totalUsers} />
        <StatItem label="Signals" value={totalSignals} />
      </div>
    </div>
  )
}

interface StatItemProps {
  label: string
  value: string | number
}

function StatItem({ label, value }: StatItemProps) {
  return (
    <div className="flex flex-col items-start">
      <Text
        variant="caption"
        weight="regular"
        className="text-secondary-foreground"
      >
        {label}
      </Text>
      <Text variant="headline" weight="medium">
        {value}
      </Text>
    </div>
  )
}
