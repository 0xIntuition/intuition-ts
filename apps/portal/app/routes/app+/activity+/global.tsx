import { Suspense } from 'react'

import { ErrorStateCard, IconName } from '@0xintuition/1ui'
import {
  Events,
  fetcher,
  GetEventsDocument,
  GetEventsQuery,
  GetEventsQueryVariables,
  useGetEventsQuery,
} from '@0xintuition/graphql'

import { ErrorPage } from '@components/error-page'
import ExploreHeader from '@components/explore/ExploreHeader'
import { ActivityListNew } from '@components/list/activity'
import { RevalidateButton } from '@components/revalidate-button'
import { ActivitySkeleton } from '@components/skeleton'
import { useOffsetPagination } from '@lib/hooks/useOffsetPagination'
import logger from '@lib/utils/logger'
import { invariant } from '@lib/utils/misc'
import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { requireUserWallet } from '@server/auth'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { HEADER_BANNER_ACTIVITY, NO_WALLET_ERROR } from 'app/consts'

const EVENTS_QUERY_KEY = ['events', 'global'] as const

export async function loader({ request }: LoaderFunctionArgs) {
  const wallet = await requireUserWallet(request)
  invariant(wallet, NO_WALLET_ERROR)

  const url = new URL(request.url)
  const limit = parseInt(url.searchParams.get('limit') || '10')
  const offset = parseInt(url.searchParams.get('offset') || '0')
  const queryAddresses = [wallet.toLowerCase()]

  const queryClient = new QueryClient()

  logger('Addresses being passed to query:', queryAddresses)
  await queryClient.prefetchQuery({
    queryKey: [
      ...EVENTS_QUERY_KEY,
      { limit, offset, addresses: queryAddresses },
    ],
    queryFn: () =>
      fetcher<GetEventsQuery, GetEventsQueryVariables>(GetEventsDocument, {
        limit,
        offset,
        addresses: queryAddresses,
        orderBy: [{ blockTimestamp: 'desc' }],
        where: {
          type: {
            _neq: 'FeesTransfered',
          },
        },
      }),
  })

  return json({
    dehydratedState: dehydrate(queryClient),
    initialParams: { queryAddresses },
  })
}

export default function GlobalActivityFeed() {
  const { initialParams } = useLoaderData<typeof loader>()
  const { limit, offset, currentPage, getQueryKey } = useOffsetPagination({
    defaultLimit: 10,
  })

  const queryKey = getQueryKey(EVENTS_QUERY_KEY, {
    addresses: initialParams.queryAddresses,
    where: {
      type: {
        _neq: 'FeesTransfered',
      },
    },
  })

  const {
    data: eventsData,
    isLoading,
    isError,
    error,
  } = useGetEventsQuery(
    {
      limit,
      offset,
      addresses: initialParams.queryAddresses,
      orderBy: [{ blockTimestamp: 'desc' }],
      where: {
        type: {
          _neq: 'FeesTransfered',
        },
      },
    },
    {
      queryKey,
      placeholderData: (previousData) => previousData,
      staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
    },
  )

  logger('Full events response:', eventsData)
  logger('Addresses being passed to query:', initialParams.queryAddresses)

  const totalCount = eventsData?.total?.aggregate?.count ?? 0
  logger('totalCount', totalCount)

  return (
    <>
      <ExploreHeader
        title="Activity"
        content="The pulse of the collective conscious. Watch the Intuition knowledge graph come to life."
        icon={IconName.lightningBolt}
        bgImage={HEADER_BANNER_ACTIVITY}
      />
      <Suspense fallback={<ActivitySkeleton />}>
        {isLoading ? (
          <ActivitySkeleton />
        ) : isError ? (
          <ErrorStateCard
            title="Failed to load activity"
            message={
              (error as Error)?.message ?? 'An unexpected error occurred'
            }
          >
            <RevalidateButton />
          </ErrorStateCard>
        ) : eventsData?.events ? (
          <ActivityListNew
            activities={eventsData.events as Events[]}
            pagination={{
              currentPage,
              limit,
              totalEntries: totalCount,
              totalPages: Math.ceil(totalCount / limit),
            }}
          />
        ) : (
          <ErrorStateCard>
            <RevalidateButton />
          </ErrorStateCard>
        )}
      </Suspense>
    </>
  )
}

export function ErrorBoundary() {
  return <ErrorPage routeName="activity/global" />
}
