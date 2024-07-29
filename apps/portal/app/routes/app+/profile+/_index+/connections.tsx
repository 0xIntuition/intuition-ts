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
} from 'consts'

import { ProfileLoaderData } from './_layout'

export async function loader({ request }: LoaderFunctionArgs) {
  const userWallet = await requireUserWallet(request)
  invariant(userWallet, NO_WALLET_ERROR)

  return defer({
    connectionsData: getConnectionsData({ userWallet, request }),
  })
}

const TabContent = ({
  value,
  claim,
  totalFollowers,
  totalStake,
  variant,
  children,
}: {
  value: string
  claim: ClaimPresenter
  totalFollowers: number | null | undefined
  totalStake: string
  variant: ConnectionsHeaderVariantType
  children?: ReactNode
}) => {
  if (!claim.subject || !claim.predicate || !claim.object) {
    return null
  }
  return (
    <TabsContent value={value} className="flex flex-col w-full gap-6">
      <ConnectionsHeader
        variant={variant}
        subject={claim.subject}
        predicate={claim.predicate}
        object={variant === 'followers' ? claim.object : null}
        totalStake={totalStake}
        totalFollowers={totalFollowers ?? 0}
      />
      {children}
    </TabsContent>
  )
}

export default function ProfileConnections() {
  const { connectionsData } = useLiveLoader<typeof loader>(['attest'])
  const { userIdentity } =
    useRouteLoaderData<ProfileLoaderData>(
      'routes/app+/profile+/_index+/_layout',
    ) ?? {}
  invariant(userIdentity, NO_USER_IDENTITY_ERROR)

  return (
    <div className="flex flex-col w-full gap-6">
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
          if (!resolvedConnectionsData) {
            return (
              <EmptyStateCard
                message={
                  'This user has no follow claim yet. A follow claim will be created when the first person follows them.'
                }
              />
            )
          }
          const {
            followClaim,
            followers,
            followersPagination,
            following,
            followingPagination,
          } = resolvedConnectionsData

          return (
            <Tabs
              defaultValue={ConnectionsHeaderVariants.followers}
              className="w-full"
            >
              <TabsList className="mb-6">
                <TabsTrigger
                  value={ConnectionsHeaderVariants.followers}
                  label="Followers"
                  totalCount={followingPagination.totalEntries}
                />
                <TabsTrigger
                  value={ConnectionsHeaderVariants.following}
                  label="Following"
                  totalCount={followersPagination.totalEntries}
                />
              </TabsList>
              <TabContent
                value={ConnectionsHeaderVariants.followers}
                claim={followClaim}
                totalFollowers={userIdentity.follower_count}
                totalStake={formatBalance(followClaim.assets_sum, 18, 4)}
                variant={ConnectionsHeaderVariants.followers}
              >
                <FollowList
                  identities={followers}
                  pagination={followersPagination}
                  paramPrefix="followers"
                />
              </TabContent>
              <TabContent
                value={ConnectionsHeaderVariants.following}
                claim={followClaim}
                totalFollowers={userIdentity.followed_count}
                totalStake={formatBalance(userTotals.followed_assets, 18, 4)}
                variant={ConnectionsHeaderVariants.following}
              >
                <FollowList
                  identities={following}
                  pagination={followingPagination}
                  paramPrefix="following"
                />
              </TabContent>
            </Tabs>
          )
        }}
      </Await>
    </Suspense>
  )
}
