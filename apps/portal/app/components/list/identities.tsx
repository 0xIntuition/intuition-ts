import { IconName, Identity, IdentityRow } from '@0xintuition/1ui'
import { IdentityPresenter, SortColumn } from '@0xintuition/api'
import { GetAtomsQuery } from '@0xintuition/graphql'

import { ListHeader } from '@components/list/list-header'
import { stakeModalAtom } from '@lib/state/store'
import logger from '@lib/utils/logger'
import {
  formatBalance,
  getAtomDescription,
  getAtomImage,
  getAtomIpfsLink,
  getAtomIpfsLinkNew,
  getAtomLabel,
  getAtomLink,
  getAtomLinkNew,
} from '@lib/utils/misc'
import { PaginationType } from 'app/types/pagination'
import { useSetAtom } from 'jotai'

import { SortOption } from '../sort-select'
import { List } from './list'

type Atom = NonNullable<GetAtomsQuery['atoms']>[number]

export function IdentitiesListNew({
  identities,
  pagination,
  paramPrefix,
  enableHeader = true,
  enableSearch = true,
  enableSort = true,
  readOnly = false,
}: {
  variant?: 'explore' | 'positions'
  identities: Atom[]
  pagination: { aggregate?: { count: number } } | number
  paramPrefix?: string
  enableHeader?: boolean
  enableSearch?: boolean
  enableSort?: boolean
  readOnly?: boolean
}) {
  const options: SortOption<SortColumn>[] = [
    { value: 'Total ETH', sortBy: 'AssetsSum' },
    { value: 'Total Positions', sortBy: 'NumPositions' },
    { value: 'Updated At', sortBy: 'UpdatedAt' },
    { value: 'Created At', sortBy: 'CreatedAt' },
  ]

  const setStakeModalActive = useSetAtom(stakeModalAtom)

  logger('identities', identities)

  const paginationCount =
    typeof pagination === 'number'
      ? pagination
      : pagination?.aggregate?.count ?? 0

  return (
    <List<SortColumn>
      pagination={{
        currentPage: 1,
        limit: 10,
        totalEntries: paginationCount,
        totalPages: Math.ceil(paginationCount / 10),
      }}
      paginationLabel="identities"
      options={options}
      paramPrefix={paramPrefix}
      enableSearch={enableSearch}
      enableSort={enableSort}
    >
      {enableHeader && (
        <ListHeader
          items={[
            { label: 'Identity', icon: IconName.fingerprint },
            { label: 'TVL', icon: IconName.ethereum },
          ]}
        />
      )}
      {identities.map((identity, index) => {
        if (!identity || typeof identity !== 'object') {
          return null
        }
        return (
          <div
            key={identity.id}
            className={`grow shrink basis-0 self-stretch bg-background first:border-t-px first:rounded-t-xl last:rounded-b-xl theme-border border-t-0 flex-col justify-start items-start inline-flex gap-8`}
          >
            <IdentityRow
              variant={
                identity.type === 'user' ? Identity.user : Identity.nonUser
              }
              avatarSrc={identity?.image ?? ''}
              name={identity?.label ?? identity?.data ?? ''}
              description={identity?.label ?? identity?.data ?? ''}
              id={identity?.creator?.id ?? ''}
              totalTVL={formatBalance(
                BigInt(identity?.vault?.total_shares ?? '0'),
                18,
              )}
              currency={'ETH'}
              numPositions={identity?.vault?.position_count ?? 0}
              link={getAtomLinkNew(identity, readOnly)}
              ipfsLink={getAtomIpfsLinkNew(identity)}
              // tags={
              //   identity.tags?.map((tag) => ({
              //     label: tag.display_name,
              //     value: tag.num_tagged_identities,
              //   })) ?? undefined
              // } // TODO: (ENG-4939) -- Update query/component to use new tags
              userPosition={formatBalance(
                identity?.vault?.positions?.[0]?.shares ?? '0',
                18,
              )}
              onStakeClick={() =>
                // @ts-ignore // TODO: Fix the staking actions to use correct types
                setStakeModalActive((prevState) => ({
                  ...prevState,
                  mode: 'deposit',
                  modalType: 'identity',
                  isOpen: true,
                  identity: (identity as Atom) ?? undefined,
                  vaultId: identity?.id ?? null,
                }))
              }
              isFirst={!enableHeader && index === 0}
              isLast={index === identities.length - 1}
              className="border-none rounded-none"
            />
          </div>
        )
      })}
    </List>
  )
}

// LEGACY IMPLEMENTATION -- CAN REMOVE ONCE ALL ACTIVITIES ARE CONVERTED TO NEW IMPLEMENTATION
export function IdentitiesList({
  identities,
  pagination,
  paramPrefix,
  enableHeader = true,
  enableSearch = true,
  enableSort = true,
  readOnly = false,
}: {
  variant?: 'explore' | 'positions'
  identities: IdentityPresenter[]
  pagination?: PaginationType
  paramPrefix?: string
  enableHeader?: boolean
  enableSearch?: boolean
  enableSort?: boolean
  readOnly?: boolean
}) {
  const options: SortOption<SortColumn>[] = [
    { value: 'Total ETH', sortBy: 'AssetsSum' },
    { value: 'Total Positions', sortBy: 'NumPositions' },
    { value: 'Updated At', sortBy: 'UpdatedAt' },
    { value: 'Created At', sortBy: 'CreatedAt' },
  ]

  const setStakeModalActive = useSetAtom(stakeModalAtom)

  return (
    <List<SortColumn>
      pagination={pagination}
      paginationLabel="identities"
      options={options}
      paramPrefix={paramPrefix}
      enableSearch={enableSearch}
      enableSort={enableSort}
    >
      {enableHeader && (
        <ListHeader
          items={[
            { label: 'Identity', icon: IconName.fingerprint },
            { label: 'TVL', icon: IconName.ethereum },
          ]}
        />
      )}
      {identities.map((identity, index) => {
        if (!identity || typeof identity !== 'object') {
          return null
        }
        return (
          <div
            key={identity.id}
            className={`grow shrink basis-0 self-stretch bg-background first:border-t-px first:rounded-t-xl last:rounded-b-xl theme-border border-t-0 flex-col justify-start items-start inline-flex gap-8`}
          >
            <IdentityRow
              variant={identity.is_user ? Identity.user : Identity.nonUser}
              avatarSrc={getAtomImage(identity)}
              name={getAtomLabel(identity)}
              description={getAtomDescription(identity)}
              id={identity.user?.wallet ?? identity.identity_id}
              totalTVL={formatBalance(BigInt(identity.assets_sum), 18)}
              currency={'ETH'}
              numPositions={identity.num_positions}
              link={getAtomLink(identity, readOnly)}
              ipfsLink={getAtomIpfsLink(identity)}
              tags={
                identity.tags?.map((tag) => ({
                  label: tag.display_name,
                  value: tag.num_tagged_identities,
                })) ?? undefined
              }
              userPosition={formatBalance(identity.user_assets, 18)}
              onStakeClick={() =>
                setStakeModalActive((prevState) => ({
                  ...prevState,
                  mode: 'deposit',
                  modalType: 'identity',
                  isOpen: true,
                  identity,
                  vaultId: identity.vault_id,
                }))
              }
              isFirst={!enableHeader && index === 0}
              isLast={index === identities.length - 1}
              className="border-none rounded-none"
            />
          </div>
        )
      })}
    </List>
  )
}
