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
  const page = Math.max(1, parseInt(searchParams.get('page') || '1'))

  // Calculate total pages for display
  const totalPages = Math.ceil(totalEntries / limit)

  // Track previous page for scroll behavior
  const prevPageRef = useRef(page)

  useEffect(() => {
    if (
      hasUserInteracted &&
      prevPageRef.current !== page &&
      listContainerRef?.current
    ) {
      listContainerRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
    prevPageRef.current = page
  }, [listContainerRef, page, hasUserInteracted])

  // Navigation handlers
  const handlePrevious = () => {
    setHasUserInteracted(true)
    const params = new URLSearchParams(searchParams)
    const newPage = Math.max(1, page - 1)
    if (newPage === 1) {
      params.delete('page')
    } else {
      params.set('page', String(newPage))
    }
    setSearchParams(params, { preventScrollReset: true })
  }

  const handleNext = () => {
    setHasUserInteracted(true)
    const params = new URLSearchParams(searchParams)
    params.set('page', String(page + 1))
    setSearchParams(params, { preventScrollReset: true })
  }

  const handleFirst = () => {
    setHasUserInteracted(true)
    const params = new URLSearchParams(searchParams)
    params.delete('page')
    setSearchParams(params, { preventScrollReset: true })
  }

  const handleLast = () => {
    setHasUserInteracted(true)
    const params = new URLSearchParams(searchParams)
    params.set('page', String(totalPages))
    setSearchParams(params, { preventScrollReset: true })
  }

  const handleLimitChange = (newLimit: string) => {
    setHasUserInteracted(true)
    const params = new URLSearchParams(searchParams)
    params.set('limit', newLimit)
    // Reset to first page when changing limit
    params.delete('page')
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
          <PaginationPageCounter currentPage={page} totalPages={totalPages} />
          <PaginationContent>
            <PaginationItem>
              <PaginationFirst onClick={handleFirst} disabled={page === 1} />
            </PaginationItem>
            <PaginationItem>
              <PaginationPrevious
                onClick={handlePrevious}
                disabled={page === 1}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={handleNext}
                disabled={page === totalPages}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLast
                onClick={handleLast}
                disabled={page === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </div>
      </div>
    </Pagination>
  )
}
