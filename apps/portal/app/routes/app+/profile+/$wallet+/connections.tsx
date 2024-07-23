import { ReactNode } from 'react'

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Text,
} from '@0xintuition/1ui'
import {
  ClaimPresenter,
  IdentitiesService,
  IdentityPresenter,
} from '@0xintuition/api'

import { FollowList } from '@components/list/follow'
import {
  ConnectionsHeader,
  ConnectionsHeaderVariants,
  ConnectionsHeaderVariantType,
} from '@components/profile/connections-header'
import { useLiveLoader } from '@lib/hooks/useLiveLoader'
import { getConnectionsData } from '@lib/services/connections'
import { NO_WALLET_ERROR } from '@lib/utils/errors'
import logger from '@lib/utils/logger'
import { fetchWrapper, formatBalance, invariant } from '@lib/utils/misc'
import { json, LoaderFunctionArgs, redirect } from '@remix-run/node'
import { requireUserWallet } from '@server/auth'
import { PaginationType } from 'types/pagination'

export async function loader({ params, request }: LoaderFunctionArgs) {
  const userWallet = await requireUserWallet(request)
  invariant(userWallet, NO_WALLET_ERROR)

  const wallet = params.wallet
  if (!wallet) {
    throw new Error('Wallet is undefined.')
  }

  const userIdentity = await fetchWrapper({
    method: IdentitiesService.getIdentityById,
    args: {
      id: wallet,
    },
  })

  if (!userIdentity) {
    return redirect('/create')
  }

  if (!userIdentity.creator || typeof userIdentity.creator.id !== 'string') {
    return logger('Invalid or missing creator ID')
  }

  const connectionsData = await getConnectionsData(userIdentity, request)

  return json({
    userIdentity,
    ...connectionsData,
  })
}

interface LoaderData {
  userIdentity: IdentityPresenter
  followClaim: ClaimPresenter
  followers: IdentityPresenter[]
  followersPagination: PaginationType
  following: IdentityPresenter[]
  followingPagination: PaginationType
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
    <TabsContent value={value} className="w-full">
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
  const {
    userIdentity,
    followClaim,
    followers,
    followersPagination,
    following,
    followingPagination,
  } = useLiveLoader<LoaderData>(['attest'])

  if (!followClaim) {
    return (
      <Text>
        This user has no follow claim yet. A follow claim will be created when
        the first person follows them.
      </Text>
    )
  }

  return (
    <div className="flex-col justify-start items-start flex w-full">
      <div className="self-stretch justify-between items-center inline-flex mb-6">
        <Text
          variant="headline"
          weight="medium"
          className="theme-secondary-foreground w-full"
        >
          Connections
        </Text>
      </div>
      <Tabs
        defaultValue={ConnectionsHeaderVariants.followers}
        className="w-full"
      >
        <TabsList className="mb-4">
          <TabsTrigger
            value={ConnectionsHeaderVariants.followers}
            label="Followers"
            totalCount={followersPagination.totalEntries}
          />
          <TabsTrigger
            value={ConnectionsHeaderVariants.following}
            label="Following"
            totalCount={followingPagination.totalEntries}
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
          totalStake={'0'} //TODO: Update this value when it is available. See ENG-2708
          variant={ConnectionsHeaderVariants.following}
        >
          <FollowList
            identities={following}
            pagination={followingPagination}
            paramPrefix="following"
          />
        </TabContent>
      </Tabs>
    </div>
  )
}
