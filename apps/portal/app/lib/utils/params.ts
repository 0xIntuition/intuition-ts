import {
  ClaimSortColumn,
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
  defaultSortByValue?: SortColumn | ClaimSortColumn | PositionSortColumn
  defaultDirectionValue?: SortDirection
}): {
  page: number
  limit: number
  sortBy: SortColumn
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
    sortBy: (sortByValue as SortColumn) || defaultSortByValue,
    direction: (directionValue as SortDirection) || defaultDirectionValue,
  }
}
