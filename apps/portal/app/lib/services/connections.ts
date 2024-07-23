import {
  ClaimsService,
  IdentitiesService,
  IdentityPresenter,
  SortColumn,
} from '@0xintuition/api'

import { calculateTotalPages, fetchWrapper } from '@lib/utils/misc'
import { getStandardPageParams } from '@lib/utils/params'

export async function getConnectionsData({
  userIdentity,
  request,
}: {
  userIdentity: IdentityPresenter
  request: Request
}) {
  if (userIdentity.follow_claim_id) {
    const followClaim = await fetchWrapper({
      method: ClaimsService.getClaimById,
      args: {
        id: userIdentity.follow_claim_id,
      },
    })
    const url = new URL(request.url)
    const searchParams = new URLSearchParams(url.search)

    const followersParams = getStandardPageParams({
      searchParams,
      paramPrefix: 'followers',
      defaultSortByValue: SortColumn.USER_ASSETS,
    })

    const followers = await fetchWrapper({
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

    const followingParams = getStandardPageParams({
      searchParams,
      paramPrefix: 'following',
      defaultSortByValue: SortColumn.USER_ASSETS,
    })

    const following = await fetchWrapper({
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

  return null
}
