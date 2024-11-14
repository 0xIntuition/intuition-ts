import {
  Claim,
  ClaimPosition,
  ClaimRow,
  IconName,
  Identity,
  useSidebarLayoutContext,
} from '@0xintuition/1ui'
import {
  ClaimPresenter,
  ClaimSortColumn,
  IdentityPresenter,
} from '@0xintuition/api'

import { ListHeader } from '@components/list/list-header'
import RemixLink from '@components/remix-link'
import { stakeModalAtom } from '@lib/state/store'
import {
  formatBalance,
  getAtomDescription,
  getAtomImage,
  getAtomIpfsLink,
  getAtomLabel,
  getAtomLink,
  getClaimUrl,
} from '@lib/utils/misc'
import { Link } from '@remix-run/react'
import { PaginationType } from 'app/types/pagination'
import { useSetAtom } from 'jotai'

import { SortOption } from '../sort-select'
import { List } from './list'

export function ClaimsList({
  claims,
  pagination,
  paramPrefix,
  enableHeader = true,
  enableSearch = true,
  enableSort = true,
  readOnly = false,
}: {
  claims: ClaimPresenter[]
  pagination?: PaginationType
  paramPrefix?: string
  enableHeader?: boolean
  enableSearch?: boolean
  enableSort?: boolean
  readOnly?: boolean
}) {
  const setStakeModalActive = useSetAtom(stakeModalAtom)
  const { isMobileView } = useSidebarLayoutContext()

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
      {claims.map((claim, index) => (
        <div
          key={claim.claim_id}
          className="grow shrink basis-0 self-stretch bg-background first:border-t-px first:rounded-t-xl last:rounded-b-xl theme-border border-t-0 flex-col justify-start gap-5 inline-flex"
        >
          <ClaimRow
            numPositionsFor={claim.for_num_positions}
            numPositionsAgainst={claim.against_num_positions}
            tvlFor={formatBalance(claim.for_assets_sum, 18)}
            tvlAgainst={formatBalance(claim.against_assets_sum, 18)}
            totalTVL={formatBalance(claim.assets_sum, 18)}
            userPosition={formatBalance(claim.user_assets, 18)}
            positionDirection={
              +claim.user_assets_for > 0
                ? ClaimPosition.claimFor
                : +claim.user_assets_against > 0
                  ? ClaimPosition.claimAgainst
                  : undefined
            }
            onStakeForClick={() =>
              setStakeModalActive((prevState) => ({
                ...prevState,
                mode: 'deposit',
                modalType: 'claim',
                direction: ClaimPosition.claimFor,
                isOpen: true,
                claim,
                vaultId: claim.vault_id,
              }))
            }
            onStakeAgainstClick={() =>
              setStakeModalActive((prevState) => ({
                ...prevState,
                mode: 'deposit',
                modalType: 'claim',
                direction: ClaimPosition.claimAgainst,
                isOpen: true,
                claim,
                vaultId: claim.counter_vault_id,
              }))
            }
            isFirst={!enableHeader && index === 0}
            isLast={index === claims.length - 1}
            className="border-none rounded-none"
          >
            <Link to={getClaimUrl(claim.vault_id)} prefetch="intent">
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
                  link: getAtomLink(
                    claim.subject as IdentityPresenter,
                    readOnly,
                  ),
                  linkComponent: RemixLink,
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
                  ipfsLink: getAtomIpfsLink(
                    claim.predicate as IdentityPresenter,
                  ),
                  link: getAtomLink(
                    claim.predicate as IdentityPresenter,
                    readOnly,
                  ),
                  linkComponent: RemixLink,
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
                  link: getAtomLink(
                    claim.object as IdentityPresenter,
                    readOnly,
                  ),
                  linkComponent: RemixLink,
                }}
                orientation={isMobileView ? 'vertical' : 'horizontal'}
                isClickable={true}
              />
            </Link>
          </ClaimRow>
        </div>
      ))}
    </List>
  )
}
