// Types for GraphQL sorting
export type SortDirection = 'asc' | 'desc'

export type GraphQLSortField = string

export interface PageParams {
  page: number
  limit: number
  sortBy: GraphQLSortField
  direction: SortDirection
}

const getParam = ({
  searchParams,
  paramName,
  paramPrefix,
}: {
  searchParams: URLSearchParams
  paramName: string
  paramPrefix?: string
}) => {
  if (paramPrefix) {
    return (
      searchParams.get(
        `${paramPrefix}${paramName.charAt(0).toUpperCase() + paramName.slice(1)}`,
      ) || searchParams.get(paramName)
    )
  }
  return searchParams.get(paramName)
}

export const getStandardPageParams = ({
  searchParams,
  paramPrefix,
  defaultPageValue = 1,
  defaultLimitValue = 10,
  defaultSortByValue = 'block_timestamp',
  defaultDirectionValue = 'desc',
}: {
  searchParams: URLSearchParams
  paramPrefix?: string
  defaultPageValue?: number
  defaultLimitValue?: number
  defaultSortByValue?: GraphQLSortField
  defaultDirectionValue?: SortDirection
}): PageParams => {
  const getParamProps = { searchParams, paramPrefix }
  const pageValue = getParam({ ...getParamProps, paramName: 'page' })
  const limitValue = getParam({ ...getParamProps, paramName: 'limit' })
  const sortByValue = getParam({ ...getParamProps, paramName: 'sortBy' })
  const directionValue = getParam({ ...getParamProps, paramName: 'direction' })

  return {
    page: pageValue ? Number(pageValue) : defaultPageValue,
    limit: Number(limitValue) || defaultLimitValue,
    sortBy: sortByValue || defaultSortByValue,
    direction: (directionValue as SortDirection) || defaultDirectionValue,
  }
}
