import { useRef, useState } from 'react'

import {
  Button,
  ButtonVariant,
  EmptyStateCard,
  ListGrid,
} from '@0xintuition/1ui'
import { ClaimPresenter, ClaimSortColumn } from '@0xintuition/api'

import { Search } from '@components/search'
import { Sort } from '@components/sort'
import {
  SortColumnType,
  useSearchAndSortParamsHandler,
} from '@lib/hooks/useSearchAndSortParams'
import { useNavigate } from '@remix-run/react'
import { PaginationType } from 'app/types/pagination'

import { ListIdentityCardPortal } from '../lists/list-identity-card-portal'
import { SortOption } from '../sort-select'

export function ListClaimsList<T extends SortColumnType = ClaimSortColumn>({
  listClaims,
  pagination,
  paramPrefix,
  enableSearch = false,
  enableSort = false,
  onLoadMore,
  columns,
  sortOptions,
  sourceUserAddress,
}: {
  listClaims: ClaimPresenter[]
  pagination?: PaginationType
  paramPrefix?: string
  enableSearch?: boolean
  enableSort?: boolean
  onLoadMore?: () => void
  columns?: number
  sortOptions?: SortOption<T>[]
  sourceUserAddress?: string
}) {
  const navigate = useNavigate()
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
        <ListGrid columns={columns}>
          {uniqueClaimData.map(
            (claim, index) =>
              claim &&
              claim.object && (
                <ListIdentityCardPortal
                  key={claim.claim_id || index}
                  displayName={claim.object.display_name ?? undefined}
                  imgSrc={claim.object?.image ?? undefined}
                  identitiesCount={claim.object.tag_count ?? 0}
                  isSaved={claim.user_assets_for !== '0'}
                  savedAmount={claim.user_assets_for}
                  navigateLink={`/app/list/${claim.claim_id}${sourceUserAddress ? `?user=${sourceUserAddress}` : ''}`}
                  onViewClick={() =>
                    navigate(
                      `/app/list/${claim.claim_id}${sourceUserAddress ? `?user=${sourceUserAddress}` : ''}`,
                    )
                  }
                />
              ),
          )}
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
