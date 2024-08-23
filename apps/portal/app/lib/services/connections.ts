import {
  ClaimPositionsService,
  ClaimPresenter,
  ClaimsService,
  IdentitiesService,
  IdentityPresenter,
  PositionSortColumn,
  SortColumn,
  SortDirection,
  UsersService,
} from '@0xintuition/api'

import { getSpecialPredicate } from '@lib/utils/app'
import { calculateTotalPages } from '@lib/utils/misc'
import { getStandardPageParams } from '@lib/utils/params'
import { fetchWrapper } from '@server/api'
import { CURRENT_ENV } from 'app/consts'

interface PaginationData {
  currentPage: number
  limit: number
  totalEntries: number
  totalPages: number
}

export interface ConnectionsData {
  followClaim?: ClaimPresenter
  followers?: IdentityPresenter[]
  followersSortBy?: PositionSortColumn
  followersDirection?: SortDirection
  followersPagination?: PaginationData
  followingIdentities: IdentityPresenter[]
  followingClaims: ClaimPresenter[]
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

  const {
    page: followingPage,
    limit: followingLimit,
    sortBy: followingSortBy,
    direction: followingDirection,
  } = getStandardPageParams({
    searchParams,
    paramPrefix: 'following',
  })

  const followingClaims = await fetchWrapper(request, {
    method: UsersService.getUserClaims,
    args: {
      page: followingPage,
      limit: followingLimit,
      sortBy: followingSortBy as SortColumn,
      direction: followingDirection,
      displayName:
        getSpecialPredicate(CURRENT_ENV).amFollowingPredicate.displayName,
      user: userWallet,
    },
  })

  const followingTotalPages = calculateTotalPages(
    followingClaims?.total ?? 0,
    followingLimit,
  )

  let followClaim: ClaimPresenter | null = null

  const followClaimResponse = await fetchWrapper(request, {
    method: ClaimsService.searchClaims,
    args: {
      subject: getSpecialPredicate(CURRENT_ENV).iPredicate.vaultId,
      predicate: getSpecialPredicate(CURRENT_ENV).amFollowingPredicate.vaultId,
      object: userIdentity.vault_id,
      page: 1,
      limit: 1,
    },
  })

  if (followClaimResponse.data && followClaimResponse.data.length) {
    followClaim = followClaimResponse.data[0]
  }

  const followingIdentitiesObjects = followingClaims.data.map(
    (claim) => claim.object,
  ) as IdentityPresenter[]
  if (followClaim) {
    const {
      page: followersPage,
      limit: followersLimit,
      sortBy: followersSortBy,
      direction: followersDirection,
    } = getStandardPageParams({
      searchParams,
      paramPrefix: 'followers',
      defaultSortByValue: PositionSortColumn.ASSETS,
    })

    const followersSearch =
      (searchParams.get('followersSearch') as string) || null

    const followers = await fetchWrapper(request, {
      method: ClaimPositionsService.getClaimPositions,
      args: {
        id: followClaim.claim_id,
        page: followersPage,
        limit: followersLimit,
        sortBy: followersSortBy as PositionSortColumn,
        direction: followersDirection,
        creator: followersSearch,
      },
    })

    const followersTotalPages = calculateTotalPages(
      followers?.total ?? 0,
      Number(followersLimit),
    )

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
      followingIdentities: followingIdentitiesObjects,
      followingClaims: followingClaims.data,
      followingSortBy,
      followingDirection,
      followingPagination: {
        currentPage: Number(followingPage),
        limit: Number(followingLimit),
        totalEntries: followingClaims?.total ?? 0,
        totalPages: followingTotalPages,
      },
    }
  }

  return {
    followingIdentities: followingIdentitiesObjects,
    followingClaims: followingClaims.data,
    followingSortBy,
    followingDirection,
    followingPagination: {
      currentPage: Number(followingPage),
      limit: Number(followingLimit),
      totalEntries: followingClaims?.total ?? 0,
      totalPages: followingTotalPages,
    },
  }
}
