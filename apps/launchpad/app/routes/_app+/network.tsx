import {
  AggregatedMetrics,
  Icon,
  Text,
  TextVariant,
  TextWeight,
} from '@0xintuition/1ui'
import {
  fetcher,
  GetStatsDocument,
  GetStatsQuery,
  GetStatsQueryVariables,
  useGetStatsQuery,
} from '@0xintuition/graphql'

import { ActivityFeedPortal } from '@components/activity-feed-portal'
import { ErrorPage } from '@components/error-page'
import { LoadingState } from '@components/loading-state'
import { PageHeader } from '@components/page-header'
import {
  GetActivityDocument,
  GetActivityQuery,
  GetActivityQueryVariables,
  useGetActivityQuery,
} from '@lib/graphql'
import { useLineaStats } from '@lib/hooks/useLineaStats'
import { LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData, useSearchParams } from '@remix-run/react'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { Radio, User } from 'lucide-react'

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const activityLimit = parseInt(url.searchParams.get('activityLimit') || '10')
  const activityOffset = parseInt(url.searchParams.get('activityOffset') || '0')

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['get-stats'],
    queryFn: () =>
      fetcher<GetStatsQuery, GetStatsQueryVariables>(GetStatsDocument, {}),
  })

  await queryClient.prefetchQuery({
    queryKey: ['get-signals-global', { activityLimit, activityOffset }],
    queryFn: () =>
      fetcher<GetActivityQuery, GetActivityQueryVariables>(
        GetActivityDocument,
        {
          limit: activityLimit,
          offset: activityOffset,
          orderBy: [{ block_timestamp: 'desc' }],
        },
      ),
  })

  return {
    dehydratedState: dehydrate(queryClient),
    initialParams: {
      activityLimit,
      activityOffset,
    },
  }
}

export function ErrorBoundary() {
  return <ErrorPage routeName="network" />
}

export default function Network() {
  const { initialParams } = useLoaderData<typeof loader>()
  const [searchParams] = useSearchParams()

  const activityLimit = parseInt(
    searchParams.get('activityLimit') || String(initialParams.activityLimit),
  )
  const activityOffset = parseInt(
    searchParams.get('activityOffset') || String(initialParams.activityOffset),
  )

  const { data: baseStats, isLoading: isLoadingBaseStats } = useGetStatsQuery(
    {},
    {
      queryKey: ['get-stats'],
    },
  )

  const { data: lineaStats, isLoading: isLoadingLineaStats } = useLineaStats()

  const { data: activityData, isLoading: isLoadingActivity } =
    useGetActivityQuery(
      {
        limit: activityLimit,
        offset: activityOffset,
        orderBy: [{ block_timestamp: 'desc' }],
      },
      {
        queryKey: [
          'get-signals-global',
          {
            activityLimit,
            activityOffset,
          },
        ],
      },
    )
  const isLoading =
    isLoadingBaseStats || isLoadingLineaStats || isLoadingActivity

  if (isLoading) {
    return <LoadingState />
  }

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
    <>
      <PageHeader title="Network" />
      <AggregatedMetrics
        metrics={[
          {
            label: 'Atoms',
            icon: <Icon name="fingerprint" className="w-4 h-4" />,
            value: combinedStats.total_atoms,
          },
          {
            label: 'Triples',
            icon: <Icon name="claim" className="w-4 h-4" />,
            value: combinedStats.total_triples,
          },
          {
            label: 'Signals',
            icon: <Radio className="w-4 h-4" />,
            value: combinedStats.total_signals,
          },
          {
            label: 'Accounts',
            icon: <User className="w-4 h-4" />,
            value: combinedStats.total_accounts,
          },
        ]}
        className="[&>div]:after:hidden sm:[&>div]:after:block"
      />
      <div className="flex flex-col gap-4">
        <Text variant={TextVariant.headline} weight={TextWeight.medium}>
          Activity Feed
        </Text>
        <ActivityFeedPortal activities={activityData?.signals || []} />
      </div>
    </>
  )
}
