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
  ClaimsService,
  IdentityPresenter,
  OpenAPI,
  SortColumn,
  SortDirection,
} from '@0xintuition/api'

import { FollowersOnIdentity } from '@components/list/identity-followers'
import { FollowingOnIdentity } from '@components/list/identity-following'
import {
  ConnectionsHeader,
  ConnectionsHeaderVariants,
  ConnectionsHeaderVariantType,
} from '@components/profile/connections-header'
import { useLiveLoader } from '@lib/hooks/useLiveLoader'
import {
  fetchIdentityFollowers,
  fetchIdentityFollowing,
  fetchUserIdentity,
} from '@lib/utils/fetches'
import logger from '@lib/utils/logger'
import { calculateTotalPages, getAuthHeaders } from '@lib/utils/misc'
import { SessionContext } from '@middleware/session'
import { json, LoaderFunctionArgs, redirect } from '@remix-run/node'
import { getPrivyAccessToken } from '@server/privy'

export async function loader({ context, request }: LoaderFunctionArgs) {
  OpenAPI.BASE = 'https://dev.api.intuition.systems'
  const accessToken = getPrivyAccessToken(request)
  const headers = getAuthHeaders(accessToken !== null ? accessToken : '')
  OpenAPI.HEADERS = headers as Record<string, string>

  const session = context.get(SessionContext)
  const user = session.get('user')

  if (!user?.details?.wallet?.address) {
    return logger('No user found in session')
  }

  const userIdentity = await fetchUserIdentity(user.details.wallet.address)

  if (!userIdentity) {
    return redirect('/create')
  }

  if (!userIdentity.creator || typeof userIdentity.creator.id !== 'string') {
    return logger('Invalid or missing creator ID')
  }

  if (!userIdentity.follow_claim_id) {
    return logger('No follow claim ID')
  }

  const followClaim = await ClaimsService.getClaimById({
    id: userIdentity.follow_claim_id,
  })

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

const TabContent = ({
  value,
  claim,
  variant,
  children,
}: {
  value: string
  claim: ClaimPresenter
  variant: ConnectionsHeaderVariantType
  children?: ReactNode
}) => {
  if (!claim.subject || !claim.predicate || !claim.object) {
    return null
  }
  return (
    <TabsContent value={value}>
      <ConnectionsHeader
        variant={variant}
        subject={claim.subject}
        predicate={claim.predicate}
        object={variant === 'followers' ? claim.object : null}
        totalStake={'3.5467'} // TODO: Add total stake once BE implements
        totalFollowers={claim.num_positions}
      />
      {children}
    </TabsContent>
  )
}

export default function ProfileConnections() {
  const {
    followClaim,
    followers,
    followersPagination,
    following,
    followingPagination,
  } = useLiveLoader<typeof loader>(['attest'])
  return (
    <div className="flex flex-col items-center w-full mt-10">
      <Text
        variant="headline"
        weight="medium"
        className="theme-secondary-foreground w-full mb-3"
      >
        Connections
      </Text>

      <div className="w-full">
        <Tabs defaultValue={ConnectionsHeaderVariants.followers}>
          <TabsList>
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
            variant={ConnectionsHeaderVariants.followers}
          >
            <FollowersOnIdentity
              followers={followers}
              pagination={followersPagination}
            />
          </TabContent>
          <TabContent
            value={ConnectionsHeaderVariants.following}
            claim={followClaim}
            variant={ConnectionsHeaderVariants.following}
          >
            <FollowingOnIdentity
              following={following}
              pagination={followingPagination}
            />
          </TabContent>
        </Tabs>
      </div>
    </div>
  )
}
