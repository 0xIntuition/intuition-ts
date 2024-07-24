import {
  ClaimPresenter,
  ClaimSortColumn,
  ClaimsService,
  UsersService,
} from '@0xintuition/api'

import {
  AM_WATCHING_DISPLAY_NAME_TESTNET,
  AM_WATCHING_ID_TESTNET,
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

  const userCreatedListClaims = await fetchWrapper({
    method: ClaimsService.searchClaims,
    args: {
      page,
      limit,
      sortBy: sortBy as ClaimSortColumn,
      direction,
      creator: userWallet,
      predicate: TAG_PREDICATE_ID_TESTNET,
    },
  })

  const totalPages = calculateTotalPages(
    userCreatedListClaims?.total ?? 0,
    limit,
  )

  logger('userCreatedListClaims', userCreatedListClaims.total)

  return {
    data: userCreatedListClaims.data as ClaimPresenter[],
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
