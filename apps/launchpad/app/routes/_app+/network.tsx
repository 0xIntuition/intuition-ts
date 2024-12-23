import {
  NetworkStats,
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
  logger('eventsData', eventsData)
  logger('systemStats', systemStats)

  const stats = systemStats?.stats[0]

  return (
    <div className="flex-1 p-10 max-lg:p-6">
      <div className="mx-auto max-w-[1280px] flex flex-col gap-8">
        <PageHeader title="Network" lastUpdated={'3s'} />
        <ChapterProgress
          currentChapter={'Chapter I: Genesis'}
          nextChapter={'Chapter II: Population'}
          totalStages={4}
          currentStage={1}
          endTime={new Date(Date.now() + 172800000)}
        />
        <div className="flex flex-col rounded-xl overflow-hidden theme-border">
          <Skeleton className="h-[695px] w-full animate-none rounded-b-none" />
          <div className="py-4 bg-gradient-to-b from-[#060504] to-[#101010]">
            <NetworkStats
              tvl={+formatUnits(stats?.contract_balance ?? 0, 18)}
              atomsCount={stats?.total_atoms ?? 0}
              triplesCount={stats?.total_triples ?? 0}
              signalsCount={stats?.total_signals ?? 0}
              usersCount={stats?.total_accounts ?? 0}
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
      </div>
    </div>
  )
}
