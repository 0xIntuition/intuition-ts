import { ClaimPosition, IconName, Identity } from '@0xintuition/1ui'

import { ClaimPositionRow } from '@components/claim/claim-position-row'
import { ListHeader } from '@components/list/list-header'
import { SortOption } from '@components/sort-select'
import logger from '@lib/utils/logger'
import { formatBalance, getProfileUrl } from '@lib/utils/misc'
import { BLOCK_EXPLORER_URL } from 'app/consts'
import { PaginationType } from 'app/types/pagination'

import { List } from './list'

/**
 * Component for displaying a list of following/followers with support for pagination and sorting
 */
interface FollowerListProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  positions?: any[] // TODO: (ENG-4782) Fix once we have the correct types
  currentSharePrice?: string
  pagination?: PaginationType | { aggregate?: { count: number } } | number
  paramPrefix?: string
  enableHeader?: boolean
  enableSearch?: boolean
  enableSort?: boolean
  onPageChange?: (page: number) => void
  onLimitChange?: (limit: number) => void
}

export function FollowerList({
  positions,
  currentSharePrice,
  pagination,
  paramPrefix,
  enableHeader = true,
  enableSearch = true,
  enableSort = true,
  onPageChange,
  onLimitChange,
}: FollowerListProps) {
  // Using GraphQL field names directly for sorting
  const options: SortOption<string>[] = [
    { value: 'Position Amount', sortBy: 'shares', direction: 'desc' },
    { value: 'ID', sortBy: 'id', direction: 'desc' },
    { value: 'Account', sortBy: 'account_id', direction: 'desc' },
    { value: 'Vault ID', sortBy: 'vault_id', direction: 'desc' },
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

  logger('positions', positions)

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
            id={position.account?.id ?? position.object?.data ?? ''}
            amount={
              +formatBalance(
                (BigInt(position.shares) * BigInt(currentSharePrice ?? 0)) /
                  BigInt(10 ** 18),
                18,
              )
            }
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
            link={getProfileUrl(position.account?.id ?? position.object?.data)}
          />
        </div>
      ))}
    </List>
  )
}
