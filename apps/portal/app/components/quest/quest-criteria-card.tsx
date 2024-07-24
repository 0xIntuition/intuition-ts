import * as React from 'react'

import { cn, Text } from '@0xintuition/1ui'
import { QuestStatus } from '@0xintuition/api'

import { QuestCriteriaDisplay } from './quest-criteria-display'
import { QuestPointsDisplay } from './quest-points-display'

export interface QuestCriteriaCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  criteria: string
  points: number
  questStatus: QuestStatus
}
const QuestCriteriaCard = ({
  criteria,
  points,
  questStatus,
  ...props
}: QuestCriteriaCardProps) => {
  return (
    <div className={cn('p-5 rounded-lg theme-border space-y-8')} {...props}>
      <div className="space-y-2.5">
        <Text
          variant="bodyLarge"
          weight="normal"
          className="text-foreground/70"
        >
          Tasks
        </Text>
        <div className="space-y-2">
          <QuestCriteriaDisplay criteria={criteria} status={questStatus} />
        </div>
      </div>
      <div className="space-y-2.5">
        <Text
          variant="bodyLarge"
          weight="normal"
          className="text-foreground/70"
        >
          Points
        </Text>
        <QuestPointsDisplay points={points} questStatus={questStatus} />
      </div>
    </div>
  )
}

export { QuestCriteriaCard }
