import React from 'react'

import {
  Icon,
  IconName,
  Separator,
  Text,
  TextVariant,
  TextWeight,
} from '@0xintuition/1ui'

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
    <div className="flex flex-col bg-black theme-border rounded-lg p-8 gap-4">
      <div className="flex justify-between items-center">
        <div className="flex">
          <Icon name={IconName.gift} className="h-4 w-4 text-white" />
          <Text variant={TextVariant.bodyLarge} weight={TextWeight.medium}>
            Earn +1000 points each time a friend activates your invite code.
          </Text>
        </div>
        <ReferralPointsDisplay points={points} label="Referral Points" />
      </div>
      <Separator />
      <div className="flex flex-col p-4 gap-4">
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
