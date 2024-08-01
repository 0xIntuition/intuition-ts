import {
  ClaimPresenter,
  ClaimSortColumn,
  ClaimsService,
} from '@0xintuition/api'

import { getStandardPageParams } from '@lib/utils/params'
import { fetchWrapper } from '@server/api'

export async function getClaimsAboutIdentity({
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
    paramPrefix: 'claims',
  })
  const claimsSearch = (searchParams.get('claimsSearch') as string) || null

  const claims = await fetchWrapper(request, {
    method: ClaimsService.searchClaims,
    args: {
      identity: identityId,
      page,
      limit,
      sortBy: sortBy as ClaimSortColumn,
      direction,
      displayName: claimsSearch,
    },
  })

  return {
    data: claims.data as ClaimPresenter[],
    pagination: {
      currentPage: page,
      limit,
      totalEntries: claims.total,
      totalPages: Math.ceil(claims.total / limit),
    },
  }
}
