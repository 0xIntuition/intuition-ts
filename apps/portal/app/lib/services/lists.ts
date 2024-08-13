import {
  ClaimPresenter,
  ClaimSortColumn,
  ClaimsService,
  IdentityPresenter,
  PositionSortColumn,
  SortDirection,
  UsersService,
} from '@0xintuition/api'

import logger from '@lib/utils/logger'
import { calculateTotalPages } from '@lib/utils/misc'
import { getStandardPageParams } from '@lib/utils/params'
import { fetchWrapper } from '@server/api'
import {
  FEATURED_LIST_OBJECT_IDS,
  TAG_PREDICATE_DISPLAY_NAME_TESTNET,
  TAG_PREDICATE_ID_TESTNET,
  TAG_PREDICATE_VAULT_ID_TESTNET,
} from 'app/consts'

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
      predicate: TAG_PREDICATE_ID_TESTNET,
      object: objectId,
      displayName,
      creator,
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
  creator,
}: {
  request: Request
  objectId: string
  creator?: string
}) {
  const listIdentities = await fetchWrapper(request, {
    method: ClaimsService.searchClaims,
    args: {
      predicate: TAG_PREDICATE_ID_TESTNET,
      object: objectId,
      creator,
      page: 1,
      limit: 1,
    },
  })

  return listIdentities.total
}

export async function getFeaturedLists({ request }: { request: Request }) {
  const commonArgs = {
    limit: 1,
    sortBy: ClaimSortColumn.CREATED_AT,
    direction: SortDirection.DESC,
    predicate: TAG_PREDICATE_VAULT_ID_TESTNET,
  }

  const featuredListsResults = await Promise.all(
    FEATURED_LIST_OBJECT_IDS.map((id) =>
      fetchWrapper(request, {
        method: ClaimsService.searchClaims,
        args: {
          ...commonArgs,
          object: id,
        },
      }),
    ),
  )

  logger('featuredListsResults', featuredListsResults)
  const featuredLists = featuredListsResults
    .flatMap((result) => result.data)
    .filter(Boolean) as ClaimPresenter[]

  return {
    featuredLists,
    total: featuredLists.length,
  }
}
