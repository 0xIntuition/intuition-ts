import {
  ClaimPresenter,
  ClaimsService,
  Identifier,
  IdentitiesService,
  IdentityPresenter,
  SortColumn,
  SortDirection,
} from '@0xintuition/api'

import { calculateTotalPages } from '@lib/utils/misc'
import { getStandardPageParams } from '@lib/utils/params'
import { fetchWrapper } from '@server/api'

interface PaginationData {
  currentPage: number
  limit: number
  totalEntries: number
  totalPages: number
}

export interface ConnectionsData {
  followClaim?: ClaimPresenter
  followers?: IdentityPresenter[]
  followersSortBy?: SortColumn
  followersDirection?: SortDirection
  followersPagination?: PaginationData
  following: IdentityPresenter[]
  followingSortBy: SortColumn
  followingDirection: SortDirection
  followingPagination: PaginationData
}

export async function getConnectionsData({
  request,
  userWallet,
  searchParams,
}: {
  request: Request
  userWallet: string
  searchParams: URLSearchParams
}) {
  const userIdentity = await fetchWrapper(request, {
    method: IdentitiesService.getIdentityById,
    args: {
      id: userWallet,
    },
  })

  console.log('searchParams before', searchParams)

  const {
    page: followingPage,
    limit: followingLimit,
    sortBy: followingSortBy,
    direction: followingDirection,
  } = getStandardPageParams({
    searchParams,
    paramPrefix: 'following',
    defaultSortByValue: SortColumn.USER_ASSETS,
  })

  const followingSearch =
    (searchParams.get('followingSearch') as Identifier) || null

  const following = await fetchWrapper(request, {
    method: IdentitiesService.getIdentityFollowed,
    args: {
      id: userIdentity.id,
      page: followingPage,
      limit: followingLimit,
      sortBy: followingSortBy,
      direction: followingDirection,
      displayName: followingSearch,
    },
  })

  const followingTotalPages = calculateTotalPages(
    following?.total ?? 0,
    Number(followingLimit),
  )

  if (userIdentity.follow_claim_id) {
    const followClaim = await fetchWrapper(request, {
      method: ClaimsService.getClaimById,
      args: {
        id: userIdentity.follow_claim_id,
      },
    })

    const {
      page: followersPage,
      limit: followersLimit,
      sortBy: followersSortBy,
      direction: followersDirection,
    } = getStandardPageParams({
      searchParams,
      paramPrefix: 'following',
    })
    const followersSearch =
      (searchParams.get('followersSearch') as string) || null

    const followers = await fetchWrapper(request, {
      method: IdentitiesService.getIdentityFollowers,
      args: {
        id: userIdentity.id,
        page: followersPage,
        limit: followersLimit,
        sortBy: followersSortBy,
        direction: followersDirection,
        displayName: followersSearch,
      },
    })

    const followersTotalPages = calculateTotalPages(
      followers?.total ?? 0,
      Number(followersLimit),
    )

    console.log('searchParams after', searchParams)

    return {
      followClaim,
      followers: followers?.data,
      followersSortBy,
      followersDirection,
      followersPagination: {
        currentPage: Number(followersPage),
        limit: Number(followersLimit),
        totalEntries: followers?.total ?? 0,
        totalPages: followersTotalPages,
      },
      following: following?.data,
      followingSortBy,
      followingDirection,
      followingPagination: {
        currentPage: Number(followingPage),
        limit: Number(followingLimit),
        totalEntries: following?.total ?? 0,
        totalPages: followingTotalPages,
      },
    }
  }

  return {
    following: following?.data,
    followingSortBy,
    followingDirection,
    followingPagination: {
      currentPage: Number(followingPage),
      limit: Number(followingLimit),
      totalEntries: following?.total ?? 0,
      totalPages: followingTotalPages,
    },
  }
}
