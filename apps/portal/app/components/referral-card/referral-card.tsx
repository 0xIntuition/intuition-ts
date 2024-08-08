import React from 'react'

import {
  Icon,
  IconName,
  Separator,
  Text,
  TextVariant,
  TextWeight,
} from '@0xintuition/1ui'
import { InviteCodePresenter } from '@0xintuition/api'

import { ReferralPointsDisplay } from './referral-points-display'
import { ReferralRow } from './referral-row'

interface ReferralCardProps {
  points: number
  inviteCodes: InviteCodePresenter[]
}

export const ReferralCard: React.FC<ReferralCardProps> = ({
  points,
  inviteCodes,
}) => {
  return (
    <div className="flex flex-col theme-border rounded-lg p-8 gap-4 max-md:p-4">
      <div className="flex justify-between items-center max-md:flex-col max-md:gap-3">
        <div className="flex items-center gap-2">
          <Icon
            name={IconName.gift}
            className="h-6 w-6 text-primary max-sm:hidden"
          />
          <Text
            variant={TextVariant.bodyLarge}
            weight={TextWeight.medium}
            className="max-md:text-center"
          >
            Earn +1000 points each time a friend activates your invite code.
          </Text>
        </div>
        <ReferralPointsDisplay points={points} label="Referral Points" />
      </div>
      <Separator />
      <div className="flex flex-col gap-4">
        {inviteCodes.map((invite) => (
          <ReferralRow
            key={invite.invite_code}
            code={invite.invite_code}
            redeemed={invite.redeemed}
            redeemer={invite.redeemer}
          />
        ))}
      </div>
    </div>
  )
}
