import { Claim, ClaimPosition, IconName, Identity } from '@0xintuition/1ui'
import { ClaimPresenter, IdentityPresenter, SortColumn } from '@0xintuition/api'
import { GetPositionsQuery } from '@0xintuition/graphql'

import { ClaimPositionRow } from '@components/claim/claim-position-row'
import { ListHeader } from '@components/list/list-header'
import { BLOCK_EXPLORER_URL } from '@consts/general'
import logger from '@lib/utils/logger'
import {
  formatBalance,
  getAtomDescription,
  getAtomImage,
  getAtomIpfsLink,
  getAtomLabel,
  getAtomLink,
  getClaimUrl,
  getProfileUrl,
} from '@lib/utils/misc'
import claims from '@routes/app+/explore+/_index+/claims'
import { PaginationType } from 'app/types/pagination'
import { formatUnits } from 'viem'

import { SortOption } from '../sort-select'
import { List } from './list'

type Position = NonNullable<GetPositionsQuery['positions']>[number]

export function ActivePositionsOnClaimsNew({
  vaultPositions,
  counterVaultPositions,
  pagination,
  readOnly = false,
  positionDirection,
}: {
  vaultPositions: Position[]
  counterVaultPositions: Position[]
  pagination: { aggregate?: { count: number } } | number
  readOnly?: boolean
  positionDirection?: string
}) {
  const options: SortOption<SortColumn>[] = [
    { value: 'Position Amount', sortBy: 'UserAssets' },
    { value: 'Total ETH', sortBy: 'AssetsSum' },
    { value: 'Updated At', sortBy: 'UpdatedAt' },
    { value: 'Created At', sortBy: 'CreatedAt' },
  ]

  logger('vaultPositions', { vaultPositions })
  logger('counterVaultPositions', { counterVaultPositions })
  // Combining and transforming positions -- we can see if there is a better/different way to do this, but the issue is previously these were combined and now they're split so we need to recombine for the tabs UI
  const allPositions = [
    ...vaultPositions.map((p) => ({ ...p, direction: 'for' as const })),
    ...counterVaultPositions.map((p) => ({
      ...p,
      direction: 'against' as const,
    })),
  ].filter((position) => {
    if (positionDirection === 'for') {
      return position.direction === 'for'
    }
    if (positionDirection === 'against') {
      return position.direction === 'against'
    }
    return true
  })

  logger('allPositions', { allPositions })

  return (
    <List<SortColumn>
      pagination={{
        currentPage: 1,
        limit: 10,
        totalEntries: allPositions.length,
        totalPages: Math.ceil(allPositions.length / 10),
      }}
      paginationLabel="positions"
    >
      <ListHeader
        items={[
          { label: 'Claim', icon: IconName.claim },
          { label: 'Position Amount', icon: IconName.ethereum },
        ]}
      />
      {allPositions.map((position) => (
        <div
          key={position.id}
          className={`grow shrink basis-0 self-stretch bg-black first:rounded-t-xl last:rounded-b-xl theme-border flex-col justify-start items-start gap-5 inline-flex`}
        >
          <ClaimPositionRow
            variant="user"
            avatarSrc={position.account?.image ?? ''}
            name={position.account?.label ?? ''}
            description={position.account?.label ?? ''}
            id={position.account?.id ?? ''}
            amount={+formatBalance(BigInt(position.shares), 18)}
            position={
              position.direction === 'for'
                ? ClaimPosition.claimFor
                : ClaimPosition.claimAgainst
            }
            feesAccrued={Number(
              formatUnits(
                // @ts-ignore // TODO: Fix this when we determine what the value should be
                BigInt(+position.shares - +(position.value ?? position.shares)),
                18,
              ),
            )}
            // updatedAt={position.updated_at} // TODO: Fix this when we have the updated_at

            link={getProfileUrl(position.account?.id, readOnly)}
            ipfsLink={`${BLOCK_EXPLORER_URL}/address/${position.account?.id}`}
          >
            {/* <Claim
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
            /> */}
          </ClaimPositionRow>
        </div>
      ))}
    </List>
  )
}

// LEGACY IMPLEMENTAITON -- REMOVE ONCE MIGRATED
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
            position={
              claim.user_assets_for > '0'
                ? ClaimPosition.claimFor
                : ClaimPosition.claimAgainst
            }
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
            link={getClaimUrl(claim.vault_id, readOnly)}
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
