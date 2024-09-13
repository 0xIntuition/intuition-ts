import { Claim, IconName, Identity } from '@0xintuition/1ui'
import { ClaimPresenter, IdentityPresenter, SortColumn } from '@0xintuition/api'

import { ClaimPositionRow } from '@components/claim/claim-position-row'
import { ListHeader } from '@components/list/list-header'
import {
  formatBalance,
  getAtomDescription,
  getAtomImage,
  getAtomIpfsLink,
  getAtomLabel,
  getAtomLink,
  getClaimUrl,
} from '@lib/utils/misc'
import { PaginationType } from 'app/types/pagination'

import { SortOption } from '../sort-select'
import { List } from './list'

export function ActivePositionsOnClaims({
  claims,
  pagination,
  readOnly = false,
}: {
  claims: ClaimPresenter[]
  pagination: PaginationType
  readOnly?: boolean
}) {
  const options: SortOption<SortColumn>[] = [
    { value: 'Position Amount', sortBy: 'UserAssets' },
    { value: 'Total ETH', sortBy: 'AssetsSum' },
    { value: 'Updated At', sortBy: 'UpdatedAt' },
    { value: 'Created At', sortBy: 'CreatedAt' },
  ]

  return (
    <List<SortColumn>
      paginationLabel="positions"
      pagination={pagination}
      options={options}
      paramPrefix="activeClaims"
    >
      <ListHeader
        items={[
          { label: 'Claim', icon: IconName.claim },
          { label: 'Position Amount', icon: IconName.ethereum },
        ]}
      />
      {claims.map((claim) => (
        <div
          key={claim.claim_id}
          className={`grow shrink basis-0 self-stretch bg-black first:rounded-t-xl last:rounded-b-xl theme-border flex-col justify-start items-start gap-5 inline-flex`}
        >
          <ClaimPositionRow
            variant="claim"
            position={claim.user_assets_for > '0' ? 'claimFor' : 'claimAgainst'}
            claimsFor={claim.for_num_positions}
            claimsAgainst={claim.against_num_positions}
            claimsForValue={+formatBalance(claim.for_assets_sum, 18)}
            claimsAgainstValue={+formatBalance(claim.against_assets_sum, 18)}
            amount={
              +formatBalance(
                claim.user_assets_for > '0'
                  ? claim.user_assets_for
                  : claim.user_assets_against,
                18,
              )
            }
            feesAccrued={0} // TODO: Update once BE adds deltas to the data output
            link={getClaimUrl(claim.claim_id, readOnly)}
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
                link: getAtomLink(claim.subject as IdentityPresenter, readOnly),
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
                link: getAtomLink(
                  claim.predicate as IdentityPresenter,
                  readOnly,
                ),
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
                link: getAtomLink(claim.object as IdentityPresenter, readOnly),
              }}
            />
          </ClaimPositionRow>
        </div>
      ))}
    </List>
  )
}
