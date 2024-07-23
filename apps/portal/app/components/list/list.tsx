import { ReactNode, useRef } from 'react'

import {
  ClaimSortColumn,
  PositionSortColumn,
  SortColumn,
} from '@0xintuition/api'

import { Search } from '@components/search'
import { Sort } from '@components/sort'
import { SortOption } from '@components/sort-select'
import { useSearchAndSortParamsHandler } from '@lib/hooks/useSearchAndSortParams'
import { PaginationType } from 'types/pagination'

import { PaginationComponent } from '../pagination-component'

type SortColumnType = SortColumn | PositionSortColumn | ClaimSortColumn

export function List<T extends SortColumnType>({
  children,
  pagination,
  paginationLabel,
  options,
  paramPrefix,
  enableSearch = true,
  enableSort = true,
}: {
  children: ReactNode
  pagination: PaginationType
  paginationLabel: string
  options?: SortOption<T>[]
  paramPrefix?: string
  enableSearch?: boolean
  enableSort?: boolean
}) {
  const { handleSortChange, handleSearchChange, onPageChange, onLimitChange } =
    useSearchAndSortParamsHandler<T>(paramPrefix)

  const listContainerRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <div className="flex flex-col w-full gap-6" ref={listContainerRef}>
        <div
          className={`flex flex-row w-full mt-6 ${enableSearch ? 'justify-between' : 'justify-end'}`}
        >
          {enableSearch && <Search handleSearchChange={handleSearchChange} />}
          {enableSort && options && (
            <Sort options={options} handleSortChange={handleSortChange} />
          )}
        </div>
        <div className="flex flex-col w-full">{children}</div>
        <PaginationComponent
          totalEntries={pagination.totalEntries ?? 0}
          currentPage={pagination.currentPage ?? 0}
          totalPages={pagination.totalPages ?? 0}
          limit={pagination.limit ?? 0}
          onPageChange={onPageChange}
          onLimitChange={onLimitChange}
          label={paginationLabel}
          listContainerRef={listContainerRef}
        />
      </div>
    </>
  )
}
