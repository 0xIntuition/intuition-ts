import React from 'react'

import {
  IdentityTag,
  MonetaryValue,
  Text,
  TextVariant,
  TextWeight,
} from '@0xintuition/1ui'
import { IdentityPresenter, UserTotalsPresenter } from '@0xintuition/api'

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
  totalStake: number
  totalResults: number
}

export const DataCreatedHeader: React.FC<DataCreatedHeaderProps> = ({
  variant,
  userIdentity,
  totalStake,
  totalResults,
  ...props
}) => {
  // const totalPositionValue = +formatBalance(
  //   userTotals?.total_position_value ?? '0',
  //   18,
  //   4,
  // )
  // const totalDelta = +formatBalance(userTotals?.total_delta ?? '0', 18)
  // const feesAccrued = totalDelta - totalPositionValue

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
            {userIdentity?.user?.display_name ?? userIdentity?.display_name}
          </IdentityTag>
        </div>
        <div className="flex justify-between items-start max-sm:gap-5 max-sm:justify-center">
          <div className="flex gap-10 max-sm:gap-5">
            <div className="flex flex-col items-start max-sm:items-center">
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
              <Text variant={TextVariant.headline} weight={TextWeight.medium}>
                {totalResults}
              </Text>
            </div>
          </div>
          <div className="flex flex-col items-end max-sm:items-center">
            <Text
              variant="caption"
              weight="regular"
              className="text-secondary-foreground"
            >
              TVL
            </Text>
            <MonetaryValue
              value={totalStake}
              currency="ETH"
              textVariant={TextVariant.headline}
            />
          </div>
          {/* <div className="flex flex-col items-end max-sm:items-center">
            <Text
              variant="caption"
              weight="regular"
              className="text-secondary-foreground"
            >
              Fees Accrued
            </Text>
            <FeesAccrued value={feesAccrued} currency="ETH" />
          </div> */}
        </div>
      </div>
    </div>
  )
}
