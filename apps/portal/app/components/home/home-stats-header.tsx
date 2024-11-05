import React from 'react'

import { Separator, Text } from '@0xintuition/1ui'

import { PATHS } from '@consts/paths'
import { formatBalance } from '@lib/utils/misc'
import { Link } from '@remix-run/react'

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
  totalStaked,
  totalSignals,
  ...props
}: HomeStatsHeaderProps) {
  return (
    <div
      className="flex justify-between items-start md:items-center w-full py-4 px-6 bg-black rounded-xl theme-border"
      {...props}
    >
      <div className="flex gap-8 max-lg:flex-col max-lg:gap-2">
        <StatItem
          label="Identities"
          value={totalIdentities}
          link={PATHS.EXPLORE_IDENTITIES}
        />
        <StatItem
          label="Claims"
          value={totalClaims}
          link={PATHS.EXPLORE_CLAIMS}
        />
        <StatItem
          label="Users"
          value={totalUsers}
          link={`${PATHS.EXPLORE_IDENTITIES}?isUser=true`}
        />
      </div>
      <Separator
        orientation="vertical"
        className="mx-8 h-12 w-px bg-gradient-radial from-white via-white/20"
      />
      <div className="flex gap-8 max-lg:flex-col max-lg:gap-2">
        {totalStaked && (
          <StatItem
            label="TVL"
            value={`${formatBalance(totalStaked, 18)} ETH`}
          />
        )}
        <StatItem
          label="Signals"
          value={totalSignals}
          link={PATHS.GLOBAL_ACTIVITY}
        />
      </div>
    </div>
  )
}

interface StatItemProps {
  label: string
  value: string | number
  link?: string
}

function StatItem({ label, value, link }: StatItemProps) {
  const content = (
    <>
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
    </>
  )

  if (link) {
    return (
      <Link to={link} className="flex flex-col items-start">
        {content}
      </Link>
    )
  }

  return <div className="flex flex-col items-start">{content}</div>
}
