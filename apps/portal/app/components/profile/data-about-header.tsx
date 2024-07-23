import React, { ReactNode } from 'react'

import { IdentityTag, Text } from '@0xintuition/1ui'
import { IdentityPresenter } from '@0xintuition/api'

export const DataAboutHeaderVariants = {
  positions: 'positions',
  claims: 'claims',
} as const

export type DataAboutHeaderVariantType =
  (typeof DataAboutHeaderVariants)[keyof typeof DataAboutHeaderVariants]

interface DataAboutHeaderProps {
  variant: DataAboutHeaderVariantType
  title: string
  userIdentity: IdentityPresenter
  totalClaims?: number | ReactNode
  totalPositions?: number | ReactNode
  totalStake: number | ReactNode
}

const DataAboutHeader: React.FC<DataAboutHeaderProps> = ({
  variant,
  title,
  userIdentity,
  totalClaims,
  totalPositions,
  totalStake,
}) => {
  return (
    <div className="flex flex-col w-full gap-3">
      <div className="flex justify-between items-center w-full">
        <Text
          variant="headline"
          weight="medium"
          className="theme-secondary-foreground"
        >
          {title}
        </Text>
      </div>
      <div className="flex flex-col gap-4 w-full p-6 bg-black rounded-xl border border-neutral-300/20">
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
            <span className="min-w-20 text-ellipsis">
              {userIdentity?.user?.display_name ?? userIdentity?.display_name}
            </span>
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
            <Text
              variant="headline"
              weight="medium"
              className="leading-[30px] items-center"
            >
              {totalStake}
            </Text>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DataAboutHeader
