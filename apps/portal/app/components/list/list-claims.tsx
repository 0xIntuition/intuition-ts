import { useRef } from 'react'

import { ListGrid } from '@0xintuition/1ui'
import { ClaimPresenter, ClaimSortColumn } from '@0xintuition/api'

import { PaginationComponent } from '@components/pagination-component'
import { Sort } from '@components/sort'
import { useSearchAndSortParamsHandler } from '@lib/hooks/useSearchAndSortParams'
import logger from '@lib/utils/logger'
import { PaginationType } from 'types/pagination'

import { SortOption } from '../sort-select'
import { ListIdentityCardPortal } from './list-identity-card-portal'

export function ListClaimsList({
  listClaims,
  pagination,
  paramPrefix,
  enableSort = false,
}: {
  listClaims: ClaimPresenter[]
  pagination: PaginationType
  paramPrefix?: string
  enableSort?: boolean
}) {
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

  const claimData = listClaims.map((claim) => ({
    object: claim.object,
    user_assets_for: claim.user_assets_for,
    claim_id: claim.claim_id,
  }))

  const listContainerRef = useRef<HTMLDivElement>(null)
  const { handleSortChange, onPageChange, onLimitChange } =
    useSearchAndSortParamsHandler(paramPrefix)

  return (
    <>
      <div className="flex flex-col w-full">
        <div className="flex flex-col w-full gap-6" ref={listContainerRef}>
          <div className="flex flex-row w-full mt-6 justify-end">
            {enableSort && options && (
              <Sort options={options} handleSortChange={handleSortChange} />
            )}
          </div>
          <ListGrid>
            {claimData.map(
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
                    onSaveClick={
                      () => logger('save list clicked', claim.claim_id) // TODO: [ENG-2662] - add the functionality once in place
                    }
                  />
                ),
            )}
          </ListGrid>
        </div>
        <PaginationComponent
          totalEntries={pagination.totalEntries ?? 0}
          currentPage={pagination.currentPage ?? 0}
          totalPages={pagination.totalPages ?? 0}
          limit={pagination.limit ?? 0}
          onPageChange={onPageChange}
          onLimitChange={onLimitChange}
          label="lists"
          listContainerRef={listContainerRef}
        />
      </div>
    </>
  )
}
