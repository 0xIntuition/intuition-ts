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

interface PaginationComponentProps {
  totalEntries: number
  currentPage: number
  totalPages: number
  limit: number
  onPageChange: (newPage: number) => void
  onLimitChange: (newLimit: number) => void
  label: string
  listContainerRef?: React.RefObject<HTMLDivElement>
}

export function PaginationComponent({
  totalEntries,
  currentPage,
  totalPages,
  limit,
  onPageChange,
  onLimitChange,
  label,
  listContainerRef,
}: PaginationComponentProps) {
  const [hasUserInteracted, setHasUserInteracted] = useState(false)
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

  const handlePageChange = (newPage: number) => {
    setHasUserInteracted(true)
    onPageChange(newPage)
  }

  return (
    <Pagination className="flex w-full justify-between max-sm:flex-col max-sm:items-center max-sm:gap-3">
      <PaginationSummary totalEntries={totalEntries} label={label} />
      <div className="flex max-sm:flex-col max-sm:items-center max-sm:gap-3">
        <PaginationRowSelection
          value={limit.toString()}
          onValueChange={(newLimit) => {
            setHasUserInteracted(true)
            onLimitChange(Number(newLimit))
          }}
        />
        <div className="flex items-center w-fit">
          <PaginationPageCounter
            currentPage={currentPage}
            totalPages={totalPages}
          />
          <PaginationContent>
            <PaginationItem>
              <PaginationFirst
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1 || currentPage === undefined}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLast
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </div>
      </div>
    </Pagination>
  )
}
