import React from 'react'

import { Text } from '@0xintuition/1ui'

interface ReferralPointsDisplayProps {
  points: number
  label: string
}

export const ReferralPointsDisplay: React.FC<ReferralPointsDisplayProps> = ({
  points,
  label,
}) => {
  return (
    <div className="flex flex-col items-end">
      <Text variant="caption" className="text-muted-foreground">
        {label}
      </Text>
      <Text variant="bodyLarge" className="text-primary">
        {points.toLocaleString()}
      </Text>
    </div>
  )
}
