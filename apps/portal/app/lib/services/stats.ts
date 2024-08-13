import {
  ClaimsService,
  IdentitiesService,
  PositionsService,
  SortDirection,
} from '@0xintuition/api'

import { fetchWrapper } from '@server/api'

export async function getSystemStats({ request }: { request: Request }) {
  const [totalIdentities, totalClaims, totalUsers, positionsSummary] =
    await Promise.all([
      fetchWrapper(request, {
        method: IdentitiesService.getIdentities,
        args: {
          limit: 1,
          direction: SortDirection.DESC,
        },
      }).then((response) => response.total),
      fetchWrapper(request, {
        method: ClaimsService.getClaims,
        args: {
          limit: 1,
          direction: SortDirection.DESC,
        },
      }).then((response) => response.total),
      fetchWrapper(request, {
        method: IdentitiesService.searchIdentity,
        args: {
          limit: 1,
          direction: SortDirection.DESC,
          isUser: true,
        },
      }).then((response) => response.total),
      fetchWrapper(request, {
        method: PositionsService.positionSummary,
        args: {
          paging: { page: 1, limit: 1, offset: 0 },
          sort: { direction: SortDirection.DESC },
        },
      }),
    ])

  return {
    totalIdentities,
    totalClaims,
    totalUsers,
    totalSignals: positionsSummary.total,
    totalStaked: positionsSummary.assets,
  }
}
