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
import { Await, useLoaderData, useRouteLoaderData } from '@remix-run/react'
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

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)
  const limit = parseInt(searchParams.get('limit') || '10')
  const offset = parseInt(searchParams.get('offset') || '0')
  const addressForQuery = userWallet.toLowerCase()

  const queryClient = new QueryClient()

  try {
    // First get account data
    logger('Fetching Account Data for wallet:', userWallet)
    const accountData = await fetcher<
      GetAccountQuery,
      GetAccountQueryVariables
    >(GetAccountDocument, { address: addressForQuery })()
    logger('Account Data Result:', accountData)

    if (!accountData.account?.atomId) {
      throw new Error('No atom ID found for account')
    }

    // Log initial parameters
    logger('Initial Parameters:', {
      userWallet,
      limit,
      offset,
      predicates: {
        iPredicate: getSpecialPredicate(CURRENT_ENV).iPredicate.vaultId,
        amFollowingPredicate:
          getSpecialPredicate(CURRENT_ENV).amFollowingPredicate.vaultId,
      },
    })

    // Prefetch Following Positions
    logger('Prefetching Following Positions...')
    const followingResult = await fetcher<
      GetFollowingPositionsQuery,
      GetFollowingPositionsQueryVariables
    >(GetFollowingPositionsDocument, {
      subjectId: getSpecialPredicate(CURRENT_ENV).iPredicate.vaultId,
      predicateId:
        getSpecialPredicate(CURRENT_ENV).amFollowingPredicate.vaultId,
      objectId: accountData.account.atomId,
      positionsLimit: limit,
      positionsOffset: offset,
    })()
    logger('Following Positions Result:', followingResult)

    await queryClient.prefetchQuery({
      queryKey: ['get-following-positions', { userWallet, limit, offset }],
      queryFn: () => followingResult,
    })

    // Prefetch Follower Positions
    logger('Prefetching Follower Positions...')
    const followerResult = await fetcher<
      GetFollowerPositionsQuery,
      GetFollowerPositionsQueryVariables
    >(GetFollowerPositionsDocument, {
      subjectId: getSpecialPredicate(CURRENT_ENV).iPredicate.vaultId,
      predicateId:
        getSpecialPredicate(CURRENT_ENV).amFollowingPredicate.vaultId,
      objectId: accountData.account.atomId,
      positionsLimit: limit,
      positionsOffset: offset,
    })()
    logger('Follower Positions Result:', followerResult)

    await queryClient.prefetchQuery({
      queryKey: ['get-follower-positions', { userWallet, limit, offset }],
      queryFn: () => followerResult,
    })

    logger('Query Client State:', {
      followingQuery: queryClient.getQueryData([
        'get-following-positions',
        { addressForQuery, limit, offset },
      ]),
      followerQuery: queryClient.getQueryData([
        'get-follower-positions',
        { addressForQuery, limit, offset },
      ]),
    })

    return json({
      dehydratedState: dehydrate(queryClient),
      initialParams: {
        addressForQuery,
        limit,
        offset,
      },
    })
  } catch (error) {
    logger('Connections Query Error:', {
      message: (error as Error).message,
      stack: (error as Error).stack,
      addressForQuery,
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

export default function ProfileConnections() {
  const { initialParams } = useLoaderData<typeof loader>()

  // const { userIdentity } =
  //   useRouteLoaderData<ProfileLoaderData>(
  //     'routes/app+/profile+/_index+/_layout',
  //   ) ?? {}
  // invariant(userIdentity, NO_USER_IDENTITY_ERROR)

  // const { data: connectionsData } = useGetConnectionsQuery(
  //   {
  //     userWallet: initialParams.userWallet,
  //     searchParams: initialParams.searchParams,
  //   },
  //   {
  //     queryKey: ['GetConnections', initialParams],
  //   },
  // )

  // logger('connectionsData', connectionsData)

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
