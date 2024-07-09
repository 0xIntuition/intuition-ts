import { ClaimSortColumn, PositionSortColumn } from '@0xintuition/api'

import { useSearchParams } from '@remix-run/react'

type SortColumn = PositionSortColumn | ClaimSortColumn
type SortDirection = 'asc' | 'desc'

export const useSearchAndSortParamsHandler = <T extends SortColumn>() => {
  const [searchParams, setSearchParams] = useSearchParams()

  const handleSortChange = (newSortBy: T, newDirection: SortDirection) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      sortBy: newSortBy,
      direction: newDirection,
      page: '1',
    })
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchValue = event.target.value
    setSearchParams({
      ...Object.fromEntries(searchParams),
      search: newSearchValue,
      page: '1',
    })
  }

  const onPageChange = (newPage: number) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      page: newPage.toString(),
    })
  }

  return { handleSortChange, handleSearchChange, onPageChange }
}
