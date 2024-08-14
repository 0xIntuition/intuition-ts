import {
  ClaimPresenter,
  ClaimsService,
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
}: {
  request: Request
  userWallet: string
}): Promise<ConnectionsData | null> {
  const userIdentity = await fetchWrapper(request, {
    method: IdentitiesService.getIdentityById,
    args: {
      id: userWallet,
    },
  })

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)

  const followingParams = getStandardPageParams({
    searchParams,
    paramPrefix: 'following',
    defaultSortByValue: SortColumn.USER_ASSETS,
  })

  const following = await fetchWrapper(request, {
    method: IdentitiesService.getIdentityFollowed,
    args: {
      id: userIdentity.id,
      ...followingParams,
      offset: null,
      timeframe: null,
      userWallet: null,
    },
  })

  const followingTotalPages = calculateTotalPages(
    following?.total ?? 0,
    Number(followingParams.limit),
  )

  if (userIdentity.follow_claim_id) {
    const followClaim = await fetchWrapper(request, {
      method: ClaimsService.getClaimById,
      args: {
        id: userIdentity.follow_claim_id,
      },
    })

    const followersParams = getStandardPageParams({
      searchParams,
      paramPrefix: 'followers',
      defaultSortByValue: SortColumn.USER_ASSETS,
    })

    const followers = await fetchWrapper(request, {
      method: IdentitiesService.getIdentityFollowers,
      args: {
        id: userIdentity.id,
        ...followersParams,
        offset: null,
        timeframe: null,
        userWallet: null,
      },
    })

    const followersTotalPages = calculateTotalPages(
      followers?.total ?? 0,
      Number(followersParams.limit),
    )

    return {
      followClaim,
      followers: followers?.data,
      followersSortBy: followersParams.sortBy,
      followersDirection: followersParams.direction,
      followersPagination: {
        currentPage: Number(followersParams.page),
        limit: Number(followersParams.limit),
        totalEntries: followers?.total ?? 0,
        totalPages: followersTotalPages,
      },
      following: following?.data,
      followingSortBy: followingParams.sortBy,
      followingDirection: followingParams.direction,
      followingPagination: {
        currentPage: Number(followingParams.page),
        limit: Number(followingParams.limit),
        totalEntries: following?.total ?? 0,
        totalPages: followingTotalPages,
      },
    }
  }

  return {
    following: following?.data,
    followingSortBy: followingParams.sortBy,
    followingDirection: followingParams.direction,
    followingPagination: {
      currentPage: Number(followingParams.page),
      limit: Number(followingParams.limit),
      totalEntries: following?.total ?? 0,
      totalPages: followingTotalPages,
    },
  }
}
