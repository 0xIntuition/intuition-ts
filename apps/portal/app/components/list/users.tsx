import { IconName, Identity, IdentityPosition } from '@0xintuition/1ui'
import { IdentityPresenter, SortColumn } from '@0xintuition/api'

import { ListHeader } from '@components/list/list-header'
import {
  getAtomDescription,
  getAtomImage,
  getAtomIpfsLink,
  getAtomLabel,
  getAtomLink,
} from '@lib/utils/misc'
import { PaginationType } from 'app/types/pagination'

import { SortOption } from '../sort-select'
import { List } from './list'

export function UsersList({
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
      {enableHeader && (
        <ListHeader
          items={[
            { label: 'User', icon: IconName.fingerprint },
            { label: 'Total Points', icon: IconName.rocket },
          ]}
        />
      )}
      {identities.map((identity) => {
        if (!identity || typeof identity !== 'object') {
          return null
        }
        return (
          <div
            key={identity.id}
            className={`grow shrink basis-0 self-stretch p-6 bg-background first:border-t-px first:rounded-t-xl last:rounded-b-xl theme-border border-t-0 flex-col justify-start items-start gap-5 inline-flex`}
          >
            <IdentityPosition
              variant={Identity.user}
              avatarSrc={getAtomImage(identity)}
              name={getAtomLabel(identity)}
              description={getAtomDescription(identity)}
              id={identity.user?.wallet ?? identity.identity_id}
              amount={identity.user?.total_points ?? 0}
              feesAccrued={0}
              link={getAtomLink(identity)}
              ipfsLink={getAtomIpfsLink(identity)}
            />
          </div>
        )
      })}
    </List>
  )
}
