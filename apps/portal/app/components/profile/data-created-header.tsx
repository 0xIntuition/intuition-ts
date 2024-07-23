import React from 'react'

import { FeesAccrued, IdentityTag, MonetaryValue, Text } from '@0xintuition/1ui'
import { IdentityPresenter, UserTotalsPresenter } from '@0xintuition/api'

import { formatBalance } from '@lib/utils/misc'

export const DataCreatedHeaderVariants = {
  activeIdentities: 'activeIdentities',
  activeClaims: 'activeClaims',
  createdIdentities: 'createdIdentities',
  createdClaims: 'createdClaims',
} as const

export type DataCreatedHeaderVariantType =
  (typeof DataCreatedHeaderVariants)[keyof typeof DataCreatedHeaderVariants]

interface DataCreatedHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  variant: DataCreatedHeaderVariantType
  userIdentity: IdentityPresenter
  userTotals: UserTotalsPresenter
  totalStake: number | ReactNode
  totalResults: number | ReactNode
}

export const DataCreatedHeader: React.FC<DataCreatedHeaderProps> = ({
  variant,
  userIdentity,
  userTotals,
  totalStake,
  totalResults,
  ...props
}) => {
  const totalPositionValue = +formatBalance(
    userTotals?.total_position_value ?? '0',
    18,
    4,
  )
  const totalDelta = +formatBalance(userTotals?.total_delta ?? '0', 18, 4)
  const feesAccrued = totalDelta - totalPositionValue

  return (
    <div className="h-46 flex flex-col w-full gap-3" {...props}>
      <div className="p-6 bg-black rounded-xl border border-neutral-300/20 flex flex-col gap-5">
        <div className="flex gap-1.5 items-center">
          <Text
            variant="caption"
            weight="regular"
            className="text-secondary-foreground"
          >
            {variant === 'activeIdentities' || variant === 'createdIdentities'
              ? 'Identities'
              : 'Claims'}{' '}
            {variant === 'activeIdentities' || variant === 'activeClaims'
              ? 'staked on by'
              : 'created by'}
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
                {variant === 'activeIdentities' ||
                variant === 'createdIdentities'
                  ? 'Identities'
                  : 'Claims'}
              </Text>
              <div className="text-white text-xl font-medium">
                {totalResults}
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
              <Text variant="headline" weight="medium" className="items-end">
                {totalStake}
              </Text>
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
