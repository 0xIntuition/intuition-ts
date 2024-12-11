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
import logger from '@lib/utils/logger'
import { invariant } from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData, useSearchParams } from '@remix-run/react'
import { requireUser, requireUserWallet } from '@server/auth'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { HEADER_BANNER_ACTIVITY, NO_WALLET_ERROR } from 'app/consts'

export async function loader({ request }: LoaderFunctionArgs) {
  const wallet = await requireUserWallet(request)
  invariant(wallet, NO_WALLET_ERROR)

  const user = await requireUser(request)
  invariant(user, 'User not found')
  invariant(user.wallet?.address, 'User wallet not found')
  const url = new URL(request.url)

  const limit = parseInt(url.searchParams.get('limit') || '10')
  const offset = parseInt(url.searchParams.get('offset') || '0')
  const userWallet = user.wallet?.address
  const queryAddress = userWallet?.toLowerCase()
  const queryAddresses = [queryAddress]

  const queryClient = new QueryClient()
  logger('Addresses being passed to query:', queryAddresses)

  const personalActivityFeedWhere = {
    _and: [
      {
        type: {
          // _neq: 'FeesTransfered',
          _in: ['AtomCreated', 'TripleCreated'], // TODO: (ENG-4882) Include 'Deposited' and 'Redeemed' once we work out some of th questions with it
        },
      },
    ],
    _or: [
      {
        atom: {
          creator: {
            id: {
              _eq: queryAddress,
            },
          },
        },
      },
      {
        triple: {
          creator: {
            id: {
              _eq: queryAddress,
            },
          },
        },
      },
      {
        deposit: {
          sender: {
            id: {
              _eq: queryAddress,
            },
          },
        },
      },
      {
        redemption: {
          sender: {
            id: {
              _eq: queryAddress,
            },
          },
        },
      },
    ],
  }

  await queryClient.prefetchQuery({
    queryKey: [
      'get-events-personal',
      {
        limit,
        offset,
        where: personalActivityFeedWhere,
        addresses: queryAddresses,
      },
    ],
    queryFn: () =>
      fetcher<GetEventsQuery, GetEventsQueryVariables>(GetEventsDocument, {
        limit,
        offset,
        addresses: queryAddresses,
        orderBy: [{ block_timestamp: 'desc' }],
        where: personalActivityFeedWhere,
      }),
  })

  return json({
    dehydratedState: dehydrate(queryClient),
    initialParams: { limit, offset, personalActivityFeedWhere, queryAddresses },
  })
}

export default function PersonalActivityFeed() {
  const { initialParams } = useLoaderData<typeof loader>()
  const [searchParams, setSearchParams] = useSearchParams()

  const limit = parseInt(
    searchParams.get('limit') || String(initialParams.limit),
  )
  const offset = parseInt(
    searchParams.get('offset') || String(initialParams.offset),
  )

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
      orderBy: [{ block_timestamp: 'desc' }],
      where: initialParams.personalActivityFeedWhere,
    },
    {
      queryKey: [
        'get-events-personal',
        {
          limit,
          offset,
          where: initialParams.personalActivityFeedWhere,
          addresses: initialParams.queryAddresses,
        },
      ],
    },
  )

  logger('Full events response:', eventsData)
  logger('Addresses being passed to query:', initialParams.queryAddresses)

  const totalCount = eventsData?.total?.aggregate?.count ?? 0
  logger('totalCount', totalCount)
  const hasMore = eventsData?.events?.length === limit

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
          <>
            <ActivityListNew
              activities={eventsData.events as Events[]}
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
  return <ErrorPage routeName="activity/personal" />
}
