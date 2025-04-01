import { IconName, Identity } from '@0xintuition/1ui'
import { GetPositionsQuery } from '@0xintuition/graphql'

import { IdentityPositionRow } from '@components/identity/identity-position-row'
import { ListHeader } from '@components/list/list-header'
import { BLOCK_EXPLORER_URL } from '@consts/general'
import { formatBalance, getProfileUrl } from '@lib/utils/misc'
import { PaginationType } from 'app/types/pagination'
import { formatUnits } from 'viem'

import { SortOption } from '../sort-select'
import { List } from './list'

type Position = NonNullable<GetPositionsQuery['positions']>[number]

interface ActivePositionsOnIdentitiesNewProps {
  identities: Position[]
  pagination: PaginationType | { aggregate?: { count: number } } | number
  readOnly?: boolean
  enableSearch?: boolean
  enableSort?: boolean
  onPageChange?: (page: number) => void
  onLimitChange?: (limit: number) => void
}

export function ActivePositionsOnIdentitiesNew({
  identities,
  pagination,
  readOnly = false,
  enableSearch = true,
  enableSort = true,
  onPageChange,
  onLimitChange,
}: ActivePositionsOnIdentitiesNewProps) {
  // Using GraphQL field names directly for sorting, only including fields that exist in positions_order_by
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
      paramPrefix="atomPositions"
      enableSearch={enableSearch}
      enableSort={enableSort}
      onPageChange={onPageChange}
      onLimitChange={onLimitChange}
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
            link={getProfileUrl(identity.account?.id, readOnly)}
            ipfsLink={`${BLOCK_EXPLORER_URL}/address/${identity.account?.id}`}
          />
        </div>
      ))}
    </List>
  )
}
