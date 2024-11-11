import React, { Suspense } from 'react'

import { ErrorStateCard, Separator, Text } from '@0xintuition/1ui'
import { useGetStatsQuery } from '@0xintuition/graphql'

import { RevalidateButton } from '@components/revalidate-button'
import { HomeStatsHeaderSkeleton } from '@components/skeleton'
import { PATHS } from '@consts/paths'
import { formatBalance } from '@lib/utils/misc'
import { Await, Link } from '@remix-run/react'

interface HomeStatsHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function HomeStatsHeader({ ...props }: HomeStatsHeaderProps) {
  const { data: systemStats } = useGetStatsQuery(
    {},
    {
      queryKey: ['get-stats'],
    },
  )

  return (
    <Suspense fallback={<HomeStatsHeaderSkeleton />}>
      <Await
        resolve={systemStats}
        errorElement={
          <ErrorStateCard>
            <RevalidateButton />
          </ErrorStateCard>
        }
      >
        {(resolvedStats) => {
          if (!resolvedStats?.stats?.[0]) {
            return <HomeStatsHeaderSkeleton />
          }

          const stats = resolvedStats.stats[0]
          return (
            <div
              className="flex justify-between items-start md:items-center w-full py-4 px-6 bg-black rounded-xl theme-border"
              {...props}
            >
              <div className="flex gap-8 max-lg:flex-col max-lg:gap-2">
                <StatItem
                  label="Identities"
                  value={stats.totalAtoms}
                  link={PATHS.EXPLORE_IDENTITIES}
                />
                <StatItem
                  label="Claims"
                  value={stats.totalTriples}
                  link={PATHS.EXPLORE_CLAIMS}
                />
                <StatItem
                  label="Users"
                  value={stats.totalAccounts}
                  link={`${PATHS.EXPLORE_IDENTITIES}?isUser=true`}
                />
              </div>
              <Separator
                orientation="vertical"
                className="mx-8 h-12 w-px bg-gradient-radial from-white via-white/20"
              />
              <div className="flex gap-8 max-lg:flex-col max-lg:gap-2">
                {stats.contractBalance && (
                  <StatItem
                    label="TVL"
                    value={`${formatBalance(stats.contractBalance, 18)} ETH`}
                  />
                )}
                <StatItem
                  label="Signals"
                  value={stats.totalSignals}
                  link={PATHS.GLOBAL_ACTIVITY}
                />
              </div>
            </div>
          )
        }}
      </Await>
    </Suspense>
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
