import {
  ClaimPresenter,
  ClaimSortColumn,
  ClaimsService,
  IdentityPresenter,
  PositionSortColumn,
  SortColumn,
  SortDirection,
  UsersService,
} from '@0xintuition/api'

import { getSpecialPredicate } from '@lib/utils/app'
import { calculateTotalPages } from '@lib/utils/misc'
import { getStandardPageParams } from '@lib/utils/params'
import { fetchWrapper } from '@server/api'
import { CURRENT_ENV } from 'app/consts'

export async function getUserCreatedLists({
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
    paramPrefix: 'claims',
    defaultSortByValue: ClaimSortColumn.ASSETS_SUM,
  })
  const displayName = searchParams.get('search') || null

  const userCreatedListClaims = await fetchWrapper(request, {
    method: ClaimsService.searchClaims,
    args: {
      page,
      limit,
      sortBy: sortBy as ClaimSortColumn,
      direction,
      creator: userWallet,
      predicate: getSpecialPredicate(CURRENT_ENV).tagPredicate.id,
      displayName,
    },
  })

  const totalPages = calculateTotalPages(
    userCreatedListClaims?.total ?? 0,
    limit,
  )

  return {
    userCreatedListClaims: userCreatedListClaims.data as ClaimPresenter[],
    pagination: {
      currentPage: page,
      limit,
      totalEntries: userCreatedListClaims.total,

      totalPages,
    },
  }
}

export async function getUserSavedLists({
  request,
  userWallet,
  searchParams,
  limit: customLimit,
}: {
  request: Request
  userWallet: string
  searchParams: URLSearchParams
  limit?: number
}) {
  const {
    page,
    limit: defaultLimit,
    sortBy,
    direction,
  } = getStandardPageParams({
    searchParams,
    paramPrefix: 'positions',
    defaultSortByValue: PositionSortColumn.CREATED_AT,
  })

  const limit = customLimit ?? defaultLimit
  const displayName = searchParams.get('search') || null

  const savedListClaims = await fetchWrapper(request, {
    method: UsersService.getUserClaims,
    args: {
      page,
      limit,
      sortBy: sortBy as SortColumn,
      direction,
      displayName,
      predicate: getSpecialPredicate(CURRENT_ENV).tagPredicate.id,
      user: userWallet,
    },
  })

  const totalPages = calculateTotalPages(savedListClaims?.total ?? 0, limit)

  return {
    savedListClaims: savedListClaims.data as ClaimPresenter[],
    pagination: {
      currentPage: page,
      limit,
      totalEntries: savedListClaims.total,
      totalPages,
    },
  }
}

export async function getListIdentities({
  request,
  objectId,
  creator,
  searchParams,
}: {
  request: Request
  objectId: string
  creator?: string
  searchParams: URLSearchParams
}) {
  const { page, limit, sortBy, direction } = getStandardPageParams({
    searchParams,
    paramPrefix: 'claims',
    defaultSortByValue: ClaimSortColumn.ASSETS_SUM,
  })
  const displayName = searchParams.get('search') || null

  const listIdentities = await fetchWrapper(request, {
    method: ClaimsService.searchClaims,
    args: {
      page,
      limit,
      sortBy: sortBy as ClaimSortColumn,
      direction,
      predicate: getSpecialPredicate(CURRENT_ENV).tagPredicate.id,
      object: objectId,
      displayName,
      creator,
    },
  })

  const totalPages = calculateTotalPages(listIdentities?.total ?? 0, limit)

  const listIdentitiesSubjects = listIdentities.data.map(
    (claim) => claim.subject,
  ) as IdentityPresenter[]

  return {
    listIdentities: listIdentitiesSubjects as IdentityPresenter[],
    claims: listIdentities.data as ClaimPresenter[],
    pagination: {
      currentPage: Number(page),
      limit: Number(limit),
      totalEntries: listIdentities.total,

      totalPages,
    },
  }
}

export async function getListIdentitiesCount({
  request,
  objectId,
  creator,
}: {
  request: Request
  objectId: string
  creator?: string
}) {
  const listIdentities = await fetchWrapper(request, {
    method: ClaimsService.searchClaims,
    args: {
      predicate: getSpecialPredicate(CURRENT_ENV).tagPredicate.id,
      object: objectId,
      creator,
      page: 1,
      limit: 1,
    },
  })

  return listIdentities.total
}

export async function getFeaturedLists({
  request,
  listIds,
}: {
  request: Request
  listIds: number[]
}) {
  const commonArgs = {
    limit: 1,
    sortBy: ClaimSortColumn.CREATED_AT,
    direction: SortDirection.DESC,
    predicate: getSpecialPredicate(CURRENT_ENV).tagPredicate.vaultId,
  }

  const featuredListsResults = await Promise.all(
    listIds.map((id) =>
      fetchWrapper(request, {
        method: ClaimsService.searchClaims,
        args: {
          ...commonArgs,
          object: id,
        },
      }),
    ),
  )

  const featuredLists = featuredListsResults
    .flatMap((result) => result.data)
    .filter(Boolean) as ClaimPresenter[]

  return {
    featuredLists,
    total: featuredLists.length,
  }
}
