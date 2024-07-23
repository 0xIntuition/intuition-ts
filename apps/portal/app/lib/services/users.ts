import { SortColumn, UsersService } from '@0xintuition/api'

import { fetchWrapper } from '@lib/utils/misc'
import { getStandardPageParams } from '@lib/utils/params'

export async function getUserIdentities({
  userWallet,
  searchParams,
}: {
  userWallet: string
  searchParams: URLSearchParams
}) {
  const { page, limit, sortBy, direction } = getStandardPageParams({
    searchParams,
    paramPrefix: 'activeIdentities',
    defaultSortByValue: SortColumn.USER_ASSETS,
  })

  const search = searchParams.get('activeIdentitiesSearch')

  const result = await fetchWrapper({
    method: UsersService.getUserIdentities,
    args: {
      user: userWallet,
      page,
      limit,
      sortBy,
      direction,
      displayName: search,
    },
  })

  return {
    data: result?.data,
    pagination: {
      currentPage: Number(page),
      limit: Number(limit),
      totalEntries: result?.total ?? 0,
      totalPages: Math.ceil((result?.total ?? 0) / Number(limit)),
    },
  }
}

export async function getUserClaims({
  userWallet,
  searchParams,
}: {
  userWallet: string
  searchParams: URLSearchParams
}) {
  const { page, limit, sortBy, direction } = getStandardPageParams({
    searchParams,
    paramPrefix: 'activeClaims',
  })

  const search = searchParams.get('activeClaimsSearch')

  const result = await fetchWrapper({
    method: UsersService.getUserClaims,
    args: {
      user: userWallet,
      page,
      limit,
      sortBy,
      direction,
      displayName: search,
    },
  })

  return {
    data: result?.data,
    pagination: {
      currentPage: Number(page),
      limit: Number(limit),
      totalEntries: result?.total ?? 0,
      totalPages: Math.ceil((result?.total ?? 0) / Number(limit)),
    },
  }
}
