import {
  ApiError,
  ClaimSortColumn,
  ClaimsService,
  GetIdentityByIdResponse,
  GetIdentityFollowedResponse,
  GetIdentityFollowersResponse,
  GetUserIdentitiesResponse,
  GetUserTotalsResponse,
  IdentitiesService,
  IdentityPositionsService,
  PositionSortColumn,
  SearchClaimsResponse,
  SearchPositionsResponse,
  SortColumn,
  SortDirection,
  UsersService,
} from '@0xintuition/api'

import logger from './logger'

export async function fetchUserIdentity(
  wallet: string,
): Promise<GetIdentityByIdResponse | null> {
  try {
    return await IdentitiesService.getIdentityById({ id: wallet })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      logger(`${error.name} - ${error.status}: ${error.message} ${error.url}`)
      return null
    } else {
      throw error
    }
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
    } else {
      throw error
    }
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
      id: id,
      page: page,
      limit: limit,
      sortBy: sortBy,
      direction: direction,
      creator: search,
    })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      logger(`${error.name} - ${error.status}: ${error.message} ${error.url}`)
      return null
    } else {
      throw error
    }
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
      page: page,
      limit: limit,
      sortBy: sortBy,
      direction: direction,
      displayName: search,
    })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      logger(`${error.name} - ${error.status}: ${error.message} ${error.url}`)
      return null
    } else {
      throw error
    }
  }
}

export async function fetchIdentitiesWithUserPosition(
  id: string,
  page: number,
  limit: number,
  sortBy: SortColumn,
  direction: SortDirection,
  // search: string | null, TODO: Add search once BE implements
): Promise<GetUserIdentitiesResponse | null> {
  try {
    return await UsersService.getUserIdentities({
      user: id,
      page: page,
      limit: Number(limit),
      sortBy: sortBy as SortColumn,
      direction: direction as SortDirection,
    })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      logger(`${error.name} - ${error.status}: ${error.message} ${error.url}`)
      return null
    } else {
      throw error
    }
  }
}

export async function fetchClaimsWithUserPosition(
  id: string,
  page: number,
  limit: number,
  sortBy: SortColumn,
  direction: SortDirection,
  // search: string | null, TODO: Add search once BE implements
): Promise<SearchClaimsResponse | null> {
  try {
    return await UsersService.getUserClaims({
      user: id,
      page: page,
      limit: Number(limit),
      sortBy: sortBy as SortColumn,
      direction: direction as SortDirection,
    })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      logger(`${error.name} - ${error.status}: ${error.message} ${error.url}`)
      return null
    } else {
      throw error
    }
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
      id: id,
      page,
      limit: Number(limit),
      sortBy: sortBy as SortColumn,
      direction: direction as SortDirection,
    })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      logger(`${error.name} - ${error.status}: ${error.message} ${error.url}`)
      return null
    } else {
      throw error
    }
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
      id: id,
      page,
      limit: Number(limit),
      sortBy: sortBy as SortColumn,
      direction: direction as SortDirection,
    })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      logger(`${error.name} - ${error.status}: ${error.message} ${error.url}`)
      return null
    } else {
      throw error
    }
  }
}
