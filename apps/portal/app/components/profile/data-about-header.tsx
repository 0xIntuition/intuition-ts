import React from 'react'

import {
  IdentityTag,
  MonetaryValue,
  Text,
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
      className="flex flex-col gap-4 w-full p-6 bg-black rounded-xl border border-neutral-300/20"
      {...props}
    >
      <div className="flex items-center gap-1.5">
        <Text
          variant="caption"
          weight="regular"
          className="text-secondary-foreground"
        >
          {variant === 'claims' ? 'Claims about' : 'Positions staked on'}
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
        <div className="flex flex-col items-end">
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
        <div className="flex flex-col items-end">
          <Text
            variant="caption"
            weight="regular"
            className="text-secondary-foreground"
          >
            Total stake {variant === 'claims' && 'across all Claims'}
          </Text>
          <MonetaryValue value={totalStake} currency="ETH" />
        </div>
      </div>
    </div>
  )
}

export default DataAboutHeader
