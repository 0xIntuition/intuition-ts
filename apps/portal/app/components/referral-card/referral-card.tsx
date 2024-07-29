import React from 'react'

import { Icon, IconName, Text, TextVariant, TextWeight } from '@0xintuition/1ui'

import { ReferralPointsDisplay } from '@components/referral-card/referral-points-display'

import { ReferralRow } from './referral-row'

interface ReferralCardProps {
  points: number
  inviteCodes: Array<{
    code: string
    isActivated: boolean
    identity?: {
      id: string
      name: string
      avatarUrl: string
    }
  }>
}

export const ReferralCard: React.FC<ReferralCardProps> = ({
  points,
  inviteCodes,
}) => {
  return (
    <div className="bg-black theme-border rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex">
          <Icon
            name={IconName.gift}
            className="h-4 w-4 text-white fill-white"
          />
          <Text variant={TextVariant.bodyLarge} weight={TextWeight.medium}>
            Earn +1000 points each time a friend activates your invite code.
          </Text>
        </div>
        <ReferralPointsDisplay points={points} label="Referral Points" />
      </div>
      <div className="space-y-2">
        {inviteCodes.map((invite) => (
          <ReferralRow
            key={invite.code}
            code={invite.code}
            isActivated={invite.isActivated}
            identity={invite.identity}
          />
        ))}
      </div>
    </div>
  )
}
