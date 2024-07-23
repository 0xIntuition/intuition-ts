import {
  Identifier,
  IdentityPositionsService,
  PositionPresenter,
  PositionSortColumn,
} from '@0xintuition/api'

import { fetchWrapper } from '@lib/utils/misc'
import { getStandardPageParams } from '@lib/utils/params'

export async function getPositionsOnIdentity({
  identityId,
  searchParams,
}: {
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

  const positions = await fetchWrapper({
    method: IdentityPositionsService.getIdentityPositions,
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
      currentPage: Number(page),
      limit: Number(limit),
      totalEntries: positions.total,
      totalPages: Math.ceil(positions.total / Number(limit)),
    },
  }
}
