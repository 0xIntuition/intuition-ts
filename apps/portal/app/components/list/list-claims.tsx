import { useRef, useState } from 'react'

import {
  Button,
  ButtonVariant,
  EmptyStateCard,
  ListCard,
  ListGrid,
} from '@0xintuition/1ui'
import { GetListsQuery } from '@0xintuition/graphql'

import { Search } from '@components/search'
import { Sort } from '@components/sort'
import {
  SortColumnType,
  useSearchAndSortParamsHandler,
} from '@lib/hooks/useSearchAndSortParams'
import { getListUrl } from '@lib/utils/misc'
import { Link } from '@remix-run/react'
import { PaginationType } from 'app/types/pagination'

import { SortOption } from '../sort-select'

// Function to map sort parameters from URL to GraphQL order_by object
export function mapSortToOrderBy(sortBy: string, direction: string) {
  // Default to object.label if not provided
  if (!sortBy) {
    return {
      object: {
        label: direction.toLowerCase() as 'asc' | 'desc',
      },
    }
  }

  // Handle nested fields like 'vault.total_shares'
  if (sortBy.includes('.')) {
    const [parent, field] = sortBy.split('.')
    return {
      [parent]: {
        [field]: direction.toLowerCase() as 'asc' | 'desc',
      },
    }
  }

  // Handle simple fields
  return {
    [sortBy]: direction.toLowerCase() as 'asc' | 'desc',
  }
}

export function ListClaimsListNew<T extends SortColumnType = string>({
  listClaims,
  pagination,
  paramPrefix,
  enableSearch = false,
  enableSort = false,
  onLoadMore,
  sortOptions,
  sourceUserAddress,
  readOnly = false,
}: {
  listClaims: GetListsQuery['predicate_objects']
  pagination?: PaginationType
  paramPrefix?: string
  enableSearch?: boolean
  enableSort?: boolean
  onLoadMore?: () => void
  sortOptions?: SortOption<T>[]
  sourceUserAddress?: string
  readOnly?: boolean
}) {
  // Using GraphQL field names directly
  const defaultOptions: SortOption<string>[] = [
    { value: 'Total ETH', sortBy: 'vault.total_shares', direction: 'desc' },
    { value: 'ETH For', sortBy: 'vault.total_shares', direction: 'desc' },
    {
      value: 'ETH Against',
      sortBy: 'counter_vault.total_shares',
      direction: 'desc',
    },
    {
      value: 'Total Positions',
      sortBy: 'vault.position_count',
      direction: 'desc',
    },
    {
      value: 'Positions Against',
      sortBy: 'counter_vault.position_count',
      direction: 'desc',
    },
    { value: 'Updated At', sortBy: 'block_timestamp', direction: 'desc' },
    { value: 'Created At', sortBy: 'block_timestamp', direction: 'desc' },
  ]

  const options = sortOptions || defaultOptions

  const [isLoading, setIsLoading] = useState(false)

  const listContainerRef = useRef<HTMLDivElement>(null)
  const { handleSearchChange, handleSortChange } =
    useSearchAndSortParamsHandler(paramPrefix)

  if (!listClaims.length) {
    return <EmptyStateCard message="No lists found." />
  }

  const handleLoadMore = async () => {
    if (onLoadMore) {
      setIsLoading(true)
      await onLoadMore()
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col w-full" ref={listContainerRef}>
        <div
          className={`flex flex-row w-full ${enableSearch ? 'justify-between' : 'justify-end'} ${enableSort ? 'mb-6' : 'mb-0'}`}
        >
          {enableSearch && <Search handleSearchChange={handleSearchChange} />}
          {enableSort && options && options.length > 0 && (
            <Sort
              options={options as SortOption<T>[]}
              handleSortChange={handleSortChange}
            />
          )}
        </div>
        <ListGrid>
          {listClaims.map((claim, index) => (
            <ListCard
              key={claim.id || index}
              displayName={claim.object?.label ?? 'Unknown'}
              imgSrc={claim.object?.image ?? undefined}
              identitiesCount={claim.claim_count ?? 0}
              buttonWrapper={(button) => (
                <Link
                  to={getListUrl(claim.id, sourceUserAddress ?? '', readOnly)}
                  prefetch="intent"
                >
                  {button}
                </Link>
              )}
            />
          ))}
        </ListGrid>
        {pagination && pagination.currentPage < pagination.totalPages && (
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
