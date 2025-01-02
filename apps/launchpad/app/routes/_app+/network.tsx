import {
  AggregatedMetrics,
  PageHeader,
  Skeleton,
  Text,
  TextVariant,
  TextWeight,
} from '@0xintuition/1ui'
import {
  fetcher,
  GetEventsDocument,
  GetEventsQuery,
  GetEventsQueryVariables,
  GetStatsDocument,
  GetStatsQuery,
  GetStatsQueryVariables,
  useGetEventsQuery,
  useGetStatsQuery,
} from '@0xintuition/graphql'

import ActivityFeed from '@components/ActivityFeed'
import ChapterProgress from '@components/ChapterProgress'
import { ErrorPage } from '@components/ErrorPage'
import logger from '@lib/utils/logger'
import { LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData, useSearchParams } from '@remix-run/react'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { formatUnits } from 'viem'

export async function loader({ request }: LoaderFunctionArgs) {
  logger('request', request)

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
    queryKey: ['get-events-global', { activityLimit, activityOffset }],
    queryFn: () =>
      fetcher<GetEventsQuery, GetEventsQueryVariables>(GetEventsDocument, {
        limit: activityLimit,
        offset: activityOffset,
        addresses: [],
        orderBy: [{ block_timestamp: 'desc' }],
        where: {
          type: {
            _neq: 'FeesTransfered',
          },
        },
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

  const { data: eventsData } = useGetEventsQuery(
    {
      limit: activityLimit,
      offset: activityOffset,
      addresses: [],
      orderBy: [{ block_timestamp: 'desc' }],
      where: {
        type: {
          _neq: 'FeesTransfered',
        },
      },
    },
    {
      queryKey: [
        'get-events-global',
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
      <PageHeader title="Network" lastUpdated={'3s'} />
      <ChapterProgress
        currentChapter={'Chapter I: Genesis'}
        nextChapter={'Chapter II: Population'}
        totalStages={4}
        currentStage={1}
        endTime={new Date(Date.now() + 172800000)}
      />
      <div className="flex flex-col rounded-xl overflow-hidden theme-border">
        <div className="relative w-full">
          <Skeleton className="w-full aspect-[2.15/1] sm:aspect-[2.5/1] md:aspect-[3/1] rounded-b-none animate-none" />
        </div>
        <div className="py-4 bg-gradient-to-b from-[#060504] to-[#101010]">
          <AggregatedMetrics
            metrics={[
              {
                label: 'TVL',
                value: +formatUnits(stats?.contract_balance ?? 0, 18),
                suffix: 'ETH',
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
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Text variant={TextVariant.headline} weight={TextWeight.medium}>
          Data Stream
        </Text>
        <ActivityFeed
          activities={{
            events: eventsData?.events || [],
            total: {
              aggregate: { count: eventsData?.total.aggregate?.count || 0 },
            },
          }}
        />
      </div>
    </>
  )
}
