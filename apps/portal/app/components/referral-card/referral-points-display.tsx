import React from 'react'

import { Text, TextVariant, TextWeight } from '@0xintuition/1ui'

import { truncateNumber } from '@lib/utils/misc'

interface ReferralPointsDisplayProps {
  points: number
  label: string
}

export const ReferralPointsDisplay: React.FC<ReferralPointsDisplayProps> = ({
  points,
  label,
}) => {
  return (
    <div className="flex flex-col items-end max-md:items-center">
      <Text variant={TextVariant.caption} className="text-muted-foreground">
        {label}
      </Text>
      <Text variant={TextVariant.heading5} weight={TextWeight.bold}>
        {truncateNumber(points)}
      </Text>
    </div>
  )
}
