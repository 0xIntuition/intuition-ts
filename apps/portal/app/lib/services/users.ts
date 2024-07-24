import {
  ClaimPresenter,
  ClaimSortColumn,
  ClaimsService,
  IdentitiesService,
  IdentityPresenter,
  SortColumn,
  UsersService,
} from '@0xintuition/api'

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
  })
  const identitiesSearch =
    (searchParams.get('activeIdentitiesSearch') as string) || null

  const result = await fetchWrapper({
    method: UsersService.getUserIdentities,
    args: {
      user: userWallet,
      page,
      limit,
      sortBy,
      direction,
      displayName: identitiesSearch,
    },
  })

  return {
    data: result?.data,
    pagination: {
      currentPage: page,
      limit,
      totalEntries: result?.total ?? 0,
      totalPages: Math.ceil((result?.total ?? 0) / limit),
    },
  }
}

export async function getCreatedIdentities({
  userWallet,
  searchParams,
}: {
  userWallet: string
  searchParams: URLSearchParams
}) {
  const { page, limit, sortBy, direction } = getStandardPageParams({
    searchParams,
    paramPrefix: 'createdIdentities',
  })
  const identitiesSearch =
    (searchParams.get('identitiesSearch') as string) || null

  const identities = await fetchWrapper({
    method: IdentitiesService.searchIdentity,
    args: {
      page,
      limit,
      sortBy: sortBy as SortColumn,
      direction,
      creator: userWallet,
      displayName: identitiesSearch,
    },
  })

  return {
    data: identities.data as IdentityPresenter[],
    pagination: {
      currentPage: page,
      limit,
      totalEntries: identities.total,
      totalPages: Math.ceil(identities.total / limit),
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
  const claimsSearch =
    (searchParams.get('activeClaimsSearch') as string) || null

  const result = await fetchWrapper({
    method: UsersService.getUserClaims,
    args: {
      user: userWallet,
      page,
      limit,
      sortBy,
      direction,
      displayName: claimsSearch,
    },
  })

  return {
    data: result?.data,
    pagination: {
      currentPage: page,
      limit,
      totalEntries: result?.total ?? 0,
      totalPages: Math.ceil((result?.total ?? 0) / limit),
    },
  }
}

export async function getCreatedClaims({
  userWallet,
  searchParams,
}: {
  userWallet: string
  searchParams: URLSearchParams
}) {
  const { page, limit, sortBy, direction } = getStandardPageParams({
    searchParams,
    paramPrefix: 'createdClaims',
  })
  const claimsSearch = (searchParams.get('claimsSearch') as string) || null

  const claims = await fetchWrapper({
    method: ClaimsService.searchClaims,
    args: {
      page,
      limit,
      sortBy: sortBy as ClaimSortColumn,
      direction,
      creator: userWallet,
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
