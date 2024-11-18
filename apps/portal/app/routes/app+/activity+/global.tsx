import { Suspense } from 'react'

import { ErrorStateCard, IconName } from '@0xintuition/1ui'
import {
  fetcher,
  GetEventsDocument,
  GetEventsQuery,
  GetEventsQueryVariables,
  useGetEventsQuery,
} from '@0xintuition/graphql'

import { ErrorPage } from '@components/error-page'
import ExploreHeader from '@components/explore/ExploreHeader'
import { ActivityList } from '@components/list/activity'
import { RevalidateButton } from '@components/revalidate-button'
import { ActivitySkeleton } from '@components/skeleton'
import logger from '@lib/utils/logger'
import { invariant } from '@lib/utils/misc'
import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData, useSearchParams } from '@remix-run/react'
import { requireUserWallet } from '@server/auth'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { HEADER_BANNER_ACTIVITY, NO_WALLET_ERROR } from 'app/consts'

export async function loader({ request }: LoaderFunctionArgs) {
  const wallet = await requireUserWallet(request)
  invariant(wallet, NO_WALLET_ERROR)

  const url = new URL(request.url)
  const limit = parseInt(url.searchParams.get('limit') || '10')
  const offset = parseInt(url.searchParams.get('offset') || '0')
  const addresses = [wallet.toLowerCase()]

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['get-events-global', { limit, offset, addresses }],
    queryFn: () =>
      fetcher<GetEventsQuery, GetEventsQueryVariables>(GetEventsDocument, {
        limit,
        offset,
        addresses,
        orderBy: [{ blockTimestamp: 'desc' }],
      })(),
  })

  return json({
    dehydratedState: dehydrate(queryClient),
    initialParams: { limit, offset, addresses },
  })
}

export default function GlobalActivityFeed() {
  const { initialParams } = useLoaderData<typeof loader>()
  const [searchParams, setSearchParams] = useSearchParams()

  const limit = parseInt(
    searchParams.get('limit') || String(initialParams.limit),
  )
  const offset = parseInt(
    searchParams.get('offset') || String(initialParams.offset),
  )
  const addresses = initialParams.addresses

  const { data: eventsData, isLoading } = useGetEventsQuery(
    {
      limit,
      offset,
      addresses,
      orderBy: [{ blockTimestamp: 'desc' }],
    },
    {
      queryKey: ['get-events-global', { limit, offset, addresses }],
    },
  )

  console.log('Full events response:', eventsData)

  const totalCount = eventsData?.total?.aggregate?.count ?? 0
  const nodes = eventsData?.events_aggregate?.nodes ?? []
  logger('totalCount', totalCount)
  const hasMore = nodes.length === limit

  const handlePageChange = (newOffset: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('offset', String(newOffset))
    setSearchParams(params)
  }

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
        ) : nodes.length > 0 ? (
          <>
            <ActivityList
              activities={nodes}
              pagination={{
                currentPage: offset / limit + 1,
                limit,
                totalEntries: totalCount,
                totalPages: Math.ceil(totalCount / limit),
              }}
            />
            <div className="flex gap-2 justify-center mt-4">
              <button
                onClick={() => handlePageChange(Math.max(0, offset - limit))}
                disabled={offset === 0}
                className="px-4 py-2 disabled:opacity-50"
              >
                Previous
              </button>
              <span>Page {offset / limit + 1}</span>
              <button
                onClick={() => handlePageChange(offset + limit)}
                disabled={!hasMore}
                className="px-4 py-2 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
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
