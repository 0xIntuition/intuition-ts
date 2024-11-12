import { useRef, useState } from 'react'

import {
  Button,
  ButtonVariant,
  EmptyStateCard,
  ListCard,
  ListGrid,
} from '@0xintuition/1ui'
import { ClaimPresenter, ClaimSortColumn } from '@0xintuition/api'

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
  onLoadMore,
  sortOptions,
  sourceUserAddress,
  readOnly = false,
}: {
  listClaims: ClaimPresenter[]
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

  const uniqueClaimData = Array.from(
    new Map(
      listClaims.map((claim) => [
        claim.object?.identity_id || 'unknown',
        claim,
      ]),
    ).values(),
  ).map((claim) => ({
    object: claim.object,
    user_assets_for: claim.user_assets_for,
    claim_id: claim.claim_id,
    vault_id: claim.vault_id,
  }))

  const listContainerRef = useRef<HTMLDivElement>(null)
  const { handleSearchChange, handleSortChange } =
    useSearchAndSortParamsHandler(paramPrefix)

  if (!uniqueClaimData.length) {
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
          {uniqueClaimData
            .filter((claim) => claim && claim.object)
            .map((claim, index) => (
              <ListCard
                key={claim.claim_id || index}
                displayName={claim.object?.display_name ?? 'Unknown'}
                imgSrc={claim.object?.image ?? undefined}
                identitiesCount={claim.object?.tag_count ?? 0}
                buttonWrapper={(button) => (
                  <Link
                    to={getListUrl(
                      claim.vault_id,
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
