import {
  ActivitiesService,
  ApiError,
  ClaimPositionsService,
  ClaimSortColumn,
  ClaimsService,
  ClaimSummaryResponse,
  GetActivitiesResponse,
  GetClaimByIdResponse,
  GetClaimPositionsResponse,
  GetIdentityByIdResponse,
  GetIdentityFollowedResponse,
  GetIdentityFollowersResponse,
  GetUserByWalletResponse,
  GetUserIdentitiesResponse,
  GetUserTotalsResponse,
  IdentitiesService,
  IdentityPositionsService,
  IdentitySummaryResponse,
  PositionSortColumn,
  SearchClaimsResponse,
  SearchIdentityResponse,
  SearchPositionsResponse,
  SortColumn,
  SortDirection,
  UsersService,
} from '@0xintuition/api'

import logger from './logger'

export async function getUserByWallet(
  wallet: string,
): Promise<GetUserByWalletResponse | null> {
  try {
    return await UsersService.getUserByWalletPublic({ wallet })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      logger(`${error.name} - ${error.status}: ${error.message} ${error.url}`)
      return null
    }
    throw error
  }
}

export async function fetchIdentity(
  id: string,
): Promise<GetIdentityByIdResponse | null> {
  try {
    return await IdentitiesService.getIdentityById({ id })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      logger(`${error.name} - ${error.status}: ${error.message} ${error.url}`)
      return null
    }
    throw error
  }
}

export async function fetchClaim(
  id: string,
): Promise<GetClaimByIdResponse | null> {
  try {
    return await ClaimsService.getClaimById({ id })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      logger(`${error.name} - ${error.status}: ${error.message} ${error.url}`)
      return null
    }
    throw error
  }
}

export async function fetchUserIdentities(
  page: number,
  limit: number,
  sortBy: SortColumn,
  direction: SortDirection,
  search: string | null,
): Promise<SearchIdentityResponse | null> {
  try {
    return await IdentitiesService.searchIdentity({
      page,
      limit,
      sortBy,
      direction,
      displayName: search,
      isUser: true,
    })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      logger(`${error.name} - ${error.status}: ${error.message} ${error.url}`)
      return null
    }
    throw error
  }
}

export async function fetchUserTotals(
  creatorId: string,
): Promise<GetUserTotalsResponse | null> {
  try {
    return await UsersService.getUserTotals({ id: creatorId })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      logger(`${error.name} - ${error.status}: ${error.message} ${error.url}`)
      return null
    }
    throw error
  }
}

export async function fetchIdentities(
  page?: number,
  limit?: number,
  sortBy?: SortColumn,
  direction?: SortDirection,
  search?: string | null,
): Promise<SearchIdentityResponse | null> {
  try {
    return await IdentitiesService.searchIdentity({
      page: page ?? 1,
      limit: limit ?? 10,
      sortBy: sortBy ?? 'AssetsSum',
      direction: direction ?? 'desc',
      displayName: search ?? null,
      isUser: false,
    })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      logger(`${error.name} - ${error.status}: ${error.message} ${error.url}`)
      return null
    }
    throw error
  }
}

export async function fetchPositionsOnIdentity(
  id: string,
  page: number,
  limit: number,
  sortBy: PositionSortColumn,
  direction: SortDirection,
  search: string | null,
): Promise<SearchPositionsResponse | null> {
  try {
    return await IdentityPositionsService.getIdentityPositions({
      id,
      page,
      limit,
      sortBy,
      direction,
      creator: search,
    })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      logger(`${error.name} - ${error.status}: ${error.message} ${error.url}`)
      return null
    }
    throw error
  }
}

export async function fetchClaims(
  page: number,
  limit: number,
  sortBy: ClaimSortColumn,
  direction: SortDirection,
  search: string | null,
): Promise<SearchClaimsResponse | null> {
  try {
    return await ClaimsService.searchClaims({
      page,
      limit,
      sortBy,
      direction,
      displayName: search,
    })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      logger(`${error.name} - ${error.status}: ${error.message} ${error.url}`)
      return null
    }
    throw error
  }
}

export async function fetchPositionsOnClaim(
  id: string,
  page: number,
  limit: number,
  sortBy: PositionSortColumn,
  direction: SortDirection,
  search: string | null,
): Promise<GetClaimPositionsResponse | null> {
  try {
    return await ClaimPositionsService.getClaimPositions({
      id,
      page,
      limit,
      sortBy,
      direction,
      creator: search,
    })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      logger(`${error.name} - ${error.status}: ${error.message} ${error.url}`)
      return null
    }
    throw error
  }
}

export async function fetchClaimsAboutIdentity(
  id: string,
  page: number,
  limit: number,
  sortBy: ClaimSortColumn,
  direction: SortDirection,
  search: string | null,
): Promise<SearchClaimsResponse | null> {
  try {
    return await ClaimsService.searchClaims({
      identity: id,
      page,
      limit,
      sortBy,
      direction,
      displayName: search,
    })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      logger(`${error.name} - ${error.status}: ${error.message} ${error.url}`)
      return null
    }
    throw error
  }
}

export async function fetchIdentitiesCreatedByUser(
  page: number,
  limit: number,
  sortBy: SortColumn,
  direction: SortDirection,
  creator: string,
  search: string | null,
): Promise<SearchIdentityResponse | null> {
  try {
    return await IdentitiesService.searchIdentity({
      page,
      limit,
      sortBy,
      direction,
      displayName: search,
      creator,
      isUser: false,
    })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      logger(`${error.name} - ${error.status}: ${error.message} ${error.url}`)
      return null
    }
    throw error
  }
}

export async function fetchClaimsCreatedByUser(
  page: number,
  limit: number,
  sortBy: ClaimSortColumn,
  direction: SortDirection,
  creator: string,
  search: string | null,
): Promise<SearchClaimsResponse | null> {
  try {
    return await ClaimsService.searchClaims({
      page,
      limit,
      sortBy,
      direction,
      creator,
      displayName: search,
    })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      logger(`${error.name} - ${error.status}: ${error.message} ${error.url}`)
      return null
    }
    throw error
  }
}

export async function fetchIdentitiesWithUserPosition(
  id: string,
  page: number,
  limit: number,
  sortBy: SortColumn,
  direction: SortDirection,
  search: string | null,
): Promise<GetUserIdentitiesResponse | null> {
  try {
    return await UsersService.getUserIdentities({
      user: id,
      page,
      limit: Number(limit),
      sortBy: sortBy as SortColumn,
      direction: direction as SortDirection,
      displayName: search,
    })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      logger(`${error.name} - ${error.status}: ${error.message} ${error.url}`)
      return null
    }
    throw error
  }
}

export async function fetchClaimsWithUserPosition(
  id: string,
  page: number,
  limit: number,
  sortBy: SortColumn,
  direction: SortDirection,
  search: string | null,
): Promise<SearchClaimsResponse | null> {
  try {
    return await UsersService.getUserClaims({
      user: id,
      page,
      limit: Number(limit),
      sortBy: sortBy as SortColumn,
      direction: direction as SortDirection,
      displayName: search,
    })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      logger(`${error.name} - ${error.status}: ${error.message} ${error.url}`)
      return null
    }
    throw error
  }
}

export async function fetchIdentityFollowers(
  id: string,
  page: number,
  limit: number,
  sortBy: SortColumn,
  direction: SortDirection,
  // search: string | null, TODO: Add search once BE implements
): Promise<GetIdentityFollowersResponse | null> {
  try {
    return await IdentitiesService.getIdentityFollowers({
      id,
      page,
      limit: Number(limit),
      sortBy: sortBy as SortColumn,
      direction: direction as SortDirection,
    })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      logger(`${error.name} - ${error.status}: ${error.message} ${error.url}`)
      return null
    }
    throw error
  }
}

export async function fetchIdentityFollowing(
  id: string,
  page: number,
  limit: number,
  sortBy: SortColumn,
  direction: SortDirection,
  // search: string | null, TODO: Add search once BE implements
): Promise<GetIdentityFollowedResponse | null> {
  try {
    return await IdentitiesService.getIdentityFollowed({
      id,
      page,
      limit: Number(limit),
      sortBy: sortBy as SortColumn,
      direction: direction as SortDirection,
    })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      logger(`${error.name} - ${error.status}: ${error.message} ${error.url}`)
      return null
    }
    throw error
  }
}

export async function fetchClaimsSummary(
  id: string,
): Promise<ClaimSummaryResponse | null> {
  try {
    return await ClaimsService.claimSummary({
      identity: id,
    })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      logger(`${error.name} - ${error.status}: ${error.message} ${error.url}`)
      return null
    }
    throw error
  }
}

export async function fetchCreatedClaimsSummary(
  wallet: string,
): Promise<ClaimSummaryResponse | null> {
  try {
    return await ClaimsService.claimSummary({
      creator: wallet,
    })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      logger(`${error.name} - ${error.status}: ${error.message} ${error.url}`)
      return null
    }
    throw error
  }
}

export async function fetchCreatedIdentitiesSummary(
  wallet: string,
): Promise<IdentitySummaryResponse | null> {
  try {
    return await IdentitiesService.identitySummary({
      creator: wallet,
    })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      logger(`${error.name} - ${error.status}: ${error.message} ${error.url}`)
      return null
    }
    throw error
  }
}

export async function fetchGlobalActivity(
  page: number,
  limit: number,
  sortBy: SortColumn,
  direction: SortDirection,
): Promise<GetActivitiesResponse | null> {
  try {
    return await ActivitiesService.getActivities({
      page,
      limit,
      sortBy,
      direction,
    })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      logger(`${error.name} - ${error.status}: ${error.message} ${error.url}`)
      return null
    }
    throw error
  }
}

export async function fetchUserActivity(
  page: number,
  limit: number,
  sortBy: SortColumn,
  direction: SortDirection,
  fromAddress: string,
): Promise<GetActivitiesResponse | null> {
  try {
    return await ActivitiesService.getActivities({
      page,
      limit,
      sortBy,
      direction,
      fromAddress,
    })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      logger(`${error.name} - ${error.status}: ${error.message} ${error.url}`)
      return null
    }
    throw error
  }
}
