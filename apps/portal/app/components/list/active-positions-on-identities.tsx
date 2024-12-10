import { IconName, Identity } from '@0xintuition/1ui'
import { IdentityPresenter, SortColumn } from '@0xintuition/api'
import { GetPositionsQuery } from '@0xintuition/graphql'

import { IdentityPositionRow } from '@components/identity/identity-position-row'
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
  getProfileUrl,
} from '@lib/utils/misc'
import { PaginationType } from 'app/types/pagination'
import { formatUnits } from 'viem'

import { SortOption } from '../sort-select'
import { List } from './list'

type Position = NonNullable<GetPositionsQuery['positions']>[number]

export function ActivePositionsOnIdentitiesNew({
  identities,
  pagination,
  readOnly = false,
}: {
  identities: Position[]
  pagination: { aggregate?: { count: number } } | number
  readOnly?: boolean
}) {
  const options: SortOption<SortColumn>[] = [
    { value: 'Position Amount', sortBy: 'UserAssets' },
    { value: 'Total ETH', sortBy: 'AssetsSum' },
    { value: 'Updated At', sortBy: 'UpdatedAt' },
    { value: 'Created At', sortBy: 'CreatedAt' },
  ]

  const paginationCount =
    typeof pagination === 'number'
      ? pagination
      : pagination?.aggregate?.count ?? 0

  logger('identities in active positions component', identities)
  return (
    <List<SortColumn>
      pagination={{
        currentPage: 1,
        limit: 10,
        totalEntries: paginationCount,
        totalPages: Math.ceil(paginationCount / 10),
      }}
      paginationLabel="positions"
      options={options}
      paramPrefix="activeIdentities"
    >
      <ListHeader
        items={[
          { label: 'Identity', icon: IconName.fingerprint },
          { label: 'Position Amount', icon: IconName.ethereum },
        ]}
      />
      {identities.map((identity) => (
        <div
          key={identity.id}
          className={`grow shrink basis-0 self-stretch bg-black first:rounded-t-xl last:rounded-b-xl theme-border flex-col justify-start items-start gap-5 inline-flex`}
        >
          <IdentityPositionRow
            variant={Identity.user}
            avatarSrc={identity.vault?.atom?.image ?? ''}
            name={identity.vault?.atom?.label ?? ''}
            description={identity.vault?.atom?.label ?? ''} // TODO: Fix this when we have the description
            id={identity.vault?.atom?.id ?? ''}
            amount={+formatBalance(BigInt(identity.shares), 18)}
            feesAccrued={Number(
              formatUnits(
                // @ts-ignore // TODO: Fix this when we determine what the value should be
                BigInt(+identity.shares - +(identity.value ?? identity.shares)),
                18,
              ),
            )}
            // updatedAt={position.updated_at} // TODO: Fix this when we have the updated_at
            link={getProfileUrl(identity.account?.id, readOnly)}
            ipfsLink={`${BLOCK_EXPLORER_URL}/address/${identity.account?.id}`}
          />
        </div>
      ))}
    </List>
  )
}

// LEGACY IMPLEMENTAITON -- REMOVE ONCE MIGRATED
export function ActivePositionsOnIdentities({
  identities,
  pagination,
  readOnly = false,
}: {
  identities: IdentityPresenter[]
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
      pagination={pagination}
      paginationLabel="positions"
      options={options}
      paramPrefix="activeIdentities"
    >
      <ListHeader
        items={[
          { label: 'Identity', icon: IconName.fingerprint },
          { label: 'Position Amount', icon: IconName.ethereum },
        ]}
      />
      {identities.map((identity) => (
        <div
          key={identity.id}
          className={`grow shrink basis-0 self-stretch bg-black first:rounded-t-xl last:rounded-b-xl theme-border flex-col justify-start items-start gap-5 inline-flex`}
        >
          <IdentityPositionRow
            variant={identity.is_user ? Identity.user : Identity.nonUser}
            avatarSrc={getAtomImage(identity)}
            name={getAtomLabel(identity)}
            description={getAtomDescription(identity)}
            id={identity.user?.wallet ?? identity.identity_id}
            amount={+formatBalance(BigInt(identity.user_assets), 18)}
            feesAccrued={
              identity.user_asset_delta
                ? +formatBalance(
                    +identity.user_assets - +identity.user_asset_delta,
                    18,
                  )
                : 0
            }
            updatedAt={identity.updated_at}
            link={getAtomLink(identity, readOnly)}
            ipfsLink={getAtomIpfsLink(identity)}
          />
        </div>
      ))}
    </List>
  )
}
