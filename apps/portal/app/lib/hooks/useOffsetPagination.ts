import { useSearchParams } from '@remix-run/react'

export interface OffsetPaginationState {
  limit: number
  offset: number
}

export interface OffsetPaginationParams {
  defaultLimit?: number
  prefix?: string
}

export const PAGINATION_KEYS = {
  limit: 'limit',
  offset: 'offset',
} as const

/**
 * Hook for handling offset-based pagination with React Query
 * Manages URL state and provides helpers for React Query integration
 */
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
      searchParams.get(getParamName(PAGINATION_KEYS.limit)) ||
        String(defaultLimit),
    )
    const offset = parseInt(
      searchParams.get(getParamName(PAGINATION_KEYS.offset)) || '0',
    )
    return { limit, offset }
  }

  // Current pagination state
  const { limit, offset } = getPaginationState()

  // Computed values for UI
  const currentPage = Math.floor(offset / limit) + 1

  const onPageChange = (newPage: number) => {
    const newOffset = (newPage - 1) * limit
    setSearchParams(
      (prev) => {
        const newParams = new URLSearchParams(prev)
        newParams.set(
          getParamName(PAGINATION_KEYS.offset),
          newOffset.toString(),
        )
        return newParams
      },
      { preventScrollReset: true },
    )
  }

  const onLimitChange = (newLimit: number) => {
    setSearchParams(
      (prev) => {
        const newParams = new URLSearchParams(prev)
        newParams.set(getParamName(PAGINATION_KEYS.limit), newLimit.toString())
        newParams.set(getParamName(PAGINATION_KEYS.offset), '0')
        return newParams
      },
      { preventScrollReset: true },
    )
  }

  /**
   * Creates a query key array for React Query
   * @param baseKey - The base key for the query (e.g., ['events', 'global'])
   * @param additionalParams - Additional parameters to include in the query key
   */
  const getQueryKey = (
    baseKey: readonly unknown[],
    additionalParams?: Record<string, unknown>,
  ) => {
    return [
      ...baseKey,
      {
        limit,
        offset,
        ...additionalParams,
      },
    ]
  }

  return {
    // Current state
    limit,
    offset,
    currentPage,
    // Actions
    onPageChange,
    onLimitChange,
    // React Query helpers
    getQueryKey,
    getPaginationState,
  }
}
