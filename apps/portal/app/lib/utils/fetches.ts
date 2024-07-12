import {
  ApiError,
  ClaimPositionsService,
  ClaimSortColumn,
  ClaimsService,
  ClaimSummaryResponse,
  GetClaimByIdResponse,
  GetClaimPositionsResponse,
  GetIdentityByIdResponse,
  GetIdentityFollowedResponse,
  GetIdentityFollowersResponse,
  GetUserIdentitiesResponse,
  GetUserTotalsResponse,
  IdentitiesService,
  IdentityPositionsService,
  PositionSortColumn,
  SearchClaimsResponse,
  SearchIdentityResponse,
  SearchPositionsResponse,
  SortColumn,
  SortDirection,
  UsersService,
} from '@0xintuition/api'

import logger from './logger'

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
