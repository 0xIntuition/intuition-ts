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
      })(),
  })

  return json({
    dehydratedState: dehydrate(queryClient),
    initialParams: { limit, offset, addresses },
  })
}

export default function GlobalActivityFeed() {
  const { initialParams } = useLoaderData<typeof loader>()
  const [searchParams] = useSearchParams()

  const limit = parseInt(
    searchParams.get('limit') || String(initialParams.limit),
  )
  const offset = parseInt(
    searchParams.get('offset') || String(initialParams.offset),
  )
  const addresses = initialParams.addresses

  const { data: eventsData, isLoading } = useGetEventsQuery(
    { limit, offset, addresses },
    {
      queryKey: ['get-events-global', { limit, offset, addresses }],
    },
  )

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
        ) : eventsData?.events_aggregate?.nodes ? (
          <ActivityList
            activities={eventsData.events_aggregate.nodes}
            pagination={{
              currentPage: offset / limit + 1,
              limit,
              totalEntries: eventsData.events_aggregate.nodes.length,
              totalPages: Math.ceil(
                eventsData.events_aggregate.nodes.length / limit,
              ),
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
