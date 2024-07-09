import React from 'react'

import { IdentityTag, MonetaryValue, Text } from '@0xintuition/1ui' // Adjust the import path as needed

interface DataAboutHeaderProps {
  title: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userIdentity: any
  totalClaims?: number
  totalStake: number
}

const DataAboutHeader: React.FC<DataAboutHeaderProps> = ({
  title,
  userIdentity,
  totalClaims,
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
            Claims about
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
              Claims
            </Text>
            <div className="text-white text-xl font-medium leading-[30px]">
              {totalClaims ?? 0}
            </div>
          </div>
          <div className="flex flex-col items-end">
            <Text
              variant="caption"
              weight="regular"
              className="text-secondary-foreground"
            >
              Total stake across all Claims
            </Text>
            <MonetaryValue value={totalStake} currency="ETH" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DataAboutHeader
