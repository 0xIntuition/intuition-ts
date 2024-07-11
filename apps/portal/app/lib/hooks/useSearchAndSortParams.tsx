import {
  ClaimSortColumn,
  PositionSortColumn,
  SortColumn,
} from '@0xintuition/api'

import { useSearchParams } from '@remix-run/react'

type SortColumnType = PositionSortColumn | ClaimSortColumn | SortColumn
type SortDirection = 'asc' | 'desc'

export const useSearchAndSortParamsHandler = <T extends SortColumnType>(
  prefix?: string,
) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const getParamName = (name: string) =>
    prefix ? `${prefix}${name.charAt(0).toUpperCase() + name.slice(1)}` : name

  const handleSortChange = (newSortBy: T, newDirection: SortDirection) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      [getParamName('sortBy')]: newSortBy,
      [getParamName('direction')]: newDirection,
      [getParamName('page')]: '1',
    })
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchValue = event.target.value
    setSearchParams({
      ...Object.fromEntries(searchParams),
      [getParamName('search')]: newSearchValue,
      [getParamName('page')]: '1',
    })
  }

  const onPageChange = (newPage: number) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      [getParamName('page')]: newPage.toString(),
    })
  }

  const onLimitChange = (newLimit: number) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      [getParamName('limit')]: newLimit.toString(),
    })
  }

  return { handleSortChange, handleSearchChange, onPageChange, onLimitChange }
}
