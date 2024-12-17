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
  page: 'page',
} as const

/**
 * Hook for handling offset-based pagination with React Query
 * Shows page numbers in URLs for better UX but uses offset/limit for queries
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
    // Get page from URL and convert to offset
    const page = Math.max(
      1,
      parseInt(searchParams.get(getParamName(PAGINATION_KEYS.page)) || '1'),
    )
    const offset = (page - 1) * limit

    return { limit, offset }
  }

  // Current pagination state
  const { limit, offset } = getPaginationState()

  // Computed values for UI
  const currentPage = Math.floor(offset / limit) + 1

  const onPageChange = (newPage: number) => {
    setSearchParams(
      (prev) => {
        const newParams = new URLSearchParams(prev)
        if (newPage === 1) {
          newParams.delete(getParamName(PAGINATION_KEYS.page))
        } else {
          newParams.set(getParamName(PAGINATION_KEYS.page), newPage.toString())
        }
        return newParams
      },
      { preventScrollReset: true },
    )
  }

  const onLimitChange = (newLimit: number) => {
    setSearchParams(
      (prev) => {
        const newParams = new URLSearchParams(prev)
        if (newLimit === defaultLimit) {
          newParams.delete(getParamName(PAGINATION_KEYS.limit))
        } else {
          newParams.set(
            getParamName(PAGINATION_KEYS.limit),
            newLimit.toString(),
          )
        }
        // Reset to first page when changing limit
        newParams.delete(getParamName(PAGINATION_KEYS.page))
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
