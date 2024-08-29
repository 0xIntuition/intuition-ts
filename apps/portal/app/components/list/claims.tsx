import { Claim, IconName, Identity } from '@0xintuition/1ui'
import {
  ClaimPresenter,
  ClaimSortColumn,
  IdentityPresenter,
} from '@0xintuition/api'

import { ClaimRow } from '@components/claim/claim-row'
import { ListHeader } from '@components/list/list-header'
import {
  formatBalance,
  getAtomDescription,
  getAtomImage,
  getAtomIpfsLink,
  getAtomLabel,
  getAtomLink,
} from '@lib/utils/misc'
import { PATHS } from 'app/consts'
import { PaginationType } from 'app/types/pagination'

import { SortOption } from '../sort-select'
import { List } from './list'

export function ClaimsList({
  claims,
  pagination,
  paramPrefix,
  enableHeader = true,
  enableSearch = true,
  enableSort = true,
}: {
  claims: ClaimPresenter[]
  pagination?: PaginationType
  paramPrefix?: string
  enableHeader?: boolean
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
      {enableHeader && (
        <ListHeader
          items={[
            { label: 'Claim', icon: IconName.claim },
            { label: 'TVL', icon: IconName.ethereum },
          ]}
        />
      )}
      {claims.map((claim) => (
        <div
          key={claim.claim_id}
          className="grow shrink basis-0 self-stretch bg-background first:border-t-px first:rounded-t-xl last:rounded-b-xl theme-border border-t-0 flex-col justify-start gap-5 inline-flex"
        >
          <ClaimRow
            claimsFor={claim.for_num_positions}
            claimsAgainst={claim.against_num_positions}
            claimsForValue={+formatBalance(claim.for_assets_sum, 18)}
            claimsAgainstValue={+formatBalance(claim.against_assets_sum, 18)}
            tvl={+formatBalance(claim.assets_sum, 18)}
            claimLink={`${PATHS.CLAIM}/${claim.claim_id}`}
          >
            <Claim
              size="md"
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
