import { useSearchParams } from '@remix-run/react'

// Include string to support GraphQL field paths
export type SortColumnType = string
type SortDirection = 'asc' | 'desc'

export const useSearchAndSortParamsHandler = <T extends SortColumnType>(
  prefix?: string,
) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const getParamName = (name: string) => {
    if (prefix) {
      return `${prefix}${name.charAt(0).toUpperCase()}${name.slice(1)}`
    }
    return name
  }

  const handleSortChange = (newSortBy: T, newDirection: SortDirection) => {
    const currentParams = Object.fromEntries(searchParams.entries())
    setSearchParams({
      ...currentParams,
      [getParamName('sortBy')]: newSortBy,
      [getParamName('direction')]: newDirection,
      [getParamName('page')]: '1',
    })
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchValue = event.target.value
    const currentParams = Object.fromEntries(searchParams.entries())
    setSearchParams({
      ...currentParams,
      [getParamName('search')]: newSearchValue,
      [getParamName('page')]: '1',
    })
  }

  const onPageChange = (newPage: number) => {
    const currentParams = Object.fromEntries(searchParams.entries())
    setSearchParams({
      ...currentParams,
      [getParamName('page')]: newPage.toString(),
    })
  }

  const onLimitChange = (newLimit: number) => {
    const currentParams = Object.fromEntries(searchParams.entries())
    setSearchParams({
      ...currentParams,
      [getParamName('limit')]: newLimit.toString(),
    })
  }

  return { handleSortChange, handleSearchChange, onPageChange, onLimitChange }
}
