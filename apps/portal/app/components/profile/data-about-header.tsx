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
    <div className="h-[184px] flex-col justify-start items-start gap-3 flex w-full">
      <div className="self-stretch justify-between items-center inline-flex">
        <Text
          variant="headline"
          weight="medium"
          className="theme-secondary-foreground"
        >
          {title}
        </Text>
      </div>
      <div className="self-stretch justify-start items-start gap-4 inline-flex">
        <div className="grow shrink basis-0 self-stretch p-6 bg-black rounded-xl border border-neutral-300/20 flex-col justify-start items-start gap-5 inline-flex">
          <div className="self-stretch justify-start items-start gap-5 inline-flex">
            <div className="justify-start items-center gap-1.5 flex">
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
                  {userIdentity?.user?.display_name ??
                    userIdentity?.display_name}
                </span>
              </IdentityTag>
            </div>
          </div>
          <div className="self-stretch justify-between items-start inline-flex">
            <div className="flex-col justify-start items-end inline-flex">
              <Text
                variant="caption"
                weight="regular"
                className="text-secondary-foreground"
              >
                Claims
              </Text>
              <div className="self-stretch text-white text-xl font-medium leading-[30px]">
                {totalClaims ?? 0}
              </div>
            </div>
            <div className="flex-col justify-start items-end inline-flex">
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
    </div>
  )
}

export default DataAboutHeader
