import { Suspense } from 'react'

import { ErrorStateCard, IconName } from '@0xintuition/1ui'
import {
  fetcher,
  GetAtomsDocument,
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
import { useLiveLoader } from '@lib/hooks/useLiveLoader'
import { getActivity } from '@lib/services/activity'
import logger from '@lib/utils/logger'
import { invariant } from '@lib/utils/misc'
import { defer, json, type LoaderFunctionArgs } from '@remix-run/node'
import { Await, useLoaderData, useSearchParams } from '@remix-run/react'
import { requireUserWallet } from '@server/auth'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { HEADER_BANNER_ACTIVITY, NO_WALLET_ERROR } from 'app/consts'
import { PaginationType } from 'app/types/pagination'

export async function loader({ request }: LoaderFunctionArgs) {
  const wallet = await requireUserWallet(request)
  invariant(wallet, NO_WALLET_ERROR)

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)
  const limit = parseInt(searchParams.get('limit') || '10')
  const offset = parseInt(searchParams.get('offset') || '0')

  const queryClient = new QueryClient()
  try {
    const prefetchedData = await fetcher<
      GetEventsQuery,
      GetEventsQueryVariables
    >(GetEventsDocument, {
      limit,
      offset,
    })()

    await queryClient.setQueryData(
      ['events-global', { limit, offset }],
      prefetchedData,
    )

    logger('Prefetched data:', prefetchedData)
  } catch (error) {
    logger('Error prefetching data:', error)
  }

  return json({
    dehydratedState: dehydrate(queryClient),
    initialParams: { limit, offset },
  })
}

export default function GlobalActivityFeed() {
  const { initialParams } = useLoaderData<typeof loader>()
  const [searchParams] = useSearchParams()

  // Get current pagination values
  const limit = parseInt(
    searchParams.get('limit') || String(initialParams.limit),
  )
  const offset = parseInt(
    searchParams.get('offset') || String(initialParams.offset),
  )

  // Use React Query hook for client-side updates
  const { data: eventsData, isLoading } = useGetEventsQuery(
    { limit, offset },
    {
      queryKey: ['events-global', { limit, offset }],
      staleTime: 30000,
      retry: 2,
    },
  )

  logger('Query state:', { data: eventsData, isLoading })

  return (
    <>
      <ExploreHeader
        title="Activity"
        content="The pulse of the collective conscious. Watch the Intuition knowledge graph come to life."
        icon={IconName.lightningBolt}
        bgImage={HEADER_BANNER_ACTIVITY}
      />
      <ActivityList
        activities={eventsData?.events_aggregate?.nodes || []}
        pagination={{
          currentPage: offset / limit + 1,
          limit,
          totalEntries: eventsData?.events_aggregate?.nodes?.length || 0,
          totalPages: Math.ceil(
            (eventsData?.events_aggregate?.nodes?.length || 0) / limit,
          ),
        }}
      />
    </>
  )
}
export function ErrorBoundary() {
  return <ErrorPage routeName="activity/global" />
}
