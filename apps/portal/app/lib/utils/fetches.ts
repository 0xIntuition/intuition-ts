import {
  ApiError,
  ClaimSortColumn,
  ClaimsService,
  GetIdentityByIdResponse,
  GetUserTotalsResponse,
  IdentitiesService,
  PositionSortColumn,
  PositionsService,
  SearchClaimsResponse,
  SearchPositionsResponse,
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

export async function fetchPositionsByIdentity(
  id: string,
  page: number,
  limit: number,
  sortBy: PositionSortColumn,
  direction: SortDirection,
): Promise<SearchPositionsResponse | null> {
  try {
    return await PositionsService.searchPositions({
      identity: id,
      paging: {
        page: page,
        limit: limit,
        offset: 0,
      },
      sort: {
        sortBy: sortBy,
        direction: direction,
      },
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

export async function fetchClaimsByIdentity(
  id: string,
  page: number,
  limit: number,
  sortBy: ClaimSortColumn,
  direction: SortDirection,
): Promise<SearchClaimsResponse | null> {
  try {
    return await ClaimsService.searchClaims({
      identity: id,
      page: page,
      limit: limit,
      offset: 0,
      sortBy: sortBy,
      direction: direction,
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
