import { ClaimPosition, IconName, Identity } from '@0xintuition/1ui'
import {
  ClaimPresenter,
  IdentityPresenter,
  PositionPresenter,
  PositionSortColumn,
  SortColumn,
} from '@0xintuition/api'

import { ClaimPositionRow } from '@components/claim/claim-position-row'
import { ListHeader } from '@components/list/list-header'
import { SortOption } from '@components/sort-select'
import {
  formatBalance,
  getAtomDescription,
  getAtomImage,
  getAtomIpfsLink,
  getAtomLabel,
  getAtomLink,
  getProfileUrl,
} from '@lib/utils/misc'
import { BLOCK_EXPLORER_URL } from 'app/consts'
import { PaginationType } from 'app/types/pagination'

import { List } from './list'

export function FollowList({
  positions,
  pagination,
  paramPrefix,
  enableHeader = true,
  enableSearch = true,
  enableSort = true,
  readOnly = false,
}: {
  positions?: any[]
  pagination?: PaginationType
  paramPrefix?: string
  enableHeader?: boolean
  enableSearch?: boolean
  enableSort?: boolean
  readOnly?: boolean
}) {
  const followingOptions: SortOption<SortColumn>[] = [
    { value: 'Position Amount', sortBy: 'UserAssets' },
    { value: 'Total ETH', sortBy: 'AssetsSum' },
    { value: 'Updated At', sortBy: 'UpdatedAt' },
    { value: 'Created At', sortBy: 'CreatedAt' },
  ]

  const followersOptions: SortOption<PositionSortColumn>[] = [
    { value: 'Position Amount', sortBy: 'Assets' },
    { value: 'Updated At', sortBy: 'UpdatedAt' },
    { value: 'Created At', sortBy: 'CreatedAt' },
  ]

  return (
    <List<SortColumn | PositionSortColumn>
      pagination={pagination}
      paginationLabel="users"
      options={
        paramPrefix === 'following' ? followingOptions : followersOptions
      }
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
      {positions?.map((position) => (
        <div
          key={position.id ?? position.accountId}
          className="grow shrink basis-0 self-stretch bg-black first:rounded-t-xl last:rounded-b-xl theme-border flex-col justify-start items-start gap-5 inline-flex"
        >
          <ClaimPositionRow
            variant={Identity.user}
            position={ClaimPosition.claimFor}
            avatarSrc={position.account?.image ?? position.object?.image ?? ''}
            name={
              position.account?.label ??
              position.account?.ens_name ??
              position.account?.id ??
              position.object?.label ??
              ''
            }
            description={
              position.account?.description ??
              position.object?.description ??
              ''
            }
            id={position.account?.id ?? position.object?.wallet ?? ''}
            amount={+formatBalance(BigInt(position.shares ?? '0'), 18)}
            feesAccrued={
              position.user_asset_delta
                ? +formatBalance(
                    +position.shares - +position.user_asset_delta,
                    18,
                  )
                : 0
            }
            updatedAt={position.updated_at}
            ipfsLink={`${BLOCK_EXPLORER_URL}/address/${position.account?.id ?? position.object?.wallet}`}
            link={getProfileUrl(
              position.account?.id ?? position.object?.wallet,
              readOnly,
            )}
          />
        </div>
      ))}
    </List>
  )
}
