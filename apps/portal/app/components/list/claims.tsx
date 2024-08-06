import { Claim, ClaimRow, Identity } from '@0xintuition/1ui'
import {
  ClaimPresenter,
  ClaimSortColumn,
  IdentityPresenter,
} from '@0xintuition/api'

import {
  formatBalance,
  getAtomDescription,
  getAtomImage,
  getAtomIpfsLink,
  getAtomLabel,
  getAtomLink,
} from '@lib/utils/misc'
import { PATHS } from 'consts'
import { PaginationType } from 'types/pagination'

import { SortOption } from '../sort-select'
import { List } from './list'

export function ClaimsList({
  claims,
  pagination,
  paramPrefix,
  enableSearch = false,
  enableSort = false,
}: {
  claims: ClaimPresenter[]
  pagination: PaginationType
  paramPrefix?: string
  enableSearch?: boolean
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

  return (
    <List<ClaimSortColumn>
      pagination={pagination}
      paginationLabel="claims"
      options={options}
      paramPrefix={paramPrefix}
      enableSearch={enableSearch}
      enableSort={enableSort}
    >
      {claims.map((claim) => (
        <div
          key={claim.claim_id}
          className="grow shrink basis-0 self-stretch p-6 bg-background first:rounded-t-xl last:rounded-b-xl theme-border flex-col justify-start gap-5 inline-flex"
        >
          <ClaimRow
            claimsFor={claim.for_num_positions}
            claimsAgainst={claim.against_num_positions}
            claimsForValue={+formatBalance(claim.for_assets_sum, 18)}
            claimsAgainstValue={+formatBalance(claim.against_assets_sum, 18)}
            tvl={+formatBalance(claim.assets_sum, 18, 4)}
          >
            <Claim
              size="md"
              link={`${PATHS.CLAIM}/${claim.claim_id}`}
              subject={{
                variant: claim.subject?.is_user
                  ? Identity.user
                  : Identity.nonUser,
                label: getAtomLabel(claim.subject as IdentityPresenter),
                imgSrc: getAtomImage(claim.subject as IdentityPresenter),
                id: claim.subject?.identity_id,
                description: getAtomDescription(
                  claim.subject as IdentityPresenter,
                ),
                ipfsLink: getAtomIpfsLink(claim.subject as IdentityPresenter),
                link: getAtomLink(claim.subject as IdentityPresenter),
              }}
              predicate={{
                variant: claim.predicate?.is_user
                  ? Identity.user
                  : Identity.nonUser,
                label: getAtomLabel(claim.predicate as IdentityPresenter),
                imgSrc: getAtomImage(claim.predicate as IdentityPresenter),
                id: claim.predicate?.identity_id,
                description: getAtomDescription(
                  claim.predicate as IdentityPresenter,
                ),
                ipfsLink: getAtomIpfsLink(claim.predicate as IdentityPresenter),
                link: getAtomLink(claim.predicate as IdentityPresenter),
              }}
              object={{
                variant: claim.object?.is_user
                  ? Identity.user
                  : Identity.nonUser,
                label: getAtomLabel(claim.object as IdentityPresenter),
                imgSrc: getAtomImage(claim.object as IdentityPresenter),
                id: claim.object?.identity_id,
                description: getAtomDescription(
                  claim.object as IdentityPresenter,
                ),
                ipfsLink: getAtomIpfsLink(claim.object as IdentityPresenter),
                link: getAtomLink(claim.object as IdentityPresenter),
              }}
            />
          </ClaimRow>
        </div>
      ))}
    </List>
  )
}
