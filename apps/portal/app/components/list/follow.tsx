import { IconName, Identity } from '@0xintuition/1ui'
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
  identities,
  positions,
  claims,
  pagination,
  paramPrefix,
  enableHeader = true,
  enableSearch = true,
  enableSort = true,
  readOnly = false,
}: {
  identities?: IdentityPresenter[]
  positions?: PositionPresenter[]
  claims?: ClaimPresenter[]
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
      {paramPrefix === 'following'
        ? identities?.map((identity) => {
            const claim = claims?.find((c) => c.object?.id === identity.id)
            return (
              <div
                key={identity.id}
                className={`grow shrink basis-0 self-stretch bg-black first:rounded-t-xl last:rounded-b-xl theme-border flex-col justify-start items-start gap-5 inline-flex`}
              >
                <ClaimPositionRow
                  variant={Identity.user}
                  position={'claimFor'}
                  avatarSrc={getAtomImage(identity)}
                  name={getAtomLabel(identity)}
                  description={getAtomDescription(identity)}
                  id={identity.user?.wallet ?? identity.identity_id}
                  amount={
                    +formatBalance(BigInt(claim?.user_assets_for ?? 0), 18)
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
                  link={getAtomLink(identity, readOnly)}
                />
              </div>
            )
          })
        : positions?.map((position) => (
            <div
              key={position.id}
              className={`grow shrink basis-0 self-stretch bg-black first:rounded-t-xl last:rounded-b-xl theme-border flex-col justify-start items-start gap-5 inline-flex`}
            >
              <ClaimPositionRow
                variant={Identity.user}
                position={'claimFor'}
                avatarSrc={position.user?.image ?? ''}
                name={
                  position.user?.display_name ??
                  position.user?.ens_name ??
                  position.user?.wallet ??
                  ''
                }
                description={position.user?.description ?? ''}
                id={position.user?.wallet ?? ''}
                amount={+formatBalance(BigInt(position.assets), 18)}
                feesAccrued={
                  position.user_asset_delta
                    ? +formatBalance(
                        +position.assets - +position.user_asset_delta,
                        18,
                      )
                    : 0
                }
                updatedAt={position.updated_at}
                ipfsLink={`${BLOCK_EXPLORER_URL}/address/${position.user?.wallet}`}
                link={getProfileUrl(position.user?.wallet, readOnly)}
              />
            </div>
          ))}
    </List>
  )
}
