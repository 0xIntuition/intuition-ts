import { ReactNode, useRef } from 'react'

import { Button, ButtonVariant, EmptyStateCard, Icon } from '@0xintuition/1ui'

import { Search } from '@components/search'
import { Sort } from '@components/sort'
import { SortOption } from '@components/sort-select'
import {
  SortColumnType,
  useSearchAndSortParamsHandler,
} from '@lib/hooks/useSearchAndSortParams'
import {
  globalCreateClaimModalAtom,
  globalCreateIdentityModalAtom,
} from '@lib/state/store'
import { SortDirection } from '@lib/utils/params'
import { PaginationType } from 'app/types/pagination'
import { useSetAtom } from 'jotai'

import { PaginationComponent } from '../pagination-component'

export function List<T extends SortColumnType>({
  children,
  pagination,
  paginationLabel,
  options,
  paramPrefix,
  enableSearch = true,
  enableSort = true,
  onPageChange,
  onLimitChange,
  onSortChange,
}: {
  children: ReactNode
  pagination?: PaginationType
  paginationLabel: string
  options?: SortOption<T>[]
  paramPrefix?: string
  enableSearch?: boolean
  enableSort?: boolean
  onPageChange?: (page: number) => void
  onLimitChange?: (limit: number) => void
  onSortChange?: (sortBy: T, direction: SortDirection) => void
}) {
  const {
    handleSortChange: defaultHandleSortChange,
    handleSearchChange,
    onPageChange: defaultPageChange,
    onLimitChange: defaultLimitChange,
  } = useSearchAndSortParamsHandler<T>(paramPrefix)

  const listContainerRef = useRef<HTMLDivElement>(null)

  const setCreateIdentityModalActive = useSetAtom(globalCreateIdentityModalAtom)
  const setCreateClaimModalActive = useSetAtom(globalCreateClaimModalAtom)

  // Use the provided callbacks if available, otherwise use the default
  const handlePageChange = (newOffset: number) => {
    if (onPageChange) {
      onPageChange(newOffset)
    } else {
      defaultPageChange(newOffset)
    }
  }

  const handleLimitChange = (newLimit: number) => {
    if (onLimitChange) {
      onLimitChange(newLimit)
    } else {
      defaultLimitChange(newLimit)
    }
  }

  const handleSortChange = (sortBy: T, direction: SortDirection) => {
    if (onSortChange) {
      onSortChange(sortBy, direction)
    } else {
      defaultHandleSortChange(sortBy, direction)
    }
  }

  return (
    <div className="flex flex-col w-full gap-6" ref={listContainerRef}>
      {(enableSearch || enableSort) && (
        <div
          className={`flex w-full max-lg:flex-col max-lg:gap-4 ${
            enableSearch ? 'justify-between' : 'justify-end'
          }`}
        >
          {enableSearch && <Search handleSearchChange={handleSearchChange} />}
          {enableSort && options && (
            <Sort options={options} handleSortChange={handleSortChange} />
          )}
        </div>
      )}
      {pagination && pagination.totalEntries === 0 ? (
        <EmptyStateCard message={`No ${paginationLabel} found.`}>
          {paginationLabel.includes('identities') ? (
            <Button
              variant={ButtonVariant.primary}
              onClick={() => {
                setCreateIdentityModalActive(true)
              }}
            >
              <Icon name="fingerprint" className="h-4 w-4" /> Create an Identity
            </Button>
          ) : paginationLabel.includes('claims') ? (
            <Button
              variant={ButtonVariant.primary}
              onClick={() => {
                setCreateClaimModalActive(true)
              }}
            >
              <Icon name="claim" className="h-4 w-4" /> Make a Claim
            </Button>
          ) : null}
        </EmptyStateCard>
      ) : (
        <div className="flex flex-col w-full">{children}</div>
      )}
      {pagination && (
        <PaginationComponent
          totalEntries={pagination.totalEntries ?? 0}
          currentPage={pagination.currentPage ?? 0}
          totalPages={pagination.totalPages ?? 0}
          limit={pagination.limit ?? 0}
          onPageChange={handlePageChange}
          onLimitChange={handleLimitChange}
          label={paginationLabel}
          listContainerRef={listContainerRef}
        />
      )}
    </div>
  )
}
