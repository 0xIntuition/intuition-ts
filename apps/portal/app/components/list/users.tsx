import { IconName, Identity } from '@0xintuition/1ui'

import { IdentityPositionRow } from '@components/identity/identity-position-row'
import { ListHeader } from '@components/list/list-header'
import {
  getAtomDescription,
  getAtomImage,
  getAtomIpfsLink,
  getAtomLabel,
  getAtomLink,
} from '@lib/utils/misc'
import { Atom } from 'app/types'
import { PaginationType } from 'app/types/pagination'

import { SortOption } from '../sort-select'
import { List } from './list'

/**
 * Component for displaying a list of users with support for pagination and sorting
 */
interface UsersListProps {
  identities: Atom[]
  pagination?: PaginationType | { aggregate?: { count: number } } | number
  paramPrefix?: string
  enableHeader?: boolean
  enableSearch?: boolean
  enableSort?: boolean
  onPageChange?: (page: number) => void
  onLimitChange?: (limit: number) => void
}

export function UsersList({
  identities,
  pagination,
  paramPrefix,
  enableHeader = true,
  enableSearch = true,
  enableSort = true,
  onPageChange,
  onLimitChange,
}: UsersListProps) {
  // Using GraphQL field names directly for sorting
  const options: SortOption<string>[] = [
    { value: 'Total ETH', sortBy: 'vault.total_shares' },
    { value: 'Total Positions', sortBy: 'vault.position_count' },
    { value: 'Updated At', sortBy: 'block_timestamp' },
    { value: 'Created At', sortBy: 'block_timestamp' },
  ]

  // Convert pagination to the format expected by the List component
  const formattedPagination: PaginationType = (() => {
    if (typeof pagination === 'number') {
      return {
        currentPage: 1,
        limit: 10,
        totalEntries: pagination,
        totalPages: Math.ceil(pagination / 10),
      }
    }

    if (pagination && 'aggregate' in pagination) {
      const count = pagination.aggregate?.count ?? 0
      return {
        currentPage: 1,
        limit: 10,
        totalEntries: count,
        totalPages: Math.ceil(count / 10),
      }
    }

    return pagination as PaginationType
  })()

  return (
    <List<string>
      pagination={formattedPagination}
      paginationLabel="identities"
      options={options}
      paramPrefix={paramPrefix}
      enableSearch={enableSearch}
      enableSort={enableSort}
      onPageChange={onPageChange}
      onLimitChange={onLimitChange}
    >
      {enableHeader && (
        <ListHeader
          items={[
            { label: 'User', icon: IconName.fingerprint },
            { label: 'Total IQ Points', icon: IconName.rocket },
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
            className={`grow shrink basis-0 self-stretch bg-background first:border-t-px first:rounded-t-xl last:rounded-b-xl theme-border border-t-0 flex-col justify-start items-start gap-5 inline-flex`}
          >
            <IdentityPositionRow
              variant={Identity.user}
              avatarSrc={getAtomImage(identity)}
              name={getAtomLabel(identity)}
              description={getAtomDescription(identity)}
              id={String(identity.id)}
              amount={0} // Replace with the appropriate field from the new API
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
