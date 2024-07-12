import * as React from 'react'

import { QuestCriteriaDisplay } from 'components/QuestCriteriaDisplay'
import { QuestPointsDisplay } from 'components/QuestPointsDisplay'
import { Text } from 'components/Text'
import { cn } from 'styles'
import { QuestCriteriaType, QuestStatusType } from 'types'

export interface QuestCriteriaCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  criteria: QuestCriteriaType
  points: number
  questStatus: QuestStatusType
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
          <QuestCriteriaDisplay {...criteria} />
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
