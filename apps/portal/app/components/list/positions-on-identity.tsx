import { IconName, Identity } from '@0xintuition/1ui'
import { GetPositionsQuery } from '@0xintuition/graphql'

import { IdentityPositionRow } from '@components/identity/identity-position-row'
import { ListHeader } from '@components/list/list-header'
import { formatBalance, getProfileUrl } from '@lib/utils/misc'
import { BLOCK_EXPLORER_URL } from 'app/consts'
import { PaginationType } from 'app/types/pagination'
import { formatUnits } from 'viem'

import { SortOption } from '../sort-select'
import { List } from './list'

type Position = NonNullable<GetPositionsQuery['positions']>[number]

interface PositionsOnIdentityNewProps {
  positions: Position[]
  pagination: PaginationType | { aggregate?: { count: number } } | number
  readOnly?: boolean
  enableSearch?: boolean
  enableSort?: boolean
  onPageChange?: (page: number) => void
  onLimitChange?: (limit: number) => void
}

export function PositionsOnIdentityNew({
  positions,
  pagination,
  readOnly = false,
  enableSearch = true,
  enableSort = true,
  onPageChange,
  onLimitChange,
}: PositionsOnIdentityNewProps) {
  // Using GraphQL field names directly for sorting
  const options: SortOption<string>[] = [
    { value: 'Position Amount', sortBy: 'shares' },
    { value: 'ID', sortBy: 'id' },
    { value: 'Account', sortBy: 'account_id' },
    { value: 'Vault ID', sortBy: 'vault_id' },
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

    if ('aggregate' in pagination) {
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
      paginationLabel="positions"
      options={options}
      enableSearch={enableSearch}
      enableSort={enableSort}
      onPageChange={onPageChange}
      onLimitChange={onLimitChange}
    >
      <ListHeader
        items={[
          { label: 'User', icon: IconName.cryptoPunk },
          { label: 'Position Amount', icon: IconName.ethereum },
        ]}
      />
      {positions?.map((position) => (
        <div
          key={position.id}
          className={`grow shrink basis-0 self-stretch bg-black first:rounded-t-xl last:rounded-b-xl theme-border flex-col justify-start items-start gap-5 inline-flex`}
        >
          <IdentityPositionRow
            variant={Identity.user}
            avatarSrc={position.account?.image ?? ''}
            name={position.account?.label ?? ''}
            description={position.account?.label ?? ''} // TODO: Fix this when we have the description
            id={position.account?.id ?? ''}
            amount={+formatBalance(BigInt(position.shares || '0'), 18)}
            feesAccrued={Number(
              formatUnits(
                // @ts-ignore // TODO: Fix this when we determine what the value should be
                BigInt(+position.shares - +(position.value ?? position.shares)),
                18,
              ),
            )}
            link={getProfileUrl(position.account?.id, readOnly)}
            ipfsLink={`${BLOCK_EXPLORER_URL}/address/${position.account?.id}`}
          />
        </div>
      ))}
    </List>
  )
}
