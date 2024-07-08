import { FeesAccrued, IdentityTag, MonetaryValue, Text } from '@0xintuition/1ui'

import { formatBalance } from '@lib/utils/misc'

interface DataCreatedHeaderProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userIdentity: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userTotals: any
}

export const DataCreatedHeader: React.FC<DataCreatedHeaderProps> = ({
  userIdentity,
  userTotals,
}) => {
  const totalPositionValue = +formatBalance(
    userTotals?.total_position_value ?? '0',
    18,
    4,
  )
  const totalDelta = +formatBalance(userTotals?.total_delta ?? '0', 18, 4)
  const feesAccrued = totalDelta - totalPositionValue

  return (
    <div className="h-46 flex flex-col w-full gap-3">
      <div className="p-6 bg-black rounded-xl border border-neutral-300/20 flex flex-col gap-5">
        <div className="flex gap-1.5 items-center">
          <Text
            variant="caption"
            weight="regular"
            className="text-secondary-foreground"
          >
            Identities staked on by
          </Text>
          <IdentityTag
            imgSrc={userIdentity?.user?.image ?? userIdentity?.image}
            variant={userIdentity?.user ? 'user' : 'non-user'}
          >
            <span className="min-w-20 text-ellipsis">
              {userIdentity?.user?.display_name ?? userIdentity?.display_name}
            </span>
          </IdentityTag>
        </div>
        <div className="flex justify-between items-start">
          <div className="flex gap-10">
            <div className="flex flex-col items-start">
              <Text
                variant="caption"
                weight="regular"
                className="text-secondary-foreground"
              >
                Identities
              </Text>
              <div className="text-white text-xl font-medium">
                {userTotals?.total_positions ?? '0'}
              </div>
            </div>
            <div className="flex flex-col items-start">
              <Text
                variant="caption"
                weight="regular"
                className="text-secondary-foreground"
              >
                Total Staked
              </Text>
              <MonetaryValue value={totalPositionValue} currency="ETH" />
            </div>
          </div>
          <div className="flex flex-col items-end">
            <Text
              variant="caption"
              weight="regular"
              className="text-secondary-foreground"
            >
              Fees Accrued
            </Text>
            <FeesAccrued value={feesAccrued} currency="ETH" />
          </div>
        </div>
      </div>
    </div>
  )
}
