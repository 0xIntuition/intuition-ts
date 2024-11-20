import { ReactNode, Suspense } from 'react'

import {
  EmptyStateCard,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Text,
} from '@0xintuition/1ui'
import { ClaimPresenter, IdentityPresenter } from '@0xintuition/api'
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
  useGetFollowerPositionsQuery,
  useGetFollowingPositionsQuery,
} from '@0xintuition/graphql'

import { ErrorPage } from '@components/error-page'
import { FollowList } from '@components/list/follow'
import {
  ConnectionsHeader,
  ConnectionsHeaderVariants,
  ConnectionsHeaderVariantType,
} from '@components/profile/connections-header'
import {
  DataHeaderSkeleton,
  PaginatedListSkeleton,
  TabsSkeleton,
} from '@components/skeleton'
import { getSpecialPredicate } from '@lib/utils/app'
import logger from '@lib/utils/logger'
import { formatBalance, invariant } from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import {
  Await,
  useLoaderData,
  useRouteLoaderData,
  useSearchParams,
} from '@remix-run/react'
import { requireUserWallet } from '@server/auth'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { CURRENT_ENV, NO_WALLET_ERROR } from 'app/consts'

export async function loader({ request }: LoaderFunctionArgs) {
  const userWallet = await requireUserWallet(request)
  invariant(userWallet, NO_WALLET_ERROR)

  const queryAddress = userWallet.toLowerCase()

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)
  const limit = parseInt(searchParams.get('limit') || '10')
  const offset = parseInt(searchParams.get('offset') || '0')

  const queryClient = new QueryClient()

  try {
    // First get account data
    logger('Fetching Account Data...')
    const accountResult = await fetcher<
      GetAccountQuery,
      GetAccountQueryVariables
    >(GetAccountDocument, { address: queryAddress })()
    logger('Account Data Result:', accountResult)

    if (!accountResult.account?.atomId) {
      throw new Error('No atom ID found for account')
    }

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
      limit,
      offset,
    })()
    logger('Following Positions Result:', followingResult)

    // Prefetch Follower Positions
    logger('Prefetching Follower Positions...')
    const followerResult = await fetcher<
      GetFollowerPositionsQuery,
      GetFollowerPositionsQueryVariables
    >(GetFollowerPositionsDocument, {
      subjectId: getSpecialPredicate(CURRENT_ENV).iPredicate.vaultId,
      predicateId:
        getSpecialPredicate(CURRENT_ENV).amFollowingPredicate.vaultId,
      objectId: accountResult.account.atomId,
      positionsLimit: limit,
      positionsOffset: offset,
    })()
    logger('Follower Positions Result:', followerResult)

    await queryClient.prefetchQuery({
      queryKey: [
        'get-following-positions',
        {
          subjectId: getSpecialPredicate(CURRENT_ENV).iPredicate.vaultId,
          predicateId:
            getSpecialPredicate(CURRENT_ENV).amFollowingPredicate.vaultId,
          address: queryAddress,
          limit,
          offset,
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
          objectId: accountResult.account.atomId,
          positionsLimit: limit,
          positionsOffset: offset,
        },
      ],
      queryFn: () => followerResult,
    })

    return json({
      dehydratedState: dehydrate(queryClient),
      initialParams: {
        atomId: accountResult.account.atomId,
        queryAddress,
        limit,
        offset,
      },
    })
  } catch (error) {
    logger('Connections Query Error:', {
      message: (error as Error).message,
      stack: (error as Error).stack,
      userWallet,
      limit,
      offset,
    })
    throw error
  }
}

const TabContent = ({
  value,
  totalFollowers,
  totalStake,
  variant,
  triples,
  children,
}: {
  value: string
  totalFollowers: number | null | undefined
  totalStake: string
  variant: ConnectionsHeaderVariantType
  triples?: any[]
  children?: ReactNode
}) => {
  return (
    <TabsContent value={value} className="flex flex-col w-full gap-6">
      <ConnectionsHeader
        variant={variant}
        totalStake={totalStake}
        totalFollowers={totalFollowers ?? 0}
        triples={triples}
      />
      {children}
    </TabsContent>
  )
}

export default function Connections() {
  const { initialParams } = useLoaderData<typeof loader>()
  const [searchParams, setSearchParams] = useSearchParams()

  // Determine default tab based on query parameters
  const defaultTab = searchParams.has('following')
    ? ConnectionsHeaderVariants.following
    : searchParams.has('followers')
      ? ConnectionsHeaderVariants.followers
      : ConnectionsHeaderVariants.followers // fallback to followers if no param

  const limit = parseInt(
    searchParams.get('limit') || String(initialParams.limit),
  )
  const offset = parseInt(
    searchParams.get('offset') || String(initialParams.offset),
  )

  const { data: followingData, isLoading: isLoadingFollowing } =
    useGetFollowingPositionsQuery(
      {
        subjectId: getSpecialPredicate(CURRENT_ENV).iPredicate.vaultId,
        predicateId:
          getSpecialPredicate(CURRENT_ENV).amFollowingPredicate.vaultId,
        address: initialParams.queryAddress,
        limit,
        offset,
      },
      {
        queryKey: [
          'get-following-positions',
          {
            subjectId: getSpecialPredicate(CURRENT_ENV).iPredicate.vaultId,
            predicateId:
              getSpecialPredicate(CURRENT_ENV).amFollowingPredicate.vaultId,
            address: initialParams.queryAddress,
            limit,
            offset,
          },
        ],
      },
    )

  const { data: followerData, isLoading: isLoadingFollowers } =
    useGetFollowerPositionsQuery(
      {
        subjectId: getSpecialPredicate(CURRENT_ENV).iPredicate.vaultId,
        predicateId:
          getSpecialPredicate(CURRENT_ENV).amFollowingPredicate.vaultId,
        objectId: initialParams.atomId,
        positionsLimit: limit,
        positionsOffset: offset,
      },
      {
        queryKey: [
          'get-follower-positions',
          {
            subjectId: getSpecialPredicate(CURRENT_ENV).iPredicate.vaultId,
            predicateId:
              getSpecialPredicate(CURRENT_ENV).amFollowingPredicate.vaultId,
            objectId: initialParams.atomId,
            positionsLimit: limit,
            positionsOffset: offset,
          },
        ],
      },
    )

  logger('Follower Data:', followerData)
  logger('Following Data:', followingData)

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
                followerData?.triples[0].vault.positions_aggregate?.aggregate
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
            <FollowList
              positions={followerData?.triples[0]?.vault?.positions}
              pagination={{
                currentPage: offset / limit + 1,
                limit,
                totalEntries:
                  followerData?.triples[0]?.vault?.positions_aggregate
                    ?.aggregate?.count ?? 0,
                totalPages: Math.ceil(
                  (followerData?.triples[0]?.vault?.positions_aggregate
                    ?.aggregate?.count ?? 0) / limit,
                ),
              }}
              paramPrefix={ConnectionsHeaderVariants.followers}
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
            <FollowList
              positions={followingData?.triples}
              pagination={{
                currentPage: offset / limit + 1,
                limit,
                totalEntries:
                  followingData?.triples_aggregate?.aggregate?.count ?? 0,
                totalPages: Math.ceil(
                  (followingData?.triples_aggregate?.aggregate?.count ?? 0) /
                    limit,
                ),
              }}
              paramPrefix={ConnectionsHeaderVariants.following}
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
