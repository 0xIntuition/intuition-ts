import { ClaimPosition, IconName } from '@0xintuition/1ui'
import { PositionPresenter, PositionSortColumn } from '@0xintuition/api'
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

export function PositionsOnClaimNew({
  vaultPositions,
  counterVaultPositions,
  readOnly = false,
  positionDirection,
}: {
  vaultPositions: Position[]
  counterVaultPositions: Position[]
  pagination: { aggregate?: { count: number } } | number
  readOnly?: boolean
  positionDirection?: string
}) {
  const options: SortOption<PositionSortColumn>[] = [
    { value: 'Amount', sortBy: PositionSortColumn.ASSETS },
    { value: 'Updated At', sortBy: PositionSortColumn.UPDATED_AT },
    { value: 'Created At', sortBy: PositionSortColumn.CREATED_AT },
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

  // Combining and transforming positions -- we can see if there is a better/different way to do this, but the issue is previously these were combined and now they're split so we need to recombine for the tabs UI
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

  return (
    <List<PositionSortColumn>
      pagination={{
        currentPage: 1,
        limit: 10,
        totalEntries: allPositions.length,
        totalPages: Math.ceil(allPositions.length / 10),
      }}
      paginationLabel="positions"
      options={options}
      paramPrefix="positions"
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

// Legacy component -- will be removed after migration
export function PositionsOnClaim({
  positions,
  pagination,
  readOnly = false,
}: {
  positions: PositionPresenter[]
  pagination: PaginationType
  readOnly?: boolean
}) {
  const options: SortOption<PositionSortColumn>[] = [
    { value: 'Amount', sortBy: PositionSortColumn.ASSETS },
    { value: 'Updated At', sortBy: PositionSortColumn.UPDATED_AT },
    { value: 'Created At', sortBy: PositionSortColumn.CREATED_AT },
  ]

  return (
    <List<PositionSortColumn>
      pagination={pagination}
      paginationLabel="positions"
      options={options}
      paramPrefix="positions"
    >
      <ListHeader
        items={[
          { label: 'User', icon: IconName.cryptoPunk },
          { label: 'Position Amount', icon: IconName.ethereum },
        ]}
      />
      {positions.map((position) => (
        <div
          key={position.id}
          className={`grow shrink basis-0 self-stretch bg-black first:rounded-t-xl last:rounded-b-xl theme-border flex-col justify-start items-start gap-5 inline-flex`}
        >
          <ClaimPositionRow
            variant="user"
            avatarSrc={position.user?.image ?? ''}
            name={position.user?.display_name ?? ''}
            description={position.user?.description ?? ''}
            id={position.user?.wallet ?? ''}
            amount={+formatBalance(BigInt(position.assets), 18)}
            position={
              position.direction === 'for'
                ? ClaimPosition.claimFor
                : ClaimPosition.claimAgainst
            }
            feesAccrued={Number(
              formatUnits(BigInt(+position.assets - +position.value), 18),
            )}
            updatedAt={position.updated_at}
            link={getProfileUrl(position.user?.wallet, readOnly)}
            ipfsLink={`${BLOCK_EXPLORER_URL}/address/${position.user?.wallet}`}
          />
        </div>
      ))}
    </List>
  )
}
