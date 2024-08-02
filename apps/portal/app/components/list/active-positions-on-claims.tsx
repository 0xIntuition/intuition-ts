import { Claim, ClaimPositionRow, Identity } from '@0xintuition/1ui'
import { ClaimPresenter, SortColumn } from '@0xintuition/api'

import { formatBalance } from '@lib/utils/misc'
import { useNavigate } from '@remix-run/react'
import { BLOCK_EXPLORER_URL, IPFS_GATEWAY_URL, PATHS } from 'consts'
import { PaginationType } from 'types/pagination'

import { SortOption } from '../sort-select'
import { List } from './list'

export function ActivePositionsOnClaims({
  claims,
  pagination,
}: {
  claims: ClaimPresenter[]
  pagination: PaginationType
}) {
  const navigate = useNavigate()
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
      {claims.map((claim) => (
        <div
          key={claim.claim_id}
          className={`grow shrink basis-0 self-stretch p-6 bg-black first:rounded-t-xl last:rounded-b-xl border border-neutral-300/20 flex-col justify-start items-start gap-5 inline-flex`}
        >
          <ClaimPositionRow
            variant="claim"
            position={claim.user_assets_for > '0' ? 'claimFor' : 'claimAgainst'}
            claimsFor={claim.for_num_positions}
            claimsAgainst={claim.against_num_positions}
            amount={
              +formatBalance(
                claim.user_assets_for > '0'
                  ? claim.user_assets_for
                  : claim.user_assets_against,
                18,
                5,
              )
            }
            feesAccrued={0} // TODO: Update once BE adds deltas to the data output
            onClick={() => {
              navigate(`/app/claim/${claim.claim_id}`)
            }}
            className="hover:cursor-pointer"
          >
            <Claim
              link={`${PATHS.CLAIM}/${claim.claim_id}`}
              subject={{
                variant: claim.subject?.is_user
                  ? Identity.user
                  : Identity.nonUser,
                label:
                  claim.subject?.user?.display_name ??
                  claim.subject?.display_name ??
                  claim.subject?.identity_id ??
                  '',
                imgSrc: claim.subject?.is_user
                  ? claim.subject?.user?.image
                  : claim.subject?.image,
                id: claim.subject?.identity_id,
                description: claim.subject?.is_user
                  ? claim.subject?.user?.description
                  : claim.subject?.description,
                ipfsLink:
                  claim.subject?.is_user === true
                    ? `${BLOCK_EXPLORER_URL}/${claim.subject?.identity_id}`
                    : `${IPFS_GATEWAY_URL}/${claim.subject?.identity_id?.replace('ipfs://', '')}`,
                link:
                  claim.subject?.is_user === true
                    ? `${PATHS.PROFILE}/${claim.subject?.identity_id}`
                    : `${PATHS.IDENTITY}/${claim.subject?.identity_id?.replace('ipfs://', '')}`,
              }}
              predicate={{
                variant: claim.predicate?.is_user ? 'user' : 'non-user',
                label:
                  claim.predicate?.user?.display_name ??
                  claim.predicate?.display_name ??
                  claim.predicate?.identity_id ??
                  '',
                imgSrc: claim.predicate?.is_user
                  ? claim.predicate?.user?.image
                  : claim.predicate?.image,
                id: claim.predicate?.identity_id,
                description: claim.predicate?.is_user
                  ? claim.predicate?.user?.description
                  : claim.predicate?.description,
                ipfsLink:
                  claim.predicate?.is_user === true
                    ? `${BLOCK_EXPLORER_URL}/${claim.predicate?.identity_id}`
                    : `${IPFS_GATEWAY_URL}/${claim.predicate?.identity_id?.replace('ipfs://', '')}`,
                link:
                  claim.predicate?.is_user === true
                    ? `${PATHS.PROFILE}/${claim.predicate?.identity_id}`
                    : `${PATHS.IDENTITY}/${claim.predicate?.identity_id?.replace('ipfs://', '')}`,
              }}
              object={{
                variant: claim.object?.is_user ? 'user' : 'non-user',
                label:
                  claim.object?.user?.display_name ??
                  claim.object?.display_name ??
                  claim.object?.identity_id ??
                  '',
                imgSrc: claim.object?.is_user
                  ? claim.object?.user?.image
                  : claim.object?.image,
                id: claim.object?.identity_id,
                description: claim.object?.is_user
                  ? claim.object?.user?.description
                  : claim.object?.description,
                ipfsLink:
                  claim.object?.is_user === true
                    ? `${BLOCK_EXPLORER_URL}/${claim.object?.identity_id}`
                    : `${IPFS_GATEWAY_URL}/${claim.object?.identity_id?.replace('ipfs://', '')}`,
                link:
                  claim.object?.is_user === true
                    ? `${PATHS.PROFILE}/${claim.object?.identity_id}`
                    : `${PATHS.IDENTITY}/${claim.object?.identity_id?.replace('ipfs://', '')}`,
              }}
            />
          </ClaimPositionRow>
        </div>
      ))}
    </List>
  )
}
