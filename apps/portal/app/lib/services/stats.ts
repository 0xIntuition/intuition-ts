import {
  ClaimsService,
  IdentitiesService,
  SortDirection,
} from '@0xintuition/api'

import { fetchWrapper } from '@server/api'

export async function getSystemStats(request: Request) {
  const [totalIdentities, totalClaims, totalUsers] = await Promise.all([
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
  ])

  return {
    totalIdentities,
    totalClaims,
    totalUsers,
  }
}
