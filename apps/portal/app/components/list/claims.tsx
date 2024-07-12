import { Claim, ClaimRow, Identity } from '@0xintuition/1ui'
import { ClaimPresenter, ClaimSortColumn } from '@0xintuition/api'

import { formatBalance } from '@lib/utils/misc'
import { useNavigate } from '@remix-run/react'
import { PaginationType } from 'types/pagination'

import { SortOption } from '../sort-select'
import { List } from './list'

export function ClaimsList({
  claims,
  pagination,
  paramPrefix,
  enableSearch = false,
}: {
  claims: ClaimPresenter[]
  pagination: PaginationType
  paramPrefix?: string
  enableSearch?: boolean
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

  return (
    <List<ClaimSortColumn>
      pagination={pagination}
      paginationLabel="claims"
      options={options}
      paramPrefix={paramPrefix}
      enableSearch={enableSearch}
    >
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
    </List>
  )
}
