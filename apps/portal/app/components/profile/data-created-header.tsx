import { FeesAccrued, IdentityTag, MonetaryValue, Text } from '@0xintuition/1ui'
import { IdentityPresenter, UserTotalsPresenter } from '@0xintuition/api'

import { formatBalance } from '@lib/utils/misc'

export const DataCreatedHeaderVariants = {
  identities: 'identities',
  claims: 'claims',
} as const

export type DataCreatedHeaderVariantType =
  (typeof DataCreatedHeaderVariants)[keyof typeof DataCreatedHeaderVariants]

interface DataCreatedHeaderProps {
  variant: DataCreatedHeaderVariantType
  userIdentity: IdentityPresenter
  userTotals: UserTotalsPresenter
  totalStakeOnClaims?: number
  totalClaims?: number
  totalIdentities?: number
}

export const DataCreatedHeader: React.FC<DataCreatedHeaderProps> = ({
  variant,
  userIdentity,
  userTotals,
  totalStakeOnClaims,
  totalClaims,
  totalIdentities,
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
            {variant === 'identities' ? 'Identities' : 'Claims'} staked on by
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
                {variant === 'identities' ? 'Identities' : 'Claims'}
              </Text>
              <div className="text-white text-xl font-medium">
                {variant === 'identities' ? totalIdentities : totalClaims}
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
              <MonetaryValue
                value={
                  variant === 'identities'
                    ? totalPositionValue
                    : totalStakeOnClaims
                }
                currency="ETH"
              />
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
