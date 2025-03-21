import { Suspense } from 'react'

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Text,
} from '@0xintuition/1ui'
import {
  fetcher,
  GetAccountDocument,
  GetAccountQuery,
  GetAccountQueryVariables,
  GetFollowerPositionsDocument,
  GetFollowerPositionsQuery,
  GetFollowerPositionsQueryVariables,
  GetFollowingPositionsDocument,
  GetFollowingPositionsQuery,
  GetFollowingPositionsQueryVariables,
  Order_By,
  useGetFollowerPositionsQuery,
  useGetFollowingPositionsQuery,
} from '@0xintuition/graphql'

import { ErrorPage } from '@components/error-page'
import { FollowerList } from '@components/list/follow'
import { FollowingList } from '@components/list/following'
import {
  ConnectionsHeader,
  ConnectionsHeaderVariants,
} from '@components/profile/connections-header'
import {
  DataHeaderSkeleton,
  PaginatedListSkeleton,
  TabsSkeleton,
} from '@components/skeleton'
import { getSpecialPredicate } from '@lib/utils/app'
import logger from '@lib/utils/logger'
import { calculateTotalPages, formatBalance, invariant } from '@lib/utils/misc'
import { getStandardPageParams } from '@lib/utils/params'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData, useSearchParams, useSubmit } from '@remix-run/react'
import { getUserWallet } from '@server/auth'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { CURRENT_ENV, NO_WALLET_ERROR } from 'app/consts'
import { Triple } from 'app/types'

export async function loader({ request }: LoaderFunctionArgs) {
  const userWallet = await getUserWallet(request)
  invariant(userWallet, NO_WALLET_ERROR)

  const queryAddress = userWallet.toLowerCase()

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)

  // Get standard pagination params for followers tab
  const {
    page: followersPage,
    limit: followersLimit,
    sortBy: followersSortBy,
    direction: followersDirection,
  } = getStandardPageParams({
    searchParams,
    paramPrefix: 'followers',
  })

  // Get standard pagination params for following tab
  const {
    page: followingPage,
    limit: followingLimit,
    sortBy: followingSortBy,
    direction: followingDirection,
  } = getStandardPageParams({
    searchParams,
    paramPrefix: 'following',
  })

  const followersSearch = searchParams.get('followersSearch') || ''

  const queryClient = new QueryClient()

  try {
    // First get account data
    logger('Fetching Account Data...')
    const accountResult = await fetcher<
      GetAccountQuery,
      GetAccountQueryVariables
    >(GetAccountDocument, { address: queryAddress })()

    if (!accountResult.account?.atom_id) {
      throw new Error('No atom ID found for account')
    }

    // Prepare orderBy objects for both queries
    const followingOrderBy = followingSortBy
      ? [{ [followingSortBy]: followingDirection.toLowerCase() as Order_By }]
      : [{ shares: 'desc' as Order_By }]

    const followersOrderBy = followersSortBy
      ? [{ [followersSortBy]: followersDirection.toLowerCase() as Order_By }]
      : [{ shares: 'desc' as Order_By }]

    // Prefetch Following Positions
    logger('Prefetching Following Positions...')
    const followingResult = await fetcher<
      GetFollowingPositionsQuery,
      GetFollowingPositionsQueryVariables
    >(GetFollowingPositionsDocument, {
      subjectId: getSpecialPredicate(CURRENT_ENV).iPredicate.vaultId,
      predicateId:
        getSpecialPredicate(CURRENT_ENV).amFollowingPredicate.vaultId,
      address: queryAddress,
      limit: followingLimit,
      offset: (followingPage - 1) * followingLimit,
      positionsOrderBy: followingOrderBy,
    })()

    // Prefetch Follower Positions
    logger('Prefetching Follower Positions...')
    const followerResult = await fetcher<
      GetFollowerPositionsQuery,
      GetFollowerPositionsQueryVariables
    >(GetFollowerPositionsDocument, {
      subjectId: getSpecialPredicate(CURRENT_ENV).iPredicate.vaultId,
      predicateId:
        getSpecialPredicate(CURRENT_ENV).amFollowingPredicate.vaultId,
      objectId: accountResult.account.atom_id,
      positionsLimit: followersLimit,
      positionsOffset: (followersPage - 1) * followersLimit,
      positionsOrderBy: followersOrderBy,
      positionsWhere: followersSearch
        ? {
            _or: [
              {
                account: {
                  label: {
                    _ilike: `%${followersSearch}%`,
                  },
                },
              },
            ],
          }
        : undefined,
    })()
    logger('Follower Result:', followerResult)

    // Calculate total pages for both
    const followersCount =
      followerResult?.triples[0]?.vault?.positions_aggregate?.aggregate
        ?.count ?? 0
    const followersTotalPages = calculateTotalPages(
      followersCount,
      followersLimit,
    )

    const followingCount =
      followingResult?.triples_aggregate?.aggregate?.count ?? 0
    const followingTotalPages = calculateTotalPages(
      followingCount,
      followingLimit,
    )

    await queryClient.prefetchQuery({
      queryKey: [
        'get-following-positions',
        {
          subjectId: getSpecialPredicate(CURRENT_ENV).iPredicate.vaultId,
          predicateId:
            getSpecialPredicate(CURRENT_ENV).amFollowingPredicate.vaultId,
          address: queryAddress,
          limit: followingLimit,
          offset: (followingPage - 1) * followingLimit,
          positionsOrderBy: followingOrderBy,
        },
      ],
      queryFn: () => followingResult,
    })

    await queryClient.prefetchQuery({
      queryKey: [
        'get-follower-positions',
        {
          subjectId: getSpecialPredicate(CURRENT_ENV).iPredicate.vaultId,
          predicateId:
            getSpecialPredicate(CURRENT_ENV).amFollowingPredicate.vaultId,
          objectId: accountResult.account.atom_id,
          positionsLimit: followersLimit,
          positionsOffset: (followersPage - 1) * followersLimit,
          positionsOrderBy: followersOrderBy,
        },
      ],
      queryFn: () => followerResult,
    })

    return json({
      dehydratedState: dehydrate(queryClient),
      initialParams: {
        atomId: accountResult.account.atom_id,
        queryAddress,
        followersLimit,
        followersPage,
        followersSortBy,
        followersDirection,
        followingLimit,
        followingPage,
        followingSortBy,
        followingDirection,
        followersPagination: {
          currentPage: followersPage,
          limit: followersLimit,
          totalEntries: followersCount,
          totalPages: followersTotalPages,
        },
        followingPagination: {
          currentPage: followingPage,
          limit: followingLimit,
          totalEntries: followingCount,
          totalPages: followingTotalPages,
        },
      },
    })
  } catch (error) {
    logger('Connections Query Error:', {
      message: (error as Error).message,
      stack: (error as Error).stack,
      userWallet,
    })
    throw error
  }
}

export default function Connections() {
  const { initialParams } = useLoaderData<typeof loader>()
  const [searchParams] = useSearchParams()
  const submit = useSubmit()

  // Determine default tab based on query parameters
  const defaultTab = searchParams.has('following')
    ? ConnectionsHeaderVariants.following
    : searchParams.has('followers')
      ? ConnectionsHeaderVariants.followers
      : ConnectionsHeaderVariants.followers // fallback to followers if no param

  // Extract pagination from initial params
  const { followersPagination, followingPagination } = initialParams

  const followersSearch = searchParams.get('followersSearch') || ''
  logger('clientside followersSearch', followersSearch)

  // Prepare orderBy objects for both queries
  const followingOrderBy = initialParams.followingSortBy
    ? [
        {
          [initialParams.followingSortBy]:
            initialParams.followingDirection.toLowerCase() as Order_By,
        },
      ]
    : [{ shares: 'desc' as Order_By }]

  const followersOrderBy = initialParams.followersSortBy
    ? [
        {
          [initialParams.followersSortBy]:
            initialParams.followersDirection.toLowerCase() as Order_By,
        },
      ]
    : [{ shares: 'desc' as Order_By }]

  const { data: followingData } = useGetFollowingPositionsQuery(
    {
      subjectId: getSpecialPredicate(CURRENT_ENV).iPredicate.vaultId,
      predicateId:
        getSpecialPredicate(CURRENT_ENV).amFollowingPredicate.vaultId,
      address: initialParams.queryAddress,
      limit: initialParams.followingLimit,
      offset: (initialParams.followingPage - 1) * initialParams.followingLimit,
      positionsOrderBy: followingOrderBy,
    },
    {
      queryKey: [
        'get-following-positions',
        {
          subjectId: getSpecialPredicate(CURRENT_ENV).iPredicate.vaultId,
          predicateId:
            getSpecialPredicate(CURRENT_ENV).amFollowingPredicate.vaultId,
          address: initialParams.queryAddress,
          limit: initialParams.followingLimit,
          offset:
            (initialParams.followingPage - 1) * initialParams.followingLimit,
          positionsOrderBy: followingOrderBy,
        },
      ],
    },
  )

  const { data: followerData } = useGetFollowerPositionsQuery(
    {
      subjectId: getSpecialPredicate(CURRENT_ENV).iPredicate.vaultId,
      predicateId:
        getSpecialPredicate(CURRENT_ENV).amFollowingPredicate.vaultId,
      objectId: initialParams.atomId,
      positionsLimit: initialParams.followersLimit,
      positionsOffset:
        (initialParams.followersPage - 1) * initialParams.followersLimit,
      positionsOrderBy: followersOrderBy,
      positionsWhere: followersSearch
        ? {
            _or: [{ account: { label: { _ilike: `%${followersSearch}%` } } }],
          }
        : undefined,
    },
    {
      queryKey: [
        'get-follower-positions',
        {
          subjectId: getSpecialPredicate(CURRENT_ENV).iPredicate.vaultId,
          predicateId:
            getSpecialPredicate(CURRENT_ENV).amFollowingPredicate.vaultId,
          objectId: initialParams.atomId,
          positionsLimit: initialParams.followersLimit,
          positionsOffset:
            (initialParams.followersPage - 1) * initialParams.followersLimit,
          positionsOrderBy: followersOrderBy,
          positionsWhere: followersSearch
            ? {
                _or: [
                  { account: { label: { _ilike: `%${followersSearch}%` } } },
                ],
              }
            : undefined,
        },
      ],
    },
  )

  logger('Follower Data:', followerData)
  logger('Following Data:', followingData)

  // Handlers for pagination
  const handleFollowersPageChange = (page: number) => {
    const formData = new FormData()
    formData.append('followersPage', page.toString())
    submit(formData, { method: 'get', replace: true })
  }

  const handleFollowersLimitChange = (limit: number) => {
    const formData = new FormData()
    formData.append('followersLimit', limit.toString())
    submit(formData, { method: 'get', replace: true })
  }

  const handleFollowingPageChange = (page: number) => {
    const formData = new FormData()
    formData.append('followingPage', page.toString())
    submit(formData, { method: 'get', replace: true })
  }

  const handleFollowingLimitChange = (limit: number) => {
    const formData = new FormData()
    formData.append('followingLimit', limit.toString())
    submit(formData, { method: 'get', replace: true })
  }

  return (
    <div className="flex flex-col w-full gap-4">
      <div className="self-stretch justify-between items-center inline-flex">
        <Text
          variant="headline"
          weight="medium"
          className="text-secondary-foreground w-full"
        >
          Connections
        </Text>
      </div>
      <Suspense
        fallback={
          <div className="flex flex-col w-full gap-6">
            <TabsSkeleton numOfTabs={2} />
            <DataHeaderSkeleton />
            <PaginatedListSkeleton />
          </div>
        }
      >
        <Tabs className="w-full" defaultValue={defaultTab}>
          <TabsList className="mb-6">
            <TabsTrigger
              value={ConnectionsHeaderVariants.followers}
              label="Followers"
              totalCount={
                followerData?.triples[0]?.vault?.positions_aggregate?.aggregate
                  ?.count ?? 0
              }
            />
            <TabsTrigger
              value={ConnectionsHeaderVariants.following}
              label="Following"
              totalCount={
                followingData?.triples_aggregate?.aggregate?.count ?? 0
              }
            />
          </TabsList>

          <TabsContent value={ConnectionsHeaderVariants.followers}>
            <ConnectionsHeader
              variant={ConnectionsHeaderVariants.followers}
              totalFollowers={
                followerData?.triples[0]?.vault?.positions_aggregate?.aggregate
                  ?.count ?? 0
              }
              totalStake={formatBalance(
                followerData?.triples[0]?.vault?.positions_aggregate?.aggregate
                  ?.sum?.shares ?? '0',
                18,
              )}
              triples={followerData?.triples}
            />
            <FollowerList
              positions={followerData?.triples[0]?.vault?.positions}
              currentSharePrice={
                followerData?.triples[0]?.vault?.current_share_price ?? '0'
              }
              pagination={followersPagination}
              paramPrefix={ConnectionsHeaderVariants.followers}
              enableSort={true}
              enableSearch={true}
              onPageChange={handleFollowersPageChange}
              onLimitChange={handleFollowersLimitChange}
            />
          </TabsContent>

          <TabsContent value={ConnectionsHeaderVariants.following}>
            <ConnectionsHeader
              variant={ConnectionsHeaderVariants.following}
              totalFollowers={
                followingData?.triples_aggregate?.aggregate?.count ?? 0
              }
              totalStake={formatBalance(
                followingData?.triples[0]?.vault?.positions_aggregate?.aggregate
                  ?.sum?.shares ?? '0',
                18,
              )}
              triples={followerData?.triples}
            />
            <FollowingList
              triples={followingData?.triples as Triple[]}
              pagination={followingPagination}
              paramPrefix={ConnectionsHeaderVariants.following}
              enableSort={true}
              enableSearch={true}
              onPageChange={handleFollowingPageChange}
              onLimitChange={handleFollowingLimitChange}
            />
          </TabsContent>
        </Tabs>
      </Suspense>
    </div>
  )
}

export function ErrorBoundary() {
  return <ErrorPage routeName="profile/connections" />
}
