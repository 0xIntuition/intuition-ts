import {
  ClaimPresenter,
  ClaimSortColumn,
  ClaimsService,
  IdentityPresenter,
  PositionSortColumn,
  UsersService,
} from '@0xintuition/api'

import logger from '@lib/utils/logger'
import { calculateTotalPages } from '@lib/utils/misc'
import { getStandardPageParams } from '@lib/utils/params'
import { fetchWrapper } from '@server/api'
import {
  TAG_PREDICATE_DISPLAY_NAME_TESTNET,
  TAG_PREDICATE_ID_TESTNET,
} from 'consts'

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
      predicate: TAG_PREDICATE_ID_TESTNET,
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
}: {
  request: Request
  userWallet: string
  searchParams: URLSearchParams
}) {
  const { page, limit, sortBy, direction } = getStandardPageParams({
    searchParams,
    paramPrefix: 'positions',
    defaultSortByValue: PositionSortColumn.CREATED_AT,
  })

  const savedListClaims = await fetchWrapper(request, {
    method: UsersService.getUserClaims,
    args: {
      page,
      limit,
      sortBy,
      direction,
      displayName: TAG_PREDICATE_DISPLAY_NAME_TESTNET,
      user: userWallet,
    },
  })

  const totalPages = calculateTotalPages(savedListClaims?.total ?? 0, limit)
  logger('savedListClaims', savedListClaims)

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
  searchParams,
}: {
  request: Request
  objectId: string
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
      predicate: TAG_PREDICATE_ID_TESTNET,
      object: objectId,
      displayName,
    },
  })

  const totalPages = calculateTotalPages(listIdentities?.total ?? 0, limit)

  const listIdentitiesSubjects = listIdentities.data.map(
    (claim) => claim.subject,
  ) as IdentityPresenter[]

  logger('getListIdentities', listIdentities.total)

  return {
    listIdentities: listIdentitiesSubjects as IdentityPresenter[],
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
}: {
  request: Request
  objectId: string
}) {
  const listIdentities = await fetchWrapper(request, {
    method: ClaimsService.searchClaims,
    args: {
      predicate: TAG_PREDICATE_ID_TESTNET,
      object: objectId,
      page: 1,
      limit: 1,
    },
  })

  return listIdentities.total
}
