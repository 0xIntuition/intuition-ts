import { ClaimPositionRow } from '@0xintuition/1ui'
import { PositionPresenter, PositionSortColumn } from '@0xintuition/api'

import { formatBalance } from '@lib/utils/misc'
import { BLOCK_EXPLORER_URL, PATHS } from 'app/consts'
import { PaginationType } from 'app/types/pagination'
import { formatUnits } from 'viem'

import { SortOption } from '../sort-select'
import { List } from './list'

export function PositionsOnClaim({
  positions,
  pagination,
}: {
  positions: PositionPresenter[]
  pagination: PaginationType
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
      {positions.map((position) => (
        <div
          key={position.id}
          className={`grow shrink basis-0 self-stretch p-6 bg-black first:rounded-t-xl last:rounded-b-xl border border-neutral-300/20 flex-col justify-start items-start gap-5 inline-flex`}
        >
          <ClaimPositionRow
            variant="user"
            avatarSrc={position.user?.image ?? ''}
            name={position.user?.display_name ?? ''}
            id={position.user?.wallet ?? ''}
            amount={+formatBalance(BigInt(position.assets), 18, 4)}
            position={
              position.direction === 'for' ? 'claimFor' : 'claimAgainst'
            }
            feesAccrued={Number(
              formatUnits(BigInt(+position.assets - +position.value), 18),
            )}
            updatedAt={position.updated_at}
            link={`${PATHS.PROFILE}/${position.user?.wallet}`}
            ipfsLink={`${BLOCK_EXPLORER_URL}/${position.user?.wallet}`}
          />
        </div>
      ))}
    </List>
  )
}
