import { useEffect, useState } from 'react'

import { IdentityPosition, IdentityTag, Input } from '@0xintuition/1ui'
import { PositionPresenter, PositionSortColumn } from '@0xintuition/api'

import { PaginationComponent } from '@components/pagination-component'
import { useSearchAndSortParamsHandler } from '@lib/hooks/useSearchAndSortParams'
import logger from '@lib/utils/logger'
import { formatBalance } from '@lib/utils/misc'
import { useFetcher } from '@remix-run/react'
import { loader } from 'app/root'
import { InitialIdentityData } from 'types/identity'
import { formatUnits } from 'viem'

import { SortOption, SortSelect } from './sort-select'

export function PositionsOnIdentity({
  initialData,
}: {
  initialData: InitialIdentityData
}) {
  const { identity, pagination } = initialData
  const fetcher = useFetcher<typeof loader>()
  logger('fetcher', fetcher)
  const [positions, setPositions] = useState<PositionPresenter[]>(
    initialData.positions?.data ?? [],
  )

  useEffect(() => {
    if (fetcher.data) {
      logger('fetcher.data', fetcher.data)
      setPositions(fetcher.data.positions?.data as PositionPresenter[])
    }
  }, [fetcher.data])

  useEffect(() => {
    setPositions(initialData.positions?.data as PositionPresenter[])
  }, [initialData.positions])

  const options: SortOption<PositionSortColumn>[] = [
    { value: 'Updated At', sortBy: 'UpdatedAt' },
    { value: 'Total ETH', sortBy: 'Assets' },
  ]

  const { handleSortChange, handleSearchChange, onPageChange } =
    useSearchAndSortParamsHandler<PositionSortColumn>()

  return (
    <>
      <div className="h-[184px] flex-col justify-start items-start gap-3 flex w-full">
        <div className="self-stretch justify-between items-center inline-flex">
          <div className="grow shrink basis-0 text-white text-xl font-medium leading-[30px]">
            Positions on this Identity
          </div>
        </div>
        <div className="self-stretch justify-start items-start gap-4 inline-flex">
          <div className="grow shrink basis-0 self-stretch p-6 bg-black rounded-xl border border-neutral-300/20 flex-col justify-start items-start gap-5 inline-flex">
            <div className="self-stretch justify-start items-start gap-5 inline-flex">
              <div className="justify-start items-center gap-1.5 flex">
                <div className="text-white/60 text-sm font-normal leading-tight">
                  Positions staked on
                </div>
                <IdentityTag
                  imgSrc={identity?.user?.image ?? identity?.image}
                  variant={identity?.user ? 'user' : 'non-user'}
                >
                  <span className="min-w-20 text-ellipsis">
                    {identity?.user?.display_name ?? identity?.display_name}
                  </span>
                </IdentityTag>
              </div>
            </div>
            <div className="self-stretch justify-between items-start inline-flex">
              <div className="flex-col justify-start items-end inline-flex">
                <div className="self-stretch text-white/60 text-xs font-normal leading-[18px]">
                  Total stake
                </div>
                <div className="self-stretch text-white text-xl font-medium leading-[30px]">
                  {formatBalance(identity?.assets_sum ?? '0', 18, 4)} ETH
                </div>
              </div>
              <div className="flex-col justify-start items-end inline-flex">
                <div className="self-stretch text-right text-white/60 text-xs font-normal leading-[18px]">
                  Positions
                </div>
                <div className="self-stretch text-right text-white text-xl font-medium leading-[30px]">
                  {identity?.num_positions}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between w-full mt-6">
        <Input className="w-[196px]" onChange={handleSearchChange} />
        <SortSelect options={options} handleSortChange={handleSortChange} />
      </div>
      <div className="mt-6 flex flex-col w-full">
        {positions?.map((position) => (
          <div
            key={position.id}
            className={`grow shrink basis-0 self-stretch p-6 bg-black first:rounded-t-xl last:rounded-b-xl border border-neutral-300/20 flex-col justify-start items-start gap-5 inline-flex`}
          >
            <IdentityPosition
              variant="user"
              avatarSrc={position.user?.image ?? ''}
              name={position.user?.display_name ?? ''}
              walletAddress={position.user?.wallet ?? ''}
              amount={+formatBalance(BigInt(position.assets), 18, 4)}
              feesAccrued={Number(
                formatUnits(BigInt(+position.assets - +position.value), 18),
              )}
              updatedAt={position.updated_at}
            />
          </div>
        ))}
      </div>
      <PaginationComponent
        totalEntries={pagination.total ?? 0}
        currentPage={pagination.page ?? 0}
        totalPages={pagination.totalPages ?? 0}
        onPageChange={onPageChange}
        label="positions"
      />
    </>
  )
}
