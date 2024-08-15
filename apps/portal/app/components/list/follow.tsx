import { ClaimPositionRow, IconName, Identity } from '@0xintuition/1ui'
import { IdentityPresenter, SortColumn } from '@0xintuition/api'

import { ListHeader } from '@components/list/list-header'
import { SortOption } from '@components/sort-select'
import {
  formatBalance,
  getAtomDescription,
  getAtomImage,
  getAtomIpfsLink,
  getAtomLabel,
  getAtomLink,
} from '@lib/utils/misc'
import { PaginationType } from 'app/types/pagination'

import { List } from './list'

export function FollowList({
  identities,
  pagination,
  paramPrefix,
  enableHeader = true,
  enableSearch = true,
  enableSort = true,
}: {
  identities: IdentityPresenter[]
  pagination?: PaginationType
  paramPrefix?: string
  enableHeader?: boolean
  enableSearch?: boolean
  enableSort?: boolean
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
      paginationLabel="users"
      options={options}
      paramPrefix={paramPrefix}
      enableSearch={enableSearch}
      enableSort={enableSort}
    >
      {enableHeader && (
        <ListHeader
          items={[
            { label: 'User', icon: IconName.cryptoPunk },
            { label: 'Position Amount', icon: IconName.ethereum },
          ]}
        />
      )}
      {identities.map((identity) => (
        <div
          key={identity.id}
          className={`grow shrink basis-0 self-stretch p-6 bg-black first:rounded-t-xl last:rounded-b-xl border border-neutral-300/20 flex-col justify-start items-start gap-5 inline-flex`}
        >
          <ClaimPositionRow
            variant={Identity.user}
            position={'claimFor'}
            avatarSrc={getAtomImage(identity)}
            name={getAtomLabel(identity)}
            description={getAtomDescription(identity)}
            id={identity.user?.wallet ?? identity.identity_id}
            amount={
              +formatBalance(
                BigInt(
                  paramPrefix === 'followers'
                    ? identity.assets_sum
                    : identity.user_assets,
                ),
                18,
              )
            }
            feesAccrued={
              identity.user_asset_delta
                ? +formatBalance(
                    +identity.user_assets - +identity.user_asset_delta,
                    18,
                  )
                : 0
            }
            updatedAt={identity.updated_at}
            ipfsLink={getAtomIpfsLink(identity)}
            link={getAtomLink(identity)}
          />
        </div>
      ))}
    </List>
  )
}
