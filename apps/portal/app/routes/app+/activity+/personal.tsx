import { Suspense } from 'react'

import {
  ErrorStateCard,
  IconName,
  PaginationNext,
  PaginationPageCounter,
  PaginationPrevious,
} from '@0xintuition/1ui'
import {
  fetcher,
  GetSignalsDocument,
  GetSignalsQuery,
  GetSignalsQueryVariables,
  useGetSignalsQuery,
} from '@0xintuition/graphql'

import { ErrorPage } from '@components/error-page'
import ExploreHeader from '@components/explore/ExploreHeader'
import { ActivityFeed } from '@components/list/activity'
import { RevalidateButton } from '@components/revalidate-button'
import { ActivitySkeleton } from '@components/skeleton'
import logger from '@lib/utils/logger'
import { invariant } from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData, useSearchParams } from '@remix-run/react'
import { getUser, getUserWallet } from '@server/auth'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { HEADER_BANNER_ACTIVITY, NO_WALLET_ERROR } from 'app/consts'

export async function loader({ request }: LoaderFunctionArgs) {
  const wallet = await getUserWallet(request)
  invariant(wallet, NO_WALLET_ERROR)

  const user = await getUser(request)
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

  // const personalActivityFeedWhere = {
  //   _and: [
  //     {
  //       type: {
  //         // _neq: 'FeesTransfered',
  //         _in: ['AtomCreated', 'TripleCreated'], // TODO: (ENG-4882) Include 'Deposited' and 'Redeemed' once we work out some of th questions with it
  //       },
  //     },
  //   ],
  //   _or: [
  //     {
  //       atom: {
  //         creator: {
  //           id: {
  //             _eq: queryAddress,
  //           },
  //         },
  //       },
  //     },
  //     {
  //       triple: {
  //         creator: {
  //           id: {
  //             _eq: queryAddress,
  //           },
  //         },
  //       },
  //     },
  //     {
  //       deposit: {
  //         sender: {
  //           id: {
  //             _eq: queryAddress,
  //           },
  //         },
  //       },
  //     },
  //     {
  //       redemption: {
  //         sender: {
  //           id: {
  //             _eq: queryAddress,
  //           },
  //         },
  //       },
  //     },
  //   ],
  // }

  await queryClient.prefetchQuery({
    queryKey: [
      'get-signals-personal',
      {
        limit,
        offset,
        addresses: queryAddresses,
      },
    ],
    queryFn: () =>
      fetcher<GetSignalsQuery, GetSignalsQueryVariables>(GetSignalsDocument, {
        limit,
        offset,
        addresses: queryAddresses,
        orderBy: [{ block_timestamp: 'desc' }],
      }),
  })

  return json({
    dehydratedState: dehydrate(queryClient),
    initialParams: { limit, offset, queryAddresses },
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
    data: signalsData,
    isLoading,
    isError,
    error,
  } = useGetSignalsQuery(
    {
      limit,
      offset,
      addresses: initialParams.queryAddresses,
      orderBy: [{ block_timestamp: 'desc' }],
    },
    {
      queryKey: [
        'get-signals-personal',
        {
          limit,
          offset,
          addresses: initialParams.queryAddresses,
        },
      ],
    },
  )

  logger('Full signals response:', signalsData)
  logger('Addresses being passed to query:', initialParams.queryAddresses)

  const totalCount = signalsData?.total?.aggregate?.count ?? 0
  logger('totalCount', totalCount)
  const hasMore = signalsData?.signals?.length === limit

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
        ) : signalsData?.signals ? (
          <>
            <ActivityFeed
              activities={signalsData}
              // TODO: Add pagination
              // pagination={{
              //   currentPage: offset / limit + 1,
              //   limit,
              //   totalEntries: totalCount,
              //   totalPages: Math.ceil(totalCount / limit),
              // }}
            />
            <div className="flex gap-2 justify-center mt-4">
              <PaginationPrevious
                onClick={() => handlePageChange(offset - limit)}
                disabled={offset === 0}
              />
              <PaginationPageCounter
                currentPage={offset / limit + 1}
                totalPages={Math.ceil(totalCount / limit)}
              />
              <PaginationNext
                onClick={() => handlePageChange(offset + limit)}
                disabled={!hasMore}
              />
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
