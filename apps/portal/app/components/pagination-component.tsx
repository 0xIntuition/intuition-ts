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
}

export function PaginationComponent({
  totalEntries,
  currentPage,
  totalPages,
  limit,
  onPageChange,
  onLimitChange,
  label,
}: PaginationComponentProps) {
  return (
    <Pagination className="flex w-full justify-between">
      <PaginationSummary totalEntries={totalEntries} label={label} />
      <div className="flex">
        <PaginationRowSelection
          defaultValue={limit.toString()}
          onValueChange={(newLimit) => onLimitChange(Number(newLimit))}
        />
        <PaginationPageCounter
          currentPage={currentPage}
          totalPages={totalPages}
        />
        <PaginationContent>
          <PaginationItem>
            <PaginationFirst
              onClick={() => onPageChange(1)}
              disabled={currentPage === 1}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1 || currentPage === undefined}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLast
              onClick={() => onPageChange(totalPages)}
              disabled={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </div>
    </Pagination>
  )
}
