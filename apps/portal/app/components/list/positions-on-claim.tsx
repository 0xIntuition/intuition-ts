import { ClaimPosition, IconName } from '@0xintuition/1ui'
import { GetPositionsQuery } from '@0xintuition/graphql'

import { ClaimPositionRow } from '@components/claim/claim-position-row'
import { ListHeader } from '@components/list/list-header'
import logger from '@lib/utils/logger'
import { formatBalance, getProfileUrl } from '@lib/utils/misc'
import { BLOCK_EXPLORER_URL } from 'app/consts'
import { PaginationType } from 'app/types/pagination'
import { formatUnits } from 'viem'

import { SortOption } from '../sort-select'
import { List } from './list'

type Position = NonNullable<GetPositionsQuery['positions']>[number]

interface PositionsOnClaimNewProps {
  vaultPositions: Position[]
  counterVaultPositions: Position[]
  pagination: PaginationType | { aggregate?: { count: number } } | number
  readOnly?: boolean
  positionDirection?: string
  enableSearch?: boolean
  enableSort?: boolean
  onPageChange?: (page: number) => void
  onLimitChange?: (limit: number) => void
}

export function PositionsOnClaimNew({
  vaultPositions,
  counterVaultPositions,
  pagination,
  readOnly = false,
  positionDirection,
  enableSearch = true,
  enableSort = true,
  onPageChange,
  onLimitChange,
}: PositionsOnClaimNewProps) {
  // Using GraphQL field names directly for sorting
  const options: SortOption<string>[] = [
    { value: 'Position Amount', sortBy: 'shares' },
    { value: 'ID', sortBy: 'id' },
    { value: 'Account', sortBy: 'account_id' },
    { value: 'Vault ID', sortBy: 'vault_id' },
  ]

  logger('positions in PositionsOnClaim', {
    vaultPositions,
    counterVaultPositions,
  })

  // Leaving in case we need this for how we approach pagination
  // const paginationCount =
  //   positionDirection === 'for'
  //     ? typeof pagination === 'number'
  //       ? pagination
  //       : pagination?.aggregate?.count ?? 0
  //     : positionDirection === 'against'
  //       ? typeof pagination === 'number'
  //         ? pagination
  //         : pagination?.aggregate?.count ?? 0
  //       : typeof pagination === 'number'
  //         ? pagination
  //         : pagination?.aggregate?.count ?? 0

  // Combining and transforming positions
  const allPositions = [
    ...vaultPositions.map((p) => ({ ...p, direction: 'for' as const })),
    ...counterVaultPositions.map((p) => ({
      ...p,
      direction: 'against' as const,
    })),
  ].filter((position) => {
    if (positionDirection === 'for') {
      return position.direction === 'for'
    }
    if (positionDirection === 'against') {
      return position.direction === 'against'
    }
    return true
  })

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
      {allPositions.map((position) => (
        <div
          key={position.id}
          className={`grow shrink basis-0 self-stretch bg-black first:rounded-t-xl last:rounded-b-xl theme-border flex-col justify-start items-start gap-5 inline-flex`}
        >
          <ClaimPositionRow
            variant="user"
            avatarSrc={position.account?.image ?? ''}
            name={position.account?.label ?? ''}
            description={position.account?.label ?? ''}
            id={position.account?.id ?? ''}
            amount={+formatBalance(BigInt(position.shares), 18)}
            position={
              position.direction === 'for'
                ? ClaimPosition.claimFor
                : ClaimPosition.claimAgainst
            }
            feesAccrued={Number(
              formatUnits(
                // @ts-ignore // TODO: Fix this when we determine what the value should be
                BigInt(+position.shares - +(position.value ?? position.shares)),
                18,
              ),
            )}
            // updatedAt={position.updated_at} // TODO: Fix this when we have the updated_at

            link={getProfileUrl(position.account?.id, readOnly)}
            ipfsLink={`${BLOCK_EXPLORER_URL}/address/${position.account?.id}`}
          />
        </div>
      ))}
    </List>
  )
}
