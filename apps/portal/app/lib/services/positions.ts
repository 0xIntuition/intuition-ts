import {
  ClaimPositionsService,
  IdentityPositionsService,
  PositionPresenter,
  PositionSortColumn,
  VaultType,
} from '@0xintuition/api'

import { getStandardPageParams } from '@lib/utils/params'
import { fetchWrapper } from '@server/api'

export async function getPositionsOnIdentity({
  request,
  identityId,
  searchParams,
}: {
  request: Request
  identityId: string
  searchParams: URLSearchParams
}) {
  const { offset, limit, sortBy, direction } = getStandardPageParams({
    searchParams,
    paramPrefix: 'positions',
    defaultSortByValue: PositionSortColumn.ASSETS,
  })
  const positionsSearch = searchParams.get('positionsSearch')

  const positions = await fetchWrapper(request, {
    method: IdentityPositionsService.getPositions,
    args: {
      identityId,
      limit,
      offset,
      sortBy,
      direction,
      search: positionsSearch,
    },
  })

  return {
    data: positions.data as PositionPresenter[],
    sortBy: sortBy as PositionSortColumn,
    direction,
    pagination: {
      totalEntries: positions.total ?? 0,
      limit,
      offset,
      onOffsetChange: () => {},
      onLimitChange: () => {},
    },
  }
}

export async function getPositionsOnClaim({
  request,
  claimId,
  searchParams,
  vaultType,
}: {
  request: Request
  claimId: string
  searchParams: URLSearchParams
  vaultType?: VaultType
}) {
  const { offset, limit, sortBy, direction } = getStandardPageParams({
    searchParams,
    paramPrefix: 'positions',
    defaultSortByValue: PositionSortColumn.ASSETS,
  })
  const positionsSearch = searchParams.get('positionsSearch')

  const positions = await fetchWrapper(request, {
    method: ClaimPositionsService.getPositions,
    args: {
      claimId,
      limit,
      offset,
      sortBy,
      direction,
      search: positionsSearch,
      vaultType,
    },
  })

  return {
    data: positions.data as PositionPresenter[],
    sortBy: sortBy as PositionSortColumn,
    direction,
    pagination: {
      totalEntries: positions.total ?? 0,
      limit,
      offset,
      onOffsetChange: () => {},
      onLimitChange: () => {},
    },
  }
}
