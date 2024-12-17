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

import { useSearchParams } from '@remix-run/react'

interface PaginationComponentProps {
  totalEntries: number
  defaultLimit?: number
  label: string
  listContainerRef?: React.RefObject<HTMLDivElement>
}

export function PaginationComponent({
  totalEntries,
  defaultLimit = 10,
  label,
  listContainerRef,
}: PaginationComponentProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [hasUserInteracted, setHasUserInteracted] = useState(false)

  // Get current values from URL
  const limit = parseInt(searchParams.get('limit') || String(defaultLimit))
  const offset = parseInt(searchParams.get('offset') || '0')

  // Calculate current page and total pages for display
  const currentPage = Math.floor(offset / limit) + 1
  const totalPages = Math.ceil(totalEntries / limit)

  // Track previous page for scroll behavior
  const prevPageRef = useRef(currentPage)

  useEffect(() => {
    if (
      hasUserInteracted &&
      prevPageRef.current !== currentPage &&
      listContainerRef?.current
    ) {
      listContainerRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
    prevPageRef.current = currentPage
  }, [listContainerRef, currentPage, hasUserInteracted])

  // Navigation handlers
  const handlePrevious = () => {
    setHasUserInteracted(true)
    const params = new URLSearchParams(searchParams)
    const newOffset = Math.max(0, offset - limit)
    if (newOffset === 0) {
      params.delete('offset')
    } else {
      params.set('offset', String(newOffset))
    }
    setSearchParams(params, { preventScrollReset: true })
  }

  const handleNext = () => {
    setHasUserInteracted(true)
    const params = new URLSearchParams(searchParams)
    params.set('offset', String(offset + limit))
    setSearchParams(params, { preventScrollReset: true })
  }

  const handleFirst = () => {
    setHasUserInteracted(true)
    const params = new URLSearchParams(searchParams)
    params.delete('offset')
    setSearchParams(params, { preventScrollReset: true })
  }

  const handleLast = () => {
    setHasUserInteracted(true)
    const params = new URLSearchParams(searchParams)
    const lastPageOffset = (totalPages - 1) * limit
    params.set('offset', String(lastPageOffset))
    setSearchParams(params, { preventScrollReset: true })
  }

  const handleLimitChange = (newLimit: string) => {
    setHasUserInteracted(true)
    const params = new URLSearchParams(searchParams)
    params.set('limit', newLimit)
    // If we're on the first page (offset = 0), don't include offset
    if (offset === 0) {
      params.delete('offset')
    }
    setSearchParams(params, { preventScrollReset: true })
  }

  return (
    <Pagination className="flex w-full justify-between max-sm:flex-col max-sm:items-center max-sm:gap-3">
      <PaginationSummary totalEntries={totalEntries} label={label} />
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
              <PaginationFirst
                onClick={handleFirst}
                disabled={currentPage === 1}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationPrevious
                onClick={handlePrevious}
                disabled={currentPage === 1}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={handleNext}
                disabled={currentPage === totalPages}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLast
                onClick={handleLast}
                disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </div>
      </div>
    </Pagination>
  )
}
