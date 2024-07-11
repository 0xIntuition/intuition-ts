import { Claim, ClaimRow, Identity } from '@0xintuition/1ui'
import { ClaimPresenter, ClaimSortColumn } from '@0xintuition/api'

import { useSearchAndSortParamsHandler } from '@lib/hooks/useSearchAndSortParams'
import { formatBalance } from '@lib/utils/misc'
import { useNavigate } from '@remix-run/react'
import { PaginationType } from 'types/pagination'

import { PaginationComponent } from '../pagination-component'
import { SearchAndSort } from '../search-and-sort'
import { SortOption } from '../sort-select'

export function ClaimsList({
  claims,
  pagination,
  paramPrefix,
}: {
  claims: ClaimPresenter[]
  pagination: PaginationType
  paramPrefix?: string
}) {
  const navigate = useNavigate()
  const options: SortOption<ClaimSortColumn>[] = [
    { value: 'Total ETH', sortBy: 'AssetsSum' },
    { value: 'ETH For', sortBy: 'ForAssetsSum' },
    { value: 'ETH Against', sortBy: 'AgainstAssetsSum' },
    { value: 'Total Positions', sortBy: 'NumPositions' },
    { value: 'Positions For', sortBy: 'ForNumPositions' },
    { value: 'Positions Against', sortBy: 'AgainstNumPositions' },
  ]

  const { handleSortChange, handleSearchChange, onPageChange, onLimitChange } =
    useSearchAndSortParamsHandler<ClaimSortColumn>(paramPrefix)

  return (
    <>
      <div className="flex flex-col w-full gap-6">
        <SearchAndSort
          options={options}
          handleSortChange={handleSortChange}
          handleSearchChange={handleSearchChange}
        />
        <div className="flex flex-col w-full">
          {claims?.map((claim) => (
            <div
              key={claim.claim_id}
              className="grow shrink basis-0 self-stretch p-6 bg-background first:rounded-t-xl last:rounded-b-xl theme-border flex-col justify-start gap-5 inline-flex"
            >
              <ClaimRow
                claimsFor={claim.for_num_positions}
                claimsAgainst={claim.against_num_positions}
                amount={+formatBalance(claim.assets_sum, 18, 4)}
                onClick={() => {
                  navigate(`/app/claim/${claim.claim_id}`)
                }}
                className="hover:cursor-pointer"
              >
                <Claim
                  subject={{
                    variant: claim.subject?.is_user
                      ? Identity.user
                      : Identity.nonUser,
                    label:
                      claim.subject?.user?.display_name ??
                      claim.subject?.display_name ??
                      claim.subject?.identity_id ??
                      '',
                    imgSrc: claim.subject?.image,
                  }}
                  predicate={{
                    variant: claim.predicate?.is_user ? 'user' : 'non-user',
                    label:
                      claim.predicate?.user?.display_name ??
                      claim.predicate?.display_name ??
                      claim.predicate?.identity_id ??
                      '',
                    imgSrc: claim.predicate?.image,
                  }}
                  object={{
                    variant: claim.object?.is_user ? 'user' : 'non-user',
                    label:
                      claim.object?.user?.display_name ??
                      claim.object?.display_name ??
                      claim.object?.identity_id ??
                      '',
                    imgSrc: claim.object?.image,
                  }}
                />
              </ClaimRow>
            </div>
          ))}
        </div>
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
