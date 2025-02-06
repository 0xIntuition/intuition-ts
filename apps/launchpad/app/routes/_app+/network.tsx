import {
  AggregatedMetrics,
  Icon,
  Text,
  TextVariant,
  TextWeight,
} from '@0xintuition/1ui'
import {
  fetcher,
  GetSignalsDocument,
  GetSignalsQuery,
  GetSignalsQueryVariables,
  GetStatsDocument,
  GetStatsQuery,
  GetStatsQueryVariables,
  // GetStatsDocument,
  // GetStatsQuery,
  // GetStatsQueryVariables,
  useGetSignalsQuery,
  useGetStatsQuery,
} from '@0xintuition/graphql'

import { ActivityFeedPortal } from '@components/activity-feed-portal'
import { ErrorPage } from '@components/error-page'
// import logger from '@lib/utils/logger'
import { LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData, useSearchParams } from '@remix-run/react'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { Radio, User } from 'lucide-react'
import { formatUnits } from 'viem'

// import { formatUnits } from 'viem'

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
      fetcher<GetSignalsQuery, GetSignalsQueryVariables>(GetSignalsDocument, {
        limit: activityLimit,
        offset: activityOffset,
        addresses: [],
        orderBy: [{ block_timestamp: 'desc' }],
      }),
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

  const { data: systemStats } = useGetStatsQuery(
    {},
    {
      queryKey: ['get-stats'],
    },
  )
  // logger('systemStats', systemStats)

  const { data: signalsData } = useGetSignalsQuery(
    {
      limit: activityLimit,
      offset: activityOffset,
      addresses: [],
      orderBy: [{ block_timestamp: 'desc' }],
    },
    {
      queryKey: [
        'get-signals-global',
        {
          limit: activityLimit,
          offset: activityOffset,
          where: {
            type: {
              _neq: 'FeesTransfered',
            },
          },
        },
      ],
    },
  )

  const stats = systemStats?.stats[0]

  return (
    <>
      <AggregatedMetrics
        metrics={[
          {
            label: 'TVL',
            icon: <Icon name="moneybag" className="w-4 h-4" />,
            value: +formatUnits(stats?.contract_balance ?? 0, 18),
            suffix: 'ETH',
            precision: 2,
          },
          {
            label: 'Atoms',
            icon: <Icon name="fingerprint" className="w-4 h-4" />,
            value: stats?.total_atoms ?? 0,
          },
          {
            label: 'Triples',
            icon: <Icon name="claim" className="w-4 h-4" />,
            value: stats?.total_triples ?? 0,
          },
          {
            label: 'Signals',
            icon: <Radio className="w-4 h-4" />,
            value: stats?.total_signals ?? 0,
            hideOnMobile: true,
          },
          {
            label: 'Users',
            icon: <User className="w-4 h-4" />,
            value: stats?.total_accounts ?? 0,
          },
        ]}
        className="[&>div]:after:hidden sm:[&>div]:after:block"
      />
      <div className="flex flex-col gap-4">
        <Text variant={TextVariant.headline} weight={TextWeight.medium}>
          Network Activity
        </Text>
        <ActivityFeedPortal
          activities={{
            signals: signalsData?.signals || [],
            total: {
              aggregate: { count: signalsData?.total.aggregate?.count || 0 },
            },
          }}
        />
      </div>
    </>
  )
}
