import { useRef, useState } from 'react'

import {
  Button,
  ButtonVariant,
  EmptyStateCard,
  ListCard,
  ListGrid,
} from '@0xintuition/1ui'
import { ClaimPresenter, ClaimSortColumn } from '@0xintuition/api'
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

export function ListClaimsList<T extends SortColumnType = ClaimSortColumn>({
  listClaims,
  pagination,
  paramPrefix,
  enableSearch = false,
  enableSort = false,
  sortOptions,
  sourceUserAddress,
  readOnly = false,
}: {
  listClaims: ClaimPresenter[]
  pagination?: PaginationType
  paramPrefix?: string
  enableSearch?: boolean
  enableSort?: boolean
  sortOptions?: SortOption<T>[]
  sourceUserAddress?: string
  readOnly?: boolean
}) {
  const defaultOptions: SortOption<ClaimSortColumn>[] = [
    { value: 'Total ETH', sortBy: 'AssetsSum' },
    { value: 'ETH For', sortBy: 'ForAssetsSum' },
    { value: 'ETH Against', sortBy: 'AgainstAssetsSum' },
    { value: 'Total Positions', sortBy: 'NumPositions' },
    { value: 'Positions For', sortBy: 'ForNumPositions' },
    { value: 'Positions Against', sortBy: 'AgainstNumPositions' },
    { value: 'Updated At', sortBy: 'UpdatedAt' },
    { value: 'Created At', sortBy: 'CreatedAt' },
  ]

  const options = sortOptions || defaultOptions
  const [isLoading, setIsLoading] = useState(false)
  const listContainerRef = useRef<HTMLDivElement>(null)
  const { handleSearchChange, handleSortChange } =
    useSearchAndSortParamsHandler(paramPrefix)

  const handleLoadMore = async () => {
    if (pagination) {
      setIsLoading(true)
      try {
        pagination.onOffsetChange(pagination.offset + pagination.limit)
      } finally {
        setIsLoading(false)
      }
    }
  }

  if (!listClaims.length) {
    return <EmptyStateCard message="No lists found." />
  }

  return (
    <div ref={listContainerRef}>
      {(enableSearch || enableSort) && (
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {enableSearch && (
            <Search
              placeholder="Search lists..."
              onChange={handleSearchChange}
              className="w-full md:w-96"
            />
          )}
          {enableSort && (
            <Sort
              options={options}
              onChange={handleSortChange}
              className="w-full md:w-96"
            />
          )}
        </div>
      )}
      <ListGrid>
        {listClaims.map((listClaim) => (
          <ListCard
            key={listClaim.claim_id}
            title={listClaim.object?.label ?? ''}
            description={listClaim.object?.description ?? ''}
            image={listClaim.object?.image ?? ''}
            link={
              <Link to={getListUrl(listClaim.claim_id, readOnly)}>
                View List
              </Link>
            }
          />
        ))}
      </ListGrid>
      {pagination &&
        pagination.offset + pagination.limit < pagination.totalEntries && (
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
  )
}

export function ListClaimsListNew<T extends SortColumnType = ClaimSortColumn>({
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
  listClaims: GetListsQuery['predicateObjects']
  pagination?: PaginationType
  paramPrefix?: string
  enableSearch?: boolean
  enableSort?: boolean
  onLoadMore?: () => void
  sortOptions?: SortOption<T>[]
  sourceUserAddress?: string
  readOnly?: boolean
}) {
  const defaultOptions: SortOption<ClaimSortColumn>[] = [
    { value: 'Total ETH', sortBy: 'AssetsSum' },
    { value: 'ETH For', sortBy: 'ForAssetsSum' },
    { value: 'ETH Against', sortBy: 'AgainstAssetsSum' },
    { value: 'Total Positions', sortBy: 'NumPositions' },
    { value: 'Positions For', sortBy: 'ForNumPositions' },
    { value: 'Positions Against', sortBy: 'AgainstNumPositions' },
    { value: 'Updated At', sortBy: 'UpdatedAt' },
    { value: 'Created At', sortBy: 'CreatedAt' },
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
    if (pagination) {
      setIsLoading(true)
      try {
        pagination.onOffsetChange(pagination.offset + pagination.limit)
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <div ref={listContainerRef}>
      {(enableSearch || enableSort) && (
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {enableSearch && (
            <Search
              placeholder="Search lists..."
              onChange={handleSearchChange}
              className="w-full md:w-96"
            />
          )}
          {enableSort && (
            <Sort
              options={options}
              onChange={handleSortChange}
              className="w-full md:w-96"
            />
          )}
        </div>
      )}
      <ListGrid>
        {listClaims.map((claim, index) => (
          <ListCard
            key={claim.id || index}
            displayName={claim.object?.label ?? 'Unknown'}
            imgSrc={claim.object?.image ?? undefined}
            identitiesCount={claim.claimCount ?? 0}
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
      {pagination &&
        pagination.offset + pagination.limit < pagination.totalEntries && (
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
  )
}
