import { useRef, useState } from 'react'

import {
  Button,
  ButtonVariant,
  EmptyStateCard,
  ListCard,
  ListGrid,
} from '@0xintuition/1ui'

import { Search } from '@components/search'
import { Sort } from '@components/sort'
import { CURRENT_ENV } from '@consts/index'
import {
  SortColumnType,
  useSearchAndSortParamsHandler,
} from '@lib/hooks/useSearchAndSortParams'
import { GetSavedListsQuery } from '@lib/queries/saved-lists'
import { getSpecialPredicate } from '@lib/utils/app'
import { getListUrl } from '@lib/utils/misc'
import { Link } from '@remix-run/react'
import { PaginationType } from 'app/types/pagination'

import { SortOption } from '../sort-select'

export function SavedLists<T extends SortColumnType = string>({
  savedLists,
  pagination,
  paramPrefix,
  enableSearch = false,
  enableSort = false,
  onLoadMore,
  sortOptions,
  sourceUserAddress,
  readOnly = false,
  onSortChange,
  manualLoad = false,
}: {
  savedLists: GetSavedListsQuery['atoms']
  pagination?: PaginationType
  paramPrefix?: string
  enableSearch?: boolean
  enableSort?: boolean
  onLoadMore?: () => void
  sortOptions?: SortOption<T>[]
  sourceUserAddress?: string
  readOnly?: boolean
  onSortChange?: (sortBy: T, direction: 'asc' | 'desc') => void
  manualLoad?: boolean
}) {
  const [isLoading, setIsLoading] = useState(false)

  const listContainerRef = useRef<HTMLDivElement>(null)
  const { handleSearchChange, handleSortChange: defaultHandleSortChange } =
    useSearchAndSortParamsHandler(paramPrefix)

  if (!savedLists.length) {
    return <EmptyStateCard message="No lists found." />
  }

  const handleLoadMore = async () => {
    if (onLoadMore) {
      setIsLoading(true)
      await onLoadMore()
      setIsLoading(false)
    }
  }

  const handleSortChange = (sortBy: T, direction: 'asc' | 'desc') => {
    if (onSortChange) {
      onSortChange(sortBy, direction)
    } else {
      defaultHandleSortChange(sortBy, direction)
    }
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col w-full" ref={listContainerRef}>
        <div
          className={`flex flex-row w-full ${enableSearch ? 'justify-between' : 'justify-end'} ${enableSort ? 'mb-6' : 'mb-0'}`}
        >
          {enableSearch && <Search handleSearchChange={handleSearchChange} />}
          {enableSort && sortOptions && sortOptions.length > 0 && (
            <Sort
              options={sortOptions as SortOption<T>[]}
              handleSortChange={handleSortChange}
            />
          )}
        </div>
        <ListGrid>
          {savedLists.map((list, index) => (
            <ListCard
              key={list.id || index}
              displayName={list.label ?? 'Unknown'}
              imgSrc={list.image ?? undefined}
              identitiesCount={
                list.as_object_triples_aggregate?.aggregate?.count ?? 0
              }
              buttonWrapper={(button) => (
                <Link
                  to={getListUrl(
                    `${getSpecialPredicate(CURRENT_ENV).tagPredicate.vaultId}-${list.id}`,
                    sourceUserAddress ?? '',
                    readOnly,
                  )}
                  prefetch="intent"
                >
                  {button}
                </Link>
              )}
            />
          ))}
        </ListGrid>
        {manualLoad &&
          pagination &&
          pagination.currentPage < pagination.totalPages && (
            <div className="flex justify-center mt-4">
              <Button
                onClick={handleLoadMore}
                disabled={isLoading}
                variant={ButtonVariant.ghost}
              >
                {isLoading ? 'Loading...' : 'Load More'}
              </Button>
            </div>
          )}
      </div>
    </div>
  )
}
