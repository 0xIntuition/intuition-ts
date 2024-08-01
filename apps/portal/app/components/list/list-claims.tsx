import { useRef, useState } from 'react'

import { Button, EmptyStateCard, ListGrid } from '@0xintuition/1ui'
import { ClaimPresenter, ClaimSortColumn } from '@0xintuition/api'

import { Search } from '@components/search'
import { Sort } from '@components/sort'
import { useSearchAndSortParamsHandler } from '@lib/hooks/useSearchAndSortParams'
import { useNavigate } from '@remix-run/react'
import { PaginationType } from 'types/pagination'

import { SortOption } from '../sort-select'
import { ListIdentityCardPortal } from './list-identity-card-portal'

export function ListClaimsList({
  listClaims,
  pagination,
  paramPrefix,
  enableSearch = false,
  enableSort = false,
  onLoadMore,
  columns,
}: {
  listClaims: ClaimPresenter[]
  pagination: PaginationType
  paramPrefix?: string
  enableSearch?: boolean
  enableSort?: boolean
  onLoadMore?: () => void
  columns?: number
}) {
  const navigate = useNavigate()
  const options: SortOption<ClaimSortColumn>[] = [
    { value: 'Total ETH', sortBy: 'AssetsSum' },
    { value: 'ETH For', sortBy: 'ForAssetsSum' },
    { value: 'ETH Against', sortBy: 'AgainstAssetsSum' },
    { value: 'Total Positions', sortBy: 'NumPositions' },
    { value: 'Positions For', sortBy: 'ForNumPositions' },
    { value: 'Positions Against', sortBy: 'AgainstNumPositions' },
    { value: 'Updated At', sortBy: 'UpdatedAt' },
    { value: 'Created At', sortBy: 'CreatedAt' },
  ]
  const [isLoading, setIsLoading] = useState(false)

  const uniqueClaimData = Array.from(
    new Map(
      listClaims.map((claim) => [
        claim.object?.display_name || 'unknown',
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
    setIsLoading(true)
    await onLoadMore()
    setIsLoading(false)
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col w-full gap-6" ref={listContainerRef}>
        <div
          className={`flex flex-row w-full ${enableSearch ? 'justify-between' : 'justify-end'}`}
        >
          {enableSearch && <Search handleSearchChange={handleSearchChange} />}
          {enableSort && options && (
            <Sort options={options} handleSortChange={handleSortChange} />
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
                  onViewClick={() => navigate(`/app/list/${claim.claim_id}`)}
                />
              ),
          )}
        </ListGrid>
        {pagination.currentPage < pagination.totalPages && (
          <div className="flex justify-center mt-4">
            <Button onClick={handleLoadMore} disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Load More'}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
