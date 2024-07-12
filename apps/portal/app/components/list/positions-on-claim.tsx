import { ClaimPositionRow } from '@0xintuition/1ui'
import { PositionPresenter, SortColumn } from '@0xintuition/api'

import { formatBalance } from '@lib/utils/misc'
import { useNavigate } from '@remix-run/react'
import { PaginationType } from 'types/pagination'
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
  const navigate = useNavigate()
  const options: SortOption<SortColumn>[] = [
    { value: 'Position Amount', sortBy: 'UserAssets' },
    { value: 'Total ETH', sortBy: 'AssetsSum' },
    { value: 'Updated At', sortBy: 'UpdatedAt' },
    { value: 'Created At', sortBy: 'CreatedAt' },
  ]

  return (
    <List<SortColumn>
      pagination={pagination}
      paginationLabel="positions"
      options={options}
      paramPrefix="claims"
    >
      {positions?.map((position) => (
        <div
          key={position.id}
          className={`grow shrink basis-0 self-stretch p-6 bg-black first:rounded-t-xl last:rounded-b-xl border border-neutral-300/20 flex-col justify-start items-start gap-5 inline-flex`}
        >
          <ClaimPositionRow
            variant="user"
            avatarSrc={position.user?.image ?? ''}
            name={position.user?.display_name ?? ''}
            walletAddress={position.user?.wallet ?? ''}
            amount={+formatBalance(BigInt(position.assets), 18, 4)}
            position={
              position.direction === 'for' ? 'claimFor' : 'claimAgainst'
            }
            feesAccrued={Number(
              formatUnits(BigInt(+position.assets - +position.value), 18),
            )}
            updatedAt={position.updated_at}
            onClick={() => {
              navigate(`/app/profile/${position.user?.wallet}`)
            }}
            className="hover:cursor-pointer"
          />
        </div>
      ))}
    </List>
  )
}
