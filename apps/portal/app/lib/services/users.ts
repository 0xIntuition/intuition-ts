import {
  ClaimPresenter,
  ClaimSortColumn,
  ClaimsService,
  IdentitiesService,
  IdentityPresenter,
  SortColumn,
  UsersService,
} from '@0xintuition/api'

import { getStandardPageParams } from '@lib/utils/params'
import { fetchWrapper } from '@server/api'

export async function getUserIdentities({
  request,
  userWallet,
  searchParams,
}: {
  request: Request
  userWallet: string
  searchParams: URLSearchParams
}) {
  const { page, limit, sortBy, direction } = getStandardPageParams({
    searchParams,
    defaultSortByValue: 'UserAssets',
    paramPrefix: 'activeIdentities',
  })
  const identitiesSearch =
    (searchParams.get('activeIdentitiesSearch') as string) || null

  const result = await fetchWrapper(request, {
    method: UsersService.getUserIdentities,
    args: {
      user: userWallet,
      page,
      limit,
      sortBy: sortBy as SortColumn,
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
  request,
  userWallet,
  searchParams,
}: {
  request: Request
  userWallet: string
  searchParams: URLSearchParams
}) {
  const { page, limit, sortBy, direction } = getStandardPageParams({
    searchParams,
    paramPrefix: 'createdIdentities',
  })
  const identitiesSearch =
    (searchParams.get('identitiesSearch') as string) || null

  const identities = await fetchWrapper(request, {
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
  request,
  userWallet,
  searchParams,
}: {
  request: Request
  userWallet: string
  searchParams: URLSearchParams
}) {
  const { page, limit, sortBy, direction } = getStandardPageParams({
    searchParams,
    defaultSortByValue: 'UserAssets',
    paramPrefix: 'activeClaims',
  })
  const claimsSearch =
    (searchParams.get('activeClaimsSearch') as string) || null

  const result = await fetchWrapper(request, {
    method: UsersService.getUserClaims,
    args: {
      user: userWallet,
      page,
      limit,
      sortBy: sortBy as SortColumn,
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
  request,
  userWallet,
  searchParams,
}: {
  request: Request
  userWallet: string
  searchParams: URLSearchParams
}) {
  const { page, limit, sortBy, direction } = getStandardPageParams({
    searchParams,
    paramPrefix: 'createdClaims',
  })
  const claimsSearch = (searchParams.get('claimsSearch') as string) || null

  const claims = await fetchWrapper(request, {
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
