import { useEffect, useRef, useState } from 'react'

import {
  Pagination,
  PaginationContent,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationNext,
  PaginationPageCounter,
  PaginationPrevious,
  PaginationRowSelection,
  PaginationSummary,
} from '@0xintuition/1ui'

import logger from '@lib/utils/logger'

export interface PaginationComponentProps {
  totalEntries: number
  offset: number
  limit: number
  onOffsetChange: (offset: number) => void
  onLimitChange: (limit: number) => void
  label?: string
  listContainerRef?: React.RefObject<HTMLDivElement>
}

export function PaginationComponent({
  totalEntries,
  offset,
  limit,
  onOffsetChange,
  onLimitChange,
  label,
  listContainerRef,
}: PaginationComponentProps) {
  const [hasUserInteracted, setHasUserInteracted] = useState(false)
  const prevOffsetRef = useRef(offset)

  // Calculate current page and total pages for display
  const currentPage = Math.floor(offset / limit) + 1
  const totalPages = Math.ceil(totalEntries / limit)

  useEffect(() => {
    if (
      hasUserInteracted &&
      prevOffsetRef.current !== offset &&
      listContainerRef?.current
    ) {
      listContainerRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
    prevOffsetRef.current = offset
  }, [listContainerRef, offset, hasUserInteracted])

  // Navigation handlers
  const handlePrevious = () => {
    setHasUserInteracted(true)
    onOffsetChange(Math.max(0, offset - limit))
  }

  const handleNext = () => {
    setHasUserInteracted(true)
    onOffsetChange(offset + limit)
  }

  const handleFirst = () => {
    setHasUserInteracted(true)
    onOffsetChange(0)
  }

  const handleLast = () => {
    setHasUserInteracted(true)
    onOffsetChange((totalPages - 1) * limit)
  }

  const handleLimitChange = (newLimit: string) => {
    setHasUserInteracted(true)
    logger(
      'PaginationComponent: handleLimitChange called with newLimit:',
      newLimit,
    )
    const parsedLimit = parseInt(newLimit, 10)
    if (isNaN(parsedLimit)) {
      logger('PaginationComponent: Invalid limit value:', newLimit)
      return
    }
    onLimitChange(parsedLimit)
  }

  return (
    <Pagination className="flex w-full justify-between max-sm:flex-col max-sm:items-center max-sm:gap-3">
      <PaginationSummary totalEntries={totalEntries} label={label || ''} />
      <div className="flex max-sm:flex-col max-sm:items-center max-sm:gap-3">
        <PaginationRowSelection
          value={limit.toString()}
          onValueChange={handleLimitChange}
        />
        <div className="flex items-center w-fit">
          <PaginationPageCounter
            currentPage={currentPage}
            totalPages={totalPages}
          />
          <PaginationContent>
            <PaginationItem>
              <PaginationFirst onClick={handleFirst} disabled={offset === 0} />
            </PaginationItem>
            <PaginationItem>
              <PaginationPrevious
                onClick={handlePrevious}
                disabled={offset === 0}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={handleNext}
                disabled={offset + limit >= totalEntries}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLast
                onClick={handleLast}
                disabled={offset + limit >= totalEntries}
              />
            </PaginationItem>
          </PaginationContent>
        </div>
      </div>
    </Pagination>
  )
}
