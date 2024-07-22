import {
  ClaimSortColumn,
  Identifier,
  PositionSortColumn,
  SortColumn,
  SortDirection,
} from '@0xintuition/api'

const getParam = ({
  searchParams,
  paramName,
  paramPrefix,
}: {
  searchParams: URLSearchParams
  paramName: string
  paramPrefix?: string
}) =>
  searchParams.get(
    `${paramPrefix}${paramName.charAt(0).toUpperCase() + paramName.slice(1)}`,
  ) ?? searchParams.get(paramName)

export const getStandardPageParams = ({
  searchParams,
  paramPrefix,
  defaultPageValue = 1,
  defaultLimitValue = 10,
  defaultSortByValue = SortColumn.ASSETS_SUM,
  defaultDirectionValue = SortDirection.DESC,
}: {
  searchParams: URLSearchParams
  paramPrefix?: string
  defaultPageValue?: number
  defaultLimitValue?: number
  defaultSortByValue?: SortColumn | ClaimSortColumn
  defaultDirectionValue?: SortDirection
}): {
  page: number
  limit: number
  sortBy: SortColumn | ClaimSortColumn
  direction: SortDirection
} => {
  const getParamProps = { searchParams, paramPrefix }
  const pageValue = getParam({ ...getParamProps, paramName: 'page' })
  const limitValue = getParam({ ...getParamProps, paramName: 'limit' })
  const sortByValue = getParam({ ...getParamProps, paramName: 'sortBy' })
  const directionValue = getParam({ ...getParamProps, paramName: 'direction' })
  return {
    page: pageValue ? Number(pageValue) : defaultPageValue,
    limit: Number(limitValue) || defaultLimitValue,
    sortBy: (sortByValue as SortColumn | ClaimSortColumn) || defaultSortByValue,
    direction: (directionValue as SortDirection) || defaultDirectionValue,
  }
}

export const getPositionPageParams = ({
  searchParams,
}: {
  searchParams: URLSearchParams
}): {
  page: number
  limit: number
  sortBy: PositionSortColumn
  direction: SortDirection
  creator: Identifier
} => {
  const pageParam = 'positionsPage'
  return {
    page: searchParams.get(pageParam) ? Number(searchParams.get(pageParam)) : 1,
    limit: Number(searchParams.get('positionsLimit')) ?? 10,
    sortBy:
      (searchParams.get('positionsSortBy') as PositionSortColumn) ??
      PositionSortColumn.ASSETS,
    direction:
      (searchParams.get('positionsDirection') as SortDirection) ??
      SortDirection.DESC,
    creator: searchParams.get('positionsSearch') as Identifier,
  }
}

export const getClaimsPageParams = ({
  searchParams,
}: {
  searchParams: URLSearchParams
}): {
  page: number
  limit: number
  sortBy: ClaimSortColumn
  direction: SortDirection
  displayName: string
} => {
  const pageParam = 'claimsPage'
  return {
    page: searchParams.get(pageParam) ? Number(searchParams.get(pageParam)) : 1,
    limit: Number(searchParams.get('claimsLimit')) ?? 10,
    sortBy:
      (searchParams.get('claimsSortBy') as ClaimSortColumn) ??
      ClaimSortColumn.ASSETS_SUM,
    direction:
      (searchParams.get('claimsDirection') as SortDirection) ??
      SortDirection.DESC,
    displayName: searchParams.get('claimsSearch') as string,
  }
}

export const getFollowPageParams = ({
  searchParams,
}: {
  searchParams: URLSearchParams
}): {
  page: number
  limit: number
  sortBy: SortColumn
  direction: SortDirection
} => {
  const pageParam = 'followersPage'
  return {
    page: searchParams.get(pageParam) ? Number(searchParams.get(pageParam)) : 1,
    limit: Number(searchParams.get('limit')) ?? 10,
    sortBy:
      (searchParams.get('followersSortBy') as SortColumn) ??
      SortColumn.USER_ASSETS,
    direction:
      (searchParams.get('followersDirection') as SortDirection) ??
      SortDirection.DESC,
  }
}
