import {
  ClaimPresenter,
  ClaimSortColumn,
  ClaimsService,
  IdentityPresenter,
  UsersService,
} from '@0xintuition/api'

import {
  AM_WATCHING_DISPLAY_NAME_TESTNET,
  TAG_PREDICATE_ID_TESTNET,
} from '@lib/utils/constants'
import logger from '@lib/utils/logger'
import { calculateTotalPages, fetchWrapper } from '@lib/utils/misc'
import { getStandardPageParams } from '@lib/utils/params'

export async function getUserCreatedLists({
  userWallet,
  searchParams,
}: {
  userWallet: string
  searchParams: URLSearchParams
}) {
  const { page, limit, sortBy, direction } = getStandardPageParams({
    searchParams,
    paramPrefix: 'claims',
    defaultSortByValue: ClaimSortColumn.ASSETS_SUM,
  })
  const displayName = searchParams.get('search') || null

  const userCreatedListClaims = await fetchWrapper({
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

  logger('userCreatedListClaims', userCreatedListClaims.total)

  return {
    userCreatedListClaims: userCreatedListClaims.data as ClaimPresenter[],
    pagination: {
      currentPage: Number(page),
      limit: Number(limit),
      totalEntries: userCreatedListClaims.total,

      totalPages,
    },
  }
}

export async function getUserSavedLists({
  userWallet,
  searchParams,
}: {
  userWallet: string
  searchParams: URLSearchParams
}) {
  const { page, limit, sortBy, direction } = getStandardPageParams({
    searchParams,
    paramPrefix: 'claims',
    defaultSortByValue: ClaimSortColumn.ASSETS_SUM,
  })

  const savedListClaims = await fetchWrapper({
    method: UsersService.getUserClaims,
    args: {
      page,
      limit,
      sortBy,
      direction,
      displayName: AM_WATCHING_DISPLAY_NAME_TESTNET,
      user: userWallet,
    },
  })

  const totalPages = calculateTotalPages(savedListClaims?.total ?? 0, limit)
  logger('savedListClaims', savedListClaims.total)

  return {
    savedListClaims: savedListClaims.data as ClaimPresenter[],
    pagination: {
      currentPage: Number(page),
      limit: Number(limit),
      totalEntries: savedListClaims.total,
      totalPages,
    },
  }
}

export async function getListIdentities({
  objectId,
  searchParams,
}: {
  objectId: string
  searchParams: URLSearchParams
}) {
  const { page, limit, sortBy, direction } = getStandardPageParams({
    searchParams,
    paramPrefix: 'claims',
    defaultSortByValue: ClaimSortColumn.ASSETS_SUM,
  })
  const displayName = searchParams.get('search') || null

  const listIdentities = await fetchWrapper({
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
  objectId,
}: {
  objectId: string
}) {
  const listIdentities = await fetchWrapper({
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
