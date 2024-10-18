import {
  ClaimPresenter,
  ClaimSortColumn,
  ClaimsService,
  PositionSortColumn,
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
      sortBy: sortBy as ClaimSortColumn,
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

export async function getListClaims({
  request,
  objectId,
  creator,
  userWithPosition,
  searchParams,
  userAssetsForPresent = null,
}: {
  request: Request
  objectId: string
  creator?: string
  userWithPosition?: string
  searchParams: URLSearchParams
  userAssetsForPresent?: boolean | null
}) {
  const { page, limit, sortBy, direction } = getStandardPageParams({
    searchParams,
    paramPrefix: 'claims',
    defaultSortByValue: ClaimSortColumn.ASSETS_SUM,
  })
  const displayName = searchParams.get('search') || null

  const listClaims = await fetchWrapper(request, {
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
      userWithPosition,
      userAssetsForPresent,
    },
  })

  const totalPages = calculateTotalPages(listClaims?.total ?? 0, limit)

  return {
    claims: listClaims.data as ClaimPresenter[],
    pagination: {
      currentPage: Number(page),
      limit: Number(limit),
      totalEntries: listClaims.total,
      totalPages,
    },
  }
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
