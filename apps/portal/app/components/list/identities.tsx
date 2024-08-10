import { IconName, Identity, IdentityContentRow } from '@0xintuition/1ui'
import { IdentityPresenter, SortColumn } from '@0xintuition/api'

import { ListHeader } from '@components/list/list-header'
import {
  formatBalance,
  getAtomImage,
  getAtomIpfsLink,
  getAtomLabel,
  getAtomLink,
} from '@lib/utils/misc'
import { PaginationType } from 'app/types/pagination'

import { SortOption } from '../sort-select'
import { List } from './list'

export function IdentitiesList({
  variant = 'explore',
  identities,
  pagination,
  paramPrefix,
  enableSearch = false,
  enableSort = false,
}: {
  variant?: 'explore' | 'positions'
  identities: IdentityPresenter[]
  pagination?: PaginationType
  paramPrefix?: string
  enableSearch?: boolean
  enableSort?: boolean
}) {
  const options: SortOption<SortColumn>[] = [
    { value: 'Total ETH', sortBy: 'AssetsSum' },
    { value: 'Total Positions', sortBy: 'NumPositions' },
    { value: 'Updated At', sortBy: 'UpdatedAt' },
    { value: 'Created At', sortBy: 'CreatedAt' },
  ]

  return (
    <List<SortColumn>
      pagination={pagination}
      paginationLabel="identities"
      options={options}
      paramPrefix={paramPrefix}
      enableSearch={enableSearch}
      enableSort={enableSort}
    >
      <ListHeader
        items={[
          { label: 'Identity', icon: IconName.fingerprint },
          { label: 'Total Staked', icon: IconName.ethereum },
        ]}
      />
      {identities.map((identity) => {
        if (!identity || typeof identity !== 'object') {
          return null
        }
        return (
          <div
            key={identity.id}
            className={`grow shrink basis-0 self-stretch p-6 bg-background first:border-t-px first:rounded-t-xl last:rounded-b-xl theme-border border-t-0 flex-col justify-start items-start gap-5 inline-flex`}
          >
            <IdentityContentRow
              variant={identity.is_user ? Identity.user : Identity.nonUser}
              avatarSrc={getAtomImage(identity)}
              name={getAtomLabel(identity)}
              id={identity.user?.wallet ?? identity.identity_id}
              amount={
                +formatBalance(
                  BigInt(
                    variant === 'explore'
                      ? identity.assets_sum
                      : identity.user_assets || '',
                  ),
                  18,
                  4,
                )
              }
              totalFollowers={identity.num_positions}
              link={getAtomLink(identity)}
              ipfsLink={getAtomIpfsLink(identity)}
            />
          </div>
        )
      })}
    </List>
  )
}
