import {
  ApiError,
  ClaimPresenter,
  ClaimSortColumn,
  ClaimsService,
} from '@0xintuition/api'

import logger from '@lib/utils/logger'
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

export async function getClaimOrPending(
  request: Request,
  id: string,
): Promise<{ claim?: ClaimPresenter | null; isPending: boolean }> {
  try {
    const claim = await fetchWrapper(request, {
      method: ClaimsService.getClaimById,
      args: { id },
    })
    return { claim, isPending: false }
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      try {
        logger('IDENTITY IS 404')
        const pendingClaim = (await fetchWrapper(request, {
          method: ClaimsService.pendingClaimById,
          args: { id },
        })) as unknown as ClaimPresenter // we're handling the missing identity properties via not rendering anything that relies on any missing properties. otherwise we'd need to set defaults which i'm wary of
        logger(`CLAIM ${id} IS PENDING`)
        logger('pendingClaim', pendingClaim)
        return { claim: pendingClaim, isPending: true }
      } catch (pendingError) {
        logger('catching pendingError')
        return { claim: null, isPending: false }
      }
    }
    throw error
  }
}
