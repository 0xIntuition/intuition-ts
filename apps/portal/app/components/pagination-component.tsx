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
      userInteracted &&
      prevPageRef.current !== currentPage &&
      listContainerRef &&
      listContainerRef.current
    ) {
      listContainerRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
    prevPageRef.current = currentPage
  }, [listContainerRef, currentPage, userInteracted])

  const handlePageChange = (newPage: number) => {
    setUserInteracted(true)
    onPageChange(newPage)
  }

  return (
    <Pagination className="flex w-full justify-between">
      <PaginationSummary totalEntries={totalEntries} label={label} />
      <div className="flex">
        <PaginationRowSelection
          defaultValue={limit.toString()}
          onValueChange={(newLimit) => {
            setUserInteracted(true)
            onLimitChange(Number(newLimit))
          }}
        />
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
    </Pagination>
  )
}
