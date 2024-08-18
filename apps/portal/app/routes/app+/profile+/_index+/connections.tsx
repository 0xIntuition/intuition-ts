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
import { defer, LoaderFunctionArgs, redirect } from '@remix-run/node'
import { Await, useRouteLoaderData, useSearchParams } from '@remix-run/react'
import { requireUserWallet } from '@server/auth'
import {
  NO_USER_IDENTITY_ERROR,
  NO_USER_TOTALS_ERROR,
  NO_WALLET_ERROR,
} from 'app/consts'

import { ProfileLoaderData } from './_layout'

export async function loader({ request }: LoaderFunctionArgs) {
  const userWallet = await requireUserWallet(request)
  invariant(userWallet, NO_WALLET_ERROR)

  const url = new URL(request.url)
  if (!url.searchParams.get('tab')) {
    url.searchParams.set('tab', ConnectionsHeaderVariants.followers)
    return redirect(url.toString())
  }

  return defer({
    connectionsData: getConnectionsData({ request, userWallet }),
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

export default function ProfileConnections() {
  const [searchParams, setSearchParams] = useSearchParams()
  const tab = searchParams.get('tab') || 'followers'

  const { connectionsData } = useLiveLoader<typeof loader>(['attest'])
  const { userIdentity } =
    useRouteLoaderData<ProfileLoaderData>(
      'routes/app+/profile+/_index+/_layout',
    ) ?? {}
  invariant(userIdentity, NO_USER_IDENTITY_ERROR)

  const handleTabChange = (value: string) => {
    setSearchParams({ tab: value })
  }

  return (
    <div className="flex flex-col w-full gap-10">
      <div className="self-stretch justify-between items-center inline-flex">
        <Text
          variant="headline"
          weight="medium"
          className="theme-secondary-foreground w-full"
        >
          Connections
        </Text>
      </div>
      <ConnectionsContent
        userIdentity={userIdentity}
        connectionsData={connectionsData}
        tab={tab}
        onTabChange={handleTabChange}
      />
    </div>
  )
}

function ConnectionsContent({
  userIdentity,
  connectionsData,
  tab,
  onTabChange,
}: {
  userIdentity: IdentityPresenter
  connectionsData: Promise<NonNullable<
    Awaited<ReturnType<typeof getConnectionsData>>
  > | null>
  tab: string
  onTabChange: (value: string) => void
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
            following,
            followingPagination,
          } = resolvedConnectionsData || {}
          return (
            <Tabs value={tab} onValueChange={onTabChange} className="w-full">
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
                      identities={followers ?? []}
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
                  {following && followingPagination && (
                    <FollowList
                      identities={following}
                      pagination={followingPagination}
                      paramPrefix={ConnectionsHeaderVariants.following}
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
