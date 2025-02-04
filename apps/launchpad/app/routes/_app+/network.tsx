import {
  // AggregatedMetrics,
  PageHeader,
  Text,
  TextVariant,
  TextWeight,
} from '@0xintuition/1ui'
import {
  fetcher,
  GetSignalsDocument,
  GetSignalsQuery,
  GetSignalsQueryVariables,
  // GetStatsDocument,
  // GetStatsQuery,
  // GetStatsQueryVariables,
  useGetSignalsQuery,
} from '@0xintuition/graphql'

import ActivityFeed from '@components/activity-feed'
import { ErrorPage } from '@components/error-page'
// import logger from '@lib/utils/logger'
import { LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData, useSearchParams } from '@remix-run/react'
import { dehydrate, QueryClient } from '@tanstack/react-query'

// import { formatUnits } from 'viem'

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const activityLimit = parseInt(url.searchParams.get('activityLimit') || '10')
  const activityOffset = parseInt(url.searchParams.get('activityOffset') || '0')

  const queryClient = new QueryClient()

  // await queryClient.prefetchQuery({
  //   queryKey: ['get-stats'],
  //   queryFn: () =>
  //     fetcher<GetStatsQuery, GetStatsQueryVariables>(GetStatsDocument, {}),
  // })

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

  // const { data: systemStats } = useGetStatsQuery(
  //   {},
  //   {
  //     queryKey: ['get-stats'],
  //   },
  // )
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

  // const stats = systemStats?.stats[0]

  return (
    <>
      <PageHeader title="Network" lastUpdated={'3s'} />
      <div className="flex flex-col rounded-xl overflow-hidden">
        {/* <div className="py-4 bg-gradient-to-b from-[#060504] to-[#101010]">
          <AggregatedMetrics
            metrics={[
              {
                label: 'TVL',
                value: +formatUnits(stats?.contract_balance ?? 0, 18),
                suffix: 'ETH',
                precision: 2,
              },
              { label: 'Atoms', value: stats?.total_atoms ?? 0 },
              { label: 'Triples', value: stats?.total_triples ?? 0 },
              {
                label: 'Signals',
                value: stats?.total_signals ?? 0,
                hideOnMobile: true,
              },
              { label: 'Users', value: stats?.total_accounts ?? 0 },
            ]}
            className="[&>div]:after:hidden sm:[&>div]:after:block"
          />
        </div> */}
      </div>
      <div className="flex flex-col gap-4">
        <Text variant={TextVariant.headline} weight={TextWeight.medium}>
          Recent Activity
        </Text>
        <ActivityFeed
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
