import React from 'react'

import {
  IdentityTag,
  MonetaryValue,
  Text,
  TextVariant,
  TextWeight,
  Trunctacular,
} from '@0xintuition/1ui'
import { IdentityPresenter } from '@0xintuition/api'

export const DataAboutHeaderVariants = {
  positions: 'positions',
  claims: 'claims',
} as const

export type DataAboutHeaderVariantType =
  (typeof DataAboutHeaderVariants)[keyof typeof DataAboutHeaderVariants]

interface DataAboutHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  variant: DataAboutHeaderVariantType
  userIdentity: IdentityPresenter
  totalClaims?: number
  totalPositions?: number
  totalStake: number
}

const DataAboutHeader: React.FC<DataAboutHeaderProps> = ({
  variant,
  userIdentity,
  totalClaims,
  totalPositions,
  totalStake,
  ...props
}) => {
  return (
    <div
      className="flex flex-col gap-4 w-full p-6 bg-black rounded-xl theme-border max-md:items-center"
      {...props}
    >
      <div className="flex items-center gap-1.5">
        <Text
          variant="body"
          weight={TextWeight.medium}
          className="text-foreground/70"
        >
          {variant === 'claims' ? 'Claims about' : 'Conviction in'}
        </Text>
        <IdentityTag
          imgSrc={userIdentity?.user?.image ?? userIdentity?.image}
          variant={userIdentity?.user ? 'user' : 'non-user'}
        >
          <Trunctacular
            value={
              userIdentity?.user?.display_name ?? userIdentity?.display_name
            }
            maxStringLength={40}
          />
        </IdentityTag>
      </div>
      <div className="flex justify-between w-full">
        <div className="flex flex-col items-start max-md:items-center">
          <Text
            variant="caption"
            weight="regular"
            className="text-secondary-foreground"
          >
            {variant === 'claims' ? 'Claims' : 'Positions'}
          </Text>
          <Text
            variant="headline"
            weight="medium"
            className="leading-[30px] items-center"
          >
            {variant === 'claims' ? totalClaims ?? 0 : totalPositions ?? 0}
          </Text>
        </div>
        <div className="flex flex-col items-end  max-md:items-center">
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
      </div>
    </div>
  )
}

export default DataAboutHeader
