import { Suspense } from 'react'

import { ErrorStateCard, IconName } from '@0xintuition/1ui'
import { ActivityPresenter } from '@0xintuition/api'
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
import { useLiveLoader } from '@lib/hooks/useLiveLoader'
import { getActivity } from '@lib/services/activity'
import logger from '@lib/utils/logger'
import { invariant } from '@lib/utils/misc'
import { defer, json, LoaderFunctionArgs } from '@remix-run/node'
import { Await, useLoaderData, useSearchParams } from '@remix-run/react'
import { requireUser, requireUserWallet } from '@server/auth'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { HEADER_BANNER_ACTIVITY, NO_WALLET_ERROR } from 'app/consts'
import { PaginationType } from 'app/types/pagination'

export async function loader({ request }: LoaderFunctionArgs) {
  const wallet = await requireUserWallet(request)
  invariant(wallet, NO_WALLET_ERROR)

  const user = await requireUser(request)
  invariant(user, 'User not found')
  invariant(user.wallet?.address, 'User wallet not found')
  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)
  const limit = parseInt(url.searchParams.get('limit') || '10')
  const offset = parseInt(url.searchParams.get('offset') || '0')
  const userWallet = user.wallet?.address
  const queryAddresses = [userWallet.toLowerCase()]

  const queryClient = new QueryClient()
  logger('Addresses being passed to query:', queryAddresses)

  const personalActivityFeedWhere = {
    _and: [
      {
        type: {
          _neq: 'FeesTransfered',
        },
      },
      {
        _or: [
          {
            atom: {
              creatorId: {
                _eq: userWallet,
              },
            },
          },
          {
            triple: {
              creatorId: {
                _eq: userWallet,
              },
            },
          },
          {
            deposit: {
              senderId: {
                _eq: userWallet,
              },
            },
          },
          {
            redemption: {
              receiverId: {
                _eq: userWallet,
              },
            },
          },
        ],
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
        orderBy: [{ blockTimestamp: 'desc' }],
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
      orderBy: [{ blockTimestamp: 'desc' }],
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
        <Await
          resolve={activity}
          errorElement={
            <ErrorStateCard>
              <RevalidateButton />
            </ErrorStateCard>
          }
        >
          {(resolvedActivity) => (
            <ActivityList
              activities={resolvedActivity.activity as ActivityPresenter[]}
              pagination={resolvedActivity.pagination as PaginationType}
            />
          )}
        </Await>
      </Suspense>
    </>
  )
}

export function ErrorBoundary() {
  return <ErrorPage routeName="activity/personal" />
}
