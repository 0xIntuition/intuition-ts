import { ReactNode, Suspense } from 'react'

import {
  EmptyStateCard,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Text,
} from '@0xintuition/1ui'
import {
  ClaimPresenter,
  IdentityPresenter,
  UserTotalsPresenter,
} from '@0xintuition/api'

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
import { formatBalance, invariant } from '@lib/utils/misc'
import { defer, LoaderFunctionArgs } from '@remix-run/node'
import { Await, useRouteLoaderData } from '@remix-run/react'
import { requireUserWallet } from '@server/auth'
import {
  NO_USER_IDENTITY_ERROR,
  NO_USER_TOTALS_ERROR,
  NO_WALLET_ERROR,
} from 'app/consts'

export async function loader({ params, request }: LoaderFunctionArgs) {
  const userWallet = await requireUserWallet(request)
  invariant(userWallet, NO_WALLET_ERROR)

  const wallet = params.wallet
  if (!wallet) {
    throw new Error('Wallet is undefined.')
  }

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)

  return defer({
    connectionsData: getConnectionsData({
      request,
      userWallet: wallet,
      searchParams,
    }),
  })
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

interface RouteLoaderData {
  userIdentity: IdentityPresenter
  userTotals: UserTotalsPresenter
}

export default function ProfileConnections() {
  const { connectionsData } = useLiveLoader<typeof loader>(['attest'])
  const { userIdentity } =
    useRouteLoaderData<RouteLoaderData>('routes/readonly+/profile+/$wallet') ??
    {}
  invariant(userIdentity, NO_USER_IDENTITY_ERROR)

  return (
    <div className="flex flex-col w-full gap-10">
      <div className="self-stretch justify-between items-center inline-flex">
        <Text
          variant="headline"
          weight="medium"
          className="text-secondary-foreground w-full"
        >
          Connections
        </Text>
      </div>
      <ConnectionsContent
        userIdentity={userIdentity}
        connectionsData={connectionsData}
      />
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
    useRouteLoaderData<RouteLoaderData>('routes/app+/profile+/$wallet') ?? {}
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
