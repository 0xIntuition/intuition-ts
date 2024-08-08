import {
  ClaimPositionsService,
  Identifier,
  IdentityPositionsService,
  PositionPresenter,
  PositionSortColumn,
  PositionsService,
  SortDirection,
  VaultType,
} from '@0xintuition/api'

import { calculateTotalPages } from '@lib/utils/misc'
import { getStandardPageParams } from '@lib/utils/params'
import { fetchWrapper } from '@server/api'
import { PaginationType } from 'app/types/pagination'

export async function getPositionsOnIdentity({
  request,
  identityId,
  searchParams,
}: {
  request: Request
  identityId: string
  searchParams: URLSearchParams
}) {
  const { page, limit, sortBy, direction } = getStandardPageParams({
    searchParams,
    paramPrefix: 'positions',
    defaultSortByValue: PositionSortColumn.ASSETS,
  })
  const positionsSearch =
    (searchParams.get('positionsSearch') as Identifier) || null

  const positions = await fetchWrapper(request, {
    method: PositionsService.positionSummary,
    args: {
      id: identityId,
      page,
      limit,
      sortBy: sortBy as PositionSortColumn,
      direction,
      creator: positionsSearch,
    },
  })

  return {
    data: positions.data as PositionPresenter[],
    pagination: {
      currentPage: page,
      limit,
      totalEntries: positions.total,
      totalPages: Math.ceil(positions.total / limit),
    },
  }
}

export async function getPositionsOnClaim({
  request,
  claimId,
  searchParams,
}: {
  request: Request
  claimId: string
  searchParams: URLSearchParams
}): Promise<{
  data: PositionPresenter[]
  sortBy: PositionSortColumn
  direction: SortDirection
  pagination: PaginationType
}> {
  const { page, limit, sortBy, direction } = getStandardPageParams({
    searchParams,
    paramPrefix: 'positions',
    defaultSortByValue: PositionSortColumn.CREATED_AT,
  })
  const creator = searchParams.get('positionsSearch')
  const positionDirection =
    (searchParams.get('positionDirection') as VaultType) || null

  const positions = await fetchWrapper(request, {
    method: ClaimPositionsService.getClaimPositions,
    args: {
      id: claimId,
      page,
      limit,
      sortBy: sortBy as PositionSortColumn,
      direction,
      creator,
      positionDirection,
    },
  })

  return {
    data: positions.data as PositionPresenter[],
    sortBy: sortBy as PositionSortColumn,
    direction,
    pagination: {
      currentPage: page,
      limit,
      totalEntries: positions.total,
      totalPages: calculateTotalPages(positions.total ?? 0, limit),
    },
  }
}
