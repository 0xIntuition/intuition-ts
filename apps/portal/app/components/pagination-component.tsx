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
  onPageChange: (newPage: number) => void
  label: string
}

export function PaginationComponent({
  totalEntries,
  currentPage,
  totalPages,
  onPageChange,
  label,
}: PaginationComponentProps) {
  return (
    <Pagination className="flex w-full justify-between">
      <PaginationSummary totalEntries={totalEntries} label={label} />
      <div className="flex">
        <PaginationRowSelection defaultValue="10" />
        <PaginationPageCounter
          currentPage={currentPage}
          totalPages={totalPages}
        />
        <PaginationContent>
          <PaginationItem>
            <PaginationFirst
              href="#"
              onClick={() => onPageChange(1)}
              disabled={currentPage === 1}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1 || currentPage === undefined}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLast
              href="#"
              onClick={() => onPageChange(totalPages)}
              disabled={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </div>
    </Pagination>
  )
}
