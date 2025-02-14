import React from 'react'

import { Text, TextVariant } from '@0xintuition/1ui'

import { motion } from 'framer-motion'

import { LevelProgress } from './level-progress'

interface Activity {
  name: string
  points: number
  disabled?: boolean
}

interface PointsEarnedCardProps {
  totalPoints: number
  activities: Activity[]
}

const PointsRow: React.FC<{
  name: string
  points: number
  totalPoints: number
  disabled?: boolean
}> = ({ name, points, disabled }) => {
  return (
    <motion.div
      className="flex flex-col gap-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center">
        <Text
          variant={TextVariant.body}
          className={disabled ? 'text-muted-foreground' : ''}
        >
          {name}
        </Text>
        <Text
          variant={TextVariant.body}
          className={disabled ? 'text-muted-foreground' : ''}
        >
          {points.toLocaleString()} IQ
        </Text>
      </div>
      {!disabled && <LevelProgress points={points} category={name} />}
    </motion.div>
  )
}

export const PointsEarnedCard: React.FC<PointsEarnedCardProps> = ({
  totalPoints,
  activities,
}) => {
  return (
    <div className="flex flex-col theme-border rounded-lg p-6 gap-6 bg-black">
      <div className="flex flex-col gap-6">
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
