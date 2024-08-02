import { Claim, ClaimRow, Identity } from '@0xintuition/1ui'
import { ClaimPresenter, ClaimSortColumn } from '@0xintuition/api'

import { formatBalance } from '@lib/utils/misc'
import { BLOCK_EXPLORER_URL, IPFS_GATEWAY_URL, PATHS } from 'consts'
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
            amount={+formatBalance(claim.assets_sum, 18, 4)}
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
                    ? `${BLOCK_EXPLORER_URL}/address/${claim.subject?.identity_id}`
                    : `${IPFS_GATEWAY_URL}/${claim.subject?.identity_id?.replace('ipfs://', '')}`,
                link:
                  claim.subject?.is_user === true
                    ? `${PATHS.PROFILE}/${claim.subject?.identity_id}`
                    : `${PATHS.IDENTITY}/${claim.subject?.identity_id?.replace('ipfs://', '')}`,
              }}
              predicate={{
                variant: claim.predicate?.is_user
                  ? Identity.user
                  : Identity.nonUser,
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
                    ? `${BLOCK_EXPLORER_URL}/address/${claim.predicate?.identity_id}`
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
                    ? `${BLOCK_EXPLORER_URL}/address/${claim.object?.identity_id}`
                    : `${IPFS_GATEWAY_URL}/${claim.object?.identity_id?.replace('ipfs://', '')}`,
                link:
                  claim.object?.is_user === true
                    ? `${PATHS.PROFILE}/${claim.object?.identity_id}`
                    : `${PATHS.IDENTITY}/${claim.object?.identity_id?.replace('ipfs://', '')}`,
              }}
            />
          </ClaimRow>
        </div>
      ))}
    </List>
  )
}
