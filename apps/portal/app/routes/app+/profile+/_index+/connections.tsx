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
  GetConnectionsDocument,
  GetConnectionsQuery,
  GetConnectionsQueryVariables,
  GetFollowerPositionsDocument,
  GetFollowerPositionsQuery,
  GetFollowerPositionsQueryVariables,
  GetFollowingPositionsDocument,
  GetFollowingPositionsQuery,
  GetFollowingPositionsQueryVariables,
  useGetConnectionsQuery,
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
import { useLiveLoader } from '@lib/hooks/useLiveLoader'
import { getConnectionsData } from '@lib/services/connections'
import { getSpecialPredicate } from '@lib/utils/app'
import logger from '@lib/utils/logger'
import { formatBalance, invariant } from '@lib/utils/misc'
import { defer, json, LoaderFunctionArgs } from '@remix-run/node'
import {
  Await,
  useLoaderData,
  useRouteLoaderData,
  useSearchParams,
} from '@remix-run/react'
import { requireUserWallet } from '@server/auth'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import {
  CURRENT_ENV,
  NO_USER_IDENTITY_ERROR,
  NO_USER_TOTALS_ERROR,
  NO_WALLET_ERROR,
} from 'app/consts'

import { ProfileLoaderData } from './_layout'

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
  userIdentity,
  totalFollowers,
  totalStake,
  variant,
  children,
}: {
  value: string
  userIdentity: IdentityPresenter
  followClaim?: ClaimPresenter
  totalFollowers: number | null | undefined
  totalStake: string
  variant: ConnectionsHeaderVariantType
  children?: ReactNode
}) => {
  return (
    <TabsContent value={value} className="flex flex-col w-full gap-6">
      <ConnectionsHeader
        variant={variant}
        userIdentity={userIdentity}
        totalStake={totalStake}
        totalFollowers={totalFollowers ?? 0}
      />
      {children}
    </TabsContent>
  )
}

export default function Connections() {
  const { initialParams } = useLoaderData<typeof loader>()
  const [searchParams, setSearchParams] = useSearchParams()

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

  logger('Following Data:', followingData)
  logger('Follower Data:', followerData)

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
      {/* <ConnectionsContent
        userIdentity={userIdentity}
        connectionsData={connectionsData}
      /> */}
    </div>
  )
}

function ConnectionsContent({
  userIdentity,
  connectionsData,
}: {
  userIdentity: IdentityPresenter
  connectionsData: Promise<NonNullable<
    Awaited<ReturnType<typeof getConnectionsData>>
  > | null>
}) {
  const { userTotals } =
    useRouteLoaderData<ProfileLoaderData>(
      'routes/app+/profile+/_index+/_layout',
    ) ?? {}
  invariant(userTotals, NO_USER_TOTALS_ERROR)

  return (
    <Suspense
      fallback={
        <div className="flex flex-col w-full gap-6">
          <TabsSkeleton numOfTabs={2} />
          <DataHeaderSkeleton />
          <PaginatedListSkeleton />
        </div>
      }
    >
      <Await resolve={connectionsData} errorElement={<></>}>
        {(resolvedConnectionsData) => {
          const {
            followClaim,
            followers,
            followersPagination,
            followingIdentities,
            followingClaims,
            followingPagination,
          } = resolvedConnectionsData || {}
          return (
            <Tabs
              className="w-full"
              defaultValue={ConnectionsHeaderVariants.followers}
            >
              <TabsList className="mb-6">
                <TabsTrigger
                  value={ConnectionsHeaderVariants.followers}
                  label="Followers"
                  totalCount={followersPagination?.totalEntries ?? 0}
                />
                <TabsTrigger
                  value={ConnectionsHeaderVariants.following}
                  label="Following"
                  totalCount={followingPagination?.totalEntries ?? 0}
                />
              </TabsList>
              <TabsContent value={ConnectionsHeaderVariants.followers}>
                {followClaim ? (
                  <TabContent
                    value={ConnectionsHeaderVariants.followers}
                    followClaim={followClaim}
                    userIdentity={userIdentity}
                    totalFollowers={userIdentity.follower_count}
                    totalStake={formatBalance(followClaim.assets_sum, 18)}
                    variant={ConnectionsHeaderVariants.followers}
                  >
                    <FollowList
                      positions={followers}
                      pagination={followersPagination!}
                      paramPrefix={ConnectionsHeaderVariants.followers}
                    />
                  </TabContent>
                ) : (
                  <EmptyStateCard message="This user has no follow claim yet. A follow claim will be created when the first person follows them." />
                )}
              </TabsContent>
              <TabsContent value={ConnectionsHeaderVariants.following}>
                <TabContent
                  value={ConnectionsHeaderVariants.following}
                  followClaim={followClaim}
                  userIdentity={userIdentity}
                  totalFollowers={userIdentity.followed_count}
                  totalStake={formatBalance(userTotals.followed_assets, 18)}
                  variant={ConnectionsHeaderVariants.following}
                >
                  {followingIdentities &&
                    followingClaims &&
                    followingPagination && (
                      <FollowList
                        identities={followingIdentities}
                        claims={followingClaims}
                        pagination={followingPagination}
                        paramPrefix={ConnectionsHeaderVariants.following}
                        enableSearch={false}
                        enableSort={false}
                      />
                    )}
                </TabContent>
              </TabsContent>
            </Tabs>
          )
        }}
      </Await>
    </Suspense>
  )
}

export function ErrorBoundary() {
  return <ErrorPage routeName="profile/connections" />
}
