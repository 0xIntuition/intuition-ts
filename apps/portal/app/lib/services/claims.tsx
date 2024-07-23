import {
  ClaimPresenter,
  ClaimSortColumn,
  ClaimsService,
  ClaimSummaryResponse,
} from '@0xintuition/api'

import { fetchWrapper } from '@lib/utils/misc'
import { getStandardPageParams } from '@lib/utils/params'

export async function getClaimsAboutIdentity({
  identityId,
  searchParams,
}: {
  identityId: string
  searchParams: URLSearchParams
}) {
  const { page, limit, sortBy, direction } = getStandardPageParams({
    searchParams,
    paramPrefix: 'claims',
  })
  const claimsSearch = (searchParams.get('claimsSearch') as string) || null

  const claims = await fetchWrapper({
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
      currentPage: Number(page),
      limit: Number(limit),
      totalEntries: claims.total,
      totalPages: Math.ceil(claims.total / Number(limit)),
    },
  }
}

export async function getClaimSummaryAboutIdentity({
  identityId,
}: {
  identityId: string
}) {
  const claimSummary = await ClaimsService.claimSummary({
    identity: identityId,
  })

  return claimSummary as ClaimSummaryResponse
}
