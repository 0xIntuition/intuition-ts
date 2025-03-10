import { Suspense } from 'react'

import { AggregatedMetrics, ErrorStateCard, Icon } from '@0xintuition/1ui'
import { useGetStatsQuery } from '@0xintuition/graphql'

import { RevalidateButton } from '@components/revalidate-button'
import { HomeStatsHeaderSkeleton } from '@components/skeleton'
import { useLineaStats } from '@lib/hooks/useLineaStats'
import { Await } from '@remix-run/react'
import { Radio, User } from 'lucide-react'

export function HomeStatsHeader() {
  const { data: baseStats } = useGetStatsQuery(
    {},
    {
      queryKey: ['get-stats'],
    },
  )

  const { data: lineaStats } = useLineaStats()

  const baseStatsData = baseStats?.stats[0]
  const lineaStatsData = lineaStats?.stats[0]

  // Combine stats from both networks
  const combinedStats = {
    total_atoms:
      (baseStatsData?.total_atoms ?? 0) + (lineaStatsData?.total_atoms ?? 0),
    total_triples:
      (baseStatsData?.total_triples ?? 0) +
      (lineaStatsData?.total_triples ?? 0),
    total_signals:
      (baseStatsData?.total_signals ?? 0) +
      (lineaStatsData?.total_signals ?? 0),
    total_accounts:
      (baseStatsData?.total_accounts ?? 0) +
      (lineaStatsData?.total_accounts ?? 0),
    total_atoms_base: baseStatsData?.total_atoms ?? 0,
    total_atoms_linea: lineaStatsData?.total_atoms ?? 0,
  }

  return (
    <Suspense fallback={<HomeStatsHeaderSkeleton />}>
      <Await
        resolve={combinedStats}
        errorElement={
          <ErrorStateCard>
            <RevalidateButton />
          </ErrorStateCard>
        }
      >
        {(resolvedStats) => {
          if (!resolvedStats) {
            return <HomeStatsHeaderSkeleton />
          }

          const stats = resolvedStats
          return (
            <AggregatedMetrics
              metrics={[
                {
                  label: 'Atoms',
                  icon: <Icon name="fingerprint" className="w-4 h-4" />,
                  value: stats.total_atoms,
                },
                {
                  label: 'Triples',
                  icon: <Icon name="claim" className="w-4 h-4" />,
                  value: stats.total_triples,
                },
                {
                  label: 'Signals',
                  icon: <Radio className="w-4 h-4" />,
                  value: stats.total_signals,
                },
                {
                  label: 'Accounts',
                  icon: <User className="w-4 h-4" />,
                  value: stats.total_accounts,
                },
              ]}
              className="[&>div]:after:hidden sm:[&>div]:after:block"
            />
          )
        }}
      </Await>
    </Suspense>
  )
}
