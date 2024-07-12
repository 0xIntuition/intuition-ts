import { ReactNode } from 'react'

import {
  ClaimSortColumn,
  PositionSortColumn,
  SortColumn,
} from '@0xintuition/api'

import { SortOption } from '@components/sort-select'
import { useSearchAndSortParamsHandler } from '@lib/hooks/useSearchAndSortParams'
import { PaginationType } from 'types/pagination'

import { PaginationComponent } from '../pagination-component'
import { SearchAndSort } from '../search-and-sort'

type SortColumnType = SortColumn | PositionSortColumn | ClaimSortColumn

export function List<T extends SortColumnType>({
  children,
  pagination,
  options,
  paramPrefix,
}: {
  children: ReactNode
  pagination: PaginationType
  options: SortOption<T>[]
  paramPrefix?: string
}) {
  const { handleSortChange, handleSearchChange, onPageChange, onLimitChange } =
    useSearchAndSortParamsHandler<T>(paramPrefix)

  return (
    <>
      <div className="flex flex-col w-full gap-6">
        <SearchAndSort
          options={options}
          handleSortChange={handleSortChange}
          handleSearchChange={handleSearchChange}
        />
        <div className="flex flex-col w-full">{children}</div>
        <PaginationComponent
          totalEntries={pagination.totalEntries ?? 0}
          currentPage={pagination.currentPage ?? 0}
          totalPages={pagination.totalPages ?? 0}
          limit={pagination.limit ?? 0}
          onPageChange={onPageChange}
          onLimitChange={onLimitChange}
          label="claims"
        />
      </div>
    </>
  )
}
