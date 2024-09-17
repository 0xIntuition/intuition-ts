import { IconName } from '@0xintuition/1ui'
import { PositionPresenter, PositionSortColumn } from '@0xintuition/api'

import { ClaimPositionRow } from '@components/claim/claim-position-row'
import { ListHeader } from '@components/list/list-header'
import { formatBalance, getProfileUrl } from '@lib/utils/misc'
import { BLOCK_EXPLORER_URL } from 'app/consts'
import { PaginationType } from 'app/types/pagination'
import { formatUnits } from 'viem'

import { SortOption } from '../sort-select'
import { List } from './list'

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
              position.direction === 'for' ? 'claimFor' : 'claimAgainst'
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
