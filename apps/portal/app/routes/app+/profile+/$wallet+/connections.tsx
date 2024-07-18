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
  IdentityPresenter,
  SortColumn,
  SortDirection,
} from '@0xintuition/api'

import { FollowList } from '@components/list/follow'
import {
  ConnectionsHeader,
  ConnectionsHeaderVariants,
  ConnectionsHeaderVariantType,
} from '@components/profile/connections-header'
import { useLiveLoader } from '@lib/hooks/useLiveLoader'
import {
  fetchClaim,
  fetchIdentity,
  fetchIdentityFollowers,
  fetchIdentityFollowing,
} from '@lib/utils/fetches'
import logger from '@lib/utils/logger'
import { calculateTotalPages, formatBalance } from '@lib/utils/misc'
import { json, LoaderFunctionArgs, redirect } from '@remix-run/node'
import { setupApiWithWallet } from '@server/auth'
import { PaginationType } from 'types/pagination'

export async function loader({ params, request }: LoaderFunctionArgs) {
  await setupApiWithWallet(request)

  const wallet = params.wallet
  if (!wallet) {
    throw new Error('Wallet is undefined.')
  }

  const userIdentity = await fetchIdentity(wallet)

  if (!userIdentity) {
    return redirect('/create')
  }

  if (!userIdentity.creator || typeof userIdentity.creator.id !== 'string') {
    return logger('Invalid or missing creator ID')
  }

  if (userIdentity.follow_claim_id) {
    const followClaim = await fetchClaim(userIdentity.follow_claim_id)
    const url = new URL(request.url)
    const searchParams = new URLSearchParams(url.search)
    // const followersSearch = searchParams.get('followersSearch') TODO: Add search once BE implements
    const followersSortBy = searchParams.get('followersSortBy') ?? 'UserAssets'
    const followersDirection = searchParams.get('followersDirection') ?? 'desc'
    const followersPage = searchParams.get('followersPage')
      ? parseInt(searchParams.get('followersPage') as string)
      : 1
    const followersLimit = searchParams.get('limit') ?? '10'

    const followers = await fetchIdentityFollowers(
      userIdentity.id,
      followersPage,
      Number(followersLimit),
      followersSortBy as SortColumn,
      followersDirection as SortDirection,
    )

    const followersTotalPages = calculateTotalPages(
      followers?.total ?? 0,
      Number(followersLimit),
    )

    // const followingSearch = searchParams.get('followingSearch') TODO: Add search once BE implements
    const followingSortBy = searchParams.get('followingSortBy') ?? 'UserAssets'
    const followingDirection = searchParams.get('followingDirection') ?? 'desc'
    const followingPage = searchParams.get('followingPage')
      ? parseInt(searchParams.get('followingPage') as string)
      : 1
    const followingLimit = searchParams.get('limit') ?? '10'

    const following = await fetchIdentityFollowing(
      userIdentity.id,
      followingPage,
      Number(followingLimit),
      followingSortBy as SortColumn,
      followingDirection as SortDirection,
    )

    const followingTotalPages = calculateTotalPages(
      following?.total ?? 0,
      Number(followingLimit),
    )

    return json({
      userIdentity,
      followClaim,
      followers: followers?.data as IdentityPresenter[],
      followersSortBy,
      followersDirection,
      followersPagination: {
        currentPage: Number(followersPage),
        limit: Number(followersLimit),
        totalEntries: followers?.total ?? 0,
        totalPages: followersTotalPages,
      },
      following: following?.data as IdentityPresenter[],
      followingSortBy,
      followingDirection,
      followingPagination: {
        currentPage: Number(followingPage),
        limit: Number(followingLimit),
        totalEntries: following?.total ?? 0,
        totalPages: followingTotalPages,
      },
    })
  }

  return json({
    userIdentity,
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
            totalCount={followingPagination.totalEntries}
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
