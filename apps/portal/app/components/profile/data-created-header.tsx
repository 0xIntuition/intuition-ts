import { FeesAccrued, IdentityTag, MonetaryValue } from '@0xintuition/1ui'

import { formatBalance } from '@lib/utils/misc'

interface DataCreatedHeaderProps {
  userIdentity: any
  userTotals: any
}

export const DataCreatedHeader: React.FC<DataCreatedHeaderProps> = ({
  userIdentity,
  userTotals,
}) => {
  console.log('userTotals', userTotals)

  const totalPositionValue = +formatBalance(
    userTotals?.total_position_value ?? '0',
    18,
    4,
  )
  const totalDelta = +formatBalance(userTotals?.total_delta ?? '0', 18, 4)
  const feesAccrued = totalDelta - totalPositionValue

  return (
    <div className="h-[184px] flex-col justify-start items-start gap-3 flex w-full">
      <div className="self-stretch justify-start items-start gap-4 inline-flex">
        <div className="grow shrink basis-0 self-stretch p-6 bg-black rounded-xl border border-neutral-300/20 flex-col justify-start items-start gap-5 inline-flex">
          <div className="self-stretch justify-start items-start gap-5 inline-flex">
            <div className="justify-start items-center gap-1.5 flex">
              <div className="text-white/60 text-sm font-normal leading-tight">
                Identities staked on by
              </div>
              <IdentityTag
                imgSrc={userIdentity?.user?.image ?? userIdentity?.image}
                variant={userIdentity?.user ? 'user' : 'non-user'}
              >
                <span className="min-w-20 text-ellipsis">
                  {userIdentity?.user?.display_name ??
                    userIdentity?.display_name}
                </span>
              </IdentityTag>
            </div>
          </div>
          <div className="self-stretch justify-between items-start inline-flex">
            <div className="flex-col justify-start items-end inline-flex">
              <div className="self-stretch text-white/60 text-xs font-normal leading-[18px]">
                Identities
              </div>
              <div className="self-stretch text-white text-xl font-medium leading-[30px]">
                {userTotals?.total_positions ?? '0'}
              </div>
            </div>
            <div className="flex-col justify-start items-end inline-flex">
              <div className="self-stretch text-white/60 text-xs font-normal leading-[18px]">
                Total Staked
              </div>
              <MonetaryValue value={totalPositionValue} currency="ETH" />
            </div>
            <div className="flex-col justify-start items-end inline-flex">
              <div className="self-stretch text-right text-white/60 text-xs font-normal leading-[18px]">
                Fees Accrued
              </div>
              <FeesAccrued value={feesAccrued} currency="ETH" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
