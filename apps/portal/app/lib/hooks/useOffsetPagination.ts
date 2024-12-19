import { useMemo } from 'react'

import logger from '@lib/utils/logger'
import { useSearchParams } from '@remix-run/react'

interface UseOffsetPaginationProps {
  defaultLimit?: number
  paramPrefix?: string
  initialOffset?: number
  initialLimit?: number
}

export function useOffsetPagination({
  defaultLimit = 10,
  paramPrefix,
  initialOffset = 0,
  initialLimit = 10,
}: UseOffsetPaginationProps = {}) {
  const [searchParams, setSearchParams] = useSearchParams()

  return useMemo(() => {
    // Add prefix to param names if provided
    const offsetParam = paramPrefix ? `${paramPrefix}Offset` : 'offset'
    const limitParam = paramPrefix ? `${paramPrefix}Limit` : 'limit'

    const limit = parseInt(
      searchParams.get(limitParam) || defaultLimit.toString(),
    )
    const offset = parseInt(searchParams.get(offsetParam) || '0')

    const onOffsetChange = (newOffset: number) => {
      logger('useOffsetPagination: onOffsetChange called with:', newOffset)
      setSearchParams(
        (prev) => {
          const newParams = new URLSearchParams(prev)
          if (newOffset === 0) {
            newParams.delete(offsetParam)
          } else {
            newParams.set(offsetParam, newOffset.toString())
          }
          return newParams
        },
        { preventScrollReset: true },
      )
    }

    const onLimitChange = (newLimit: number) => {
      logger('useOffsetPagination: onLimitChange called with:', newLimit)
      setSearchParams(
        (prev) => {
          const newParams = new URLSearchParams(prev)
          if (newLimit === defaultLimit) {
            newParams.delete(limitParam)
          } else {
            newParams.set(limitParam, newLimit.toString())
          }
          // Reset offset when changing limit
          newParams.delete(offsetParam)
          return newParams
        },
        { preventScrollReset: true },
      )
    }

    return {
      limit,
      offset,
      onOffsetChange,
      onLimitChange,
    }
  }, [searchParams, setSearchParams, defaultLimit, paramPrefix])
}
