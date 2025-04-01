import { ClaimPosition, IconName, Identity } from '@0xintuition/1ui'

import { ClaimPositionRow } from '@components/claim/claim-position-row'
import { ListHeader } from '@components/list/list-header'
import { SortOption } from '@components/sort-select'
import logger from '@lib/utils/logger'
import { formatBalance, getProfileUrl } from '@lib/utils/misc'
import { BLOCK_EXPLORER_URL } from 'app/consts'
import { Triple } from 'app/types'
import { PaginationType } from 'app/types/pagination'

import { List } from './list'

/**
 * Component for displaying a list of following/followers with support for pagination and sorting
 */
interface FollowListProps {
  triples?: Triple[]
  currentSharePrice?: string
  pagination?: PaginationType | { aggregate?: { count: number } } | number
  paramPrefix?: string
  enableHeader?: boolean
  enableSearch?: boolean
  enableSort?: boolean
  onPageChange?: (page: number) => void
  onLimitChange?: (limit: number) => void
}

export function FollowingList({
  triples,
  pagination,
  paramPrefix,
  enableHeader = true,
  enableSearch = true,
  enableSort = true,
  onPageChange,
  onLimitChange,
}: FollowListProps) {
  // Using GraphQL field names directly for sorting
  const options: SortOption<string>[] = [
    { value: 'Position Amount', sortBy: 'shares', direction: 'desc' },
    { value: 'ID', sortBy: 'id', direction: 'desc' },
    { value: 'Subject ID', sortBy: 'subject_id', direction: 'desc' },
    { value: 'Predicate ID', sortBy: 'predicate_id', direction: 'desc' },
    { value: 'Object ID', sortBy: 'object_id', direction: 'desc' },
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

  logger('triples', triples)

  return (
    <List<string>
      pagination={formattedPagination}
      paginationLabel="users"
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
            { label: 'User', icon: IconName.cryptoPunk },
            { label: 'Position Amount', icon: IconName.ethereum },
          ]}
        />
      )}
      {triples?.map((triple) => (
        <div
          key={triple.id}
          className="grow shrink basis-0 self-stretch bg-black first:rounded-t-xl last:rounded-b-xl theme-border flex-col justify-start items-start gap-5 inline-flex"
        >
          <ClaimPositionRow
            variant={Identity.user}
            position={ClaimPosition.claimFor}
            avatarSrc={triple.object?.image ?? ''}
            name={triple.object?.label ?? ''}
            description={''}
            id={triple.id.toString() ?? ''}
            amount={
              +formatBalance(
                (BigInt(triple.vault?.positions?.[0]?.shares ?? 0) *
                  BigInt(triple.vault?.current_share_price ?? 0)) /
                  BigInt(10 ** 18),
                18,
              )
            }
            feesAccrued={0} // TODO: Figure out fee accrual and position deltas with backend
            updatedAt={triple.block_timestamp?.toString() ?? ''}
            ipfsLink={`${BLOCK_EXPLORER_URL}/address/${triple.object?.wallet_id}`}
            link={getProfileUrl(triple.object?.wallet_id)}
          />
        </div>
      ))}
    </List>
  )
}
