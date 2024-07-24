import React, { ReactNode } from 'react'

import { IdentityTag, Text } from '@0xintuition/1ui'
import { IdentityPresenter } from '@0xintuition/api'

export const DataAboutHeaderVariants = {
  positions: 'positions',
  claims: 'claims',
} as const

export type DataAboutHeaderVariantType =
  (typeof DataAboutHeaderVariants)[keyof typeof DataAboutHeaderVariants]

interface DataAboutHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
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
  ...props
}) => {
  // TODO: Implement this once we figure out why MonetaryValue is not rendering currency type and we are able to add custom styling for the text
  // const renderTotalStake = () => {
  //   if (React.isValidElement(totalStake)) {
  //     return totalStake
  //   }
  //   if (typeof totalStake === 'number') {
  //     return <MonetaryValue value={totalStake} currency="ETH" className="text-xl font-medium leading-[30px] items-center" />
  //   }
  //   return (
  //     <Text
  //       variant="headline"
  //       weight="medium"
  //       className="leading-[30px] items-center"
  //     >
  //       {totalStake}
  //       {typeof totalStake !== 'undefined' && ' ETH'}
  //     </Text>
  //   )
  // }

  return (
    <div className="flex flex-col w-full gap-3" {...props}>
      <div className="flex justify-between items-center w-full">
        <Text
          variant="headline"
          weight="medium"
          className="theme-secondary-foreground mb-3"
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
            <Text variant="headline" weight="medium" className="items-end">
              {totalStake}
            </Text>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DataAboutHeader
