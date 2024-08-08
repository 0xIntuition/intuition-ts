import React from 'react'

import {
  PositionCard,
  PositionCardFeesAccrued,
  PositionCardLastUpdated,
  PositionCardOwnership,
  PositionCardStaked,
  Text,
  TextVariant,
} from '@0xintuition/1ui'
import { IdentityPresenter, QuestStatus } from '@0xintuition/api'

import { calculatePercentageOfTvl, formatBalance } from '@lib/utils/misc'
import { ClaimElementType, VaultDetailsType } from 'app/types'

import ActivityContainer from '../activity-container'
import { IdentityWithHoverable } from '../detail/identity-with-hoverable'

export interface StakeClaimActivityUnderlyingIdentitiesProps
  extends React.HTMLAttributes<HTMLDivElement> {
  status: QuestStatus
  identities?: Record<
    string,
    {
      vaultDetails: VaultDetailsType
      identity: IdentityPresenter
      type: ClaimElementType
    }
  >
  handleSellClick: (identity: IdentityPresenter) => void
}

export default function StakeClaimUnderlyingIdentitiesActivity({
  identities,
  status,
  handleSellClick,
  ...props
}: StakeClaimActivityUnderlyingIdentitiesProps) {
  return (
    <ActivityContainer status={status} {...props} className="pb-5">
      <div className="flex flex-col items-center gap-10 rounded-md p-5">
        {identities &&
          Object.values(identities).map((identity) => {
            return (
              <div
                className="flex flex-col items-start gap-2.5"
                key={`${identity.identity.id}-quest-stake`}
              >
                <Text
                  variant={TextVariant.body}
                  className="text-primary/60 capitalize"
                >
                  {identity.type}
                </Text>
                <PositionCardWrapper
                  vaultDetails={identity.vaultDetails}
                  identity={identity.identity}
                  handleSellClick={handleSellClick}
                />
              </div>
            )
          })}
      </div>
    </ActivityContainer>
  )
}

export const PositionCardWrapper = ({
  vaultDetails,
  identity,
  handleSellClick,
}: {
  vaultDetails: VaultDetailsType
  identity: IdentityPresenter
  handleSellClick: (identity: IdentityPresenter) => void
}) => {
  const { user_assets, assets_sum } = vaultDetails
  return (
    <>
      {vaultDetails && (
        <PositionCard onButtonClick={() => handleSellClick(identity)}>
          <div className="w-full col-span-2">
            <div className="w-fit">
              <IdentityWithHoverable identity={identity} />
            </div>
          </div>
          <PositionCardStaked
            amount={user_assets ? +formatBalance(user_assets, 18, 5) : 0}
          />
          <PositionCardOwnership
            percentOwnership={
              user_assets !== null && assets_sum
                ? +calculatePercentageOfTvl(user_assets ?? '0', assets_sum)
                : 0
            }
          />
          <PositionCardFeesAccrued amount={0} />
          <PositionCardLastUpdated timestamp={identity.updated_at} />
        </PositionCard>
      )}
    </>
  )
}
