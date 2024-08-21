import React from 'react'

import { Text, TextVariant } from '@0xintuition/1ui'

import { truncateNumber } from '@lib/utils/misc'

interface PointsEarnedCardProps {
  totalPoints: number
  activities: Array<{
    name: string
    points: number
    disabled?: boolean
  }>
}

const PointsRow: React.FC<{
  name: string
  points: number
  totalPoints: number
  disabled?: boolean
}> = ({ name, points, totalPoints, disabled = false }) => {
  return (
    <div className={`grid grid-cols-[2fr,5fr,1fr] items-center gap-2`}>
      <Text
        variant={TextVariant.body}
        className={`${disabled && 'text-primary/40'}`}
      >
        {name}
      </Text>
      <div className="h-[6px] w-full bg-muted rounded-sm">
        <div
          className="h-full bg-primary rounded-sm"
          style={{
            width: `${totalPoints === 0 ? 0 : (points / totalPoints) * 100}%`,
          }}
        />
      </div>
      <Text
        variant={TextVariant.body}
        className={`text-right ${disabled && 'text-primary/40'}`}
      >
        {truncateNumber(points)}
      </Text>
    </div>
  )
}

export const PointsEarnedCard: React.FC<PointsEarnedCardProps> = ({
  totalPoints,
  activities,
}) => {
  return (
    <div className="flex flex-col theme-border rounded-lg p-6 gap-4 bg-black">
      <div className="flex flex-col gap-1">
        <Text variant={TextVariant.body} className="text-muted-foreground">
          IQ Points Earned
        </Text>
        <Text variant={TextVariant.heading5} className="text-white">
          {truncateNumber(totalPoints)}
        </Text>
      </div>
      <div className="flex flex-col gap-4">
        {activities.map((activity) => (
          <PointsRow
            key={activity.name}
            name={activity.name}
            points={activity.points}
            totalPoints={totalPoints}
            disabled={activity.disabled}
          />
        ))}
      </div>
    </div>
  )
}
