import { useSearchParams } from '@remix-run/react'

export interface OffsetPaginationState {
  limit: number
  offset: number
}

export interface OffsetPaginationParams {
  defaultLimit?: number
  prefix?: string
}

export const useOffsetPagination = ({
  defaultLimit = 10,
  prefix,
}: OffsetPaginationParams = {}) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const getParamName = (name: string) => {
    if (prefix) {
      return `${prefix}${name.charAt(0).toUpperCase()}${name.slice(1)}`
    }
    return name
  }

  // Get current pagination state from URL
  const getPaginationState = (): OffsetPaginationState => {
    const limit = parseInt(
      searchParams.get(getParamName('limit')) || String(defaultLimit),
    )
    const offset = parseInt(searchParams.get(getParamName('offset')) || '0')
    return { limit, offset }
  }

  // Current pagination state
  const { limit, offset } = getPaginationState()

  // Computed values for UI
  const currentPage = Math.floor(offset / limit) + 1

  const onPageChange = (newPage: number) => {
    const newOffset = (newPage - 1) * limit
    setSearchParams({
      ...Object.fromEntries(searchParams),
      [getParamName('offset')]: newOffset.toString(),
    })
  }

  const onLimitChange = (newLimit: number) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      [getParamName('limit')]: newLimit.toString(),
      [getParamName('offset')]: '0', // Reset to first page when changing limit
    })
  }

  return {
    // Current state
    limit,
    offset,
    currentPage,
    // Actions
    onPageChange,
    onLimitChange,
    // Helper for React Query
    getPaginationState,
  }
}
