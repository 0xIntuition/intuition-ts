import * as React from 'react'

import { cn, Text } from '@0xintuition/1ui'
import { QuestStatus } from '@0xintuition/api'

interface QuestPointsDisplayProps extends React.HTMLAttributes<HTMLDivElement> {
  points: number
  questStatus: QuestStatus
}

const getStatusComponentData = (status: QuestStatus) => {
  const isCompleted = status === QuestStatus.COMPLETED
  return {
    statusClass: isCompleted ? 'text-success' : 'text-muted-foreground',
  }
}

const QuestPointsDisplay = ({
  points,
  questStatus,
}: QuestPointsDisplayProps) => {
  const { statusClass } = getStatusComponentData(questStatus)

  return (
    <Text variant="body" weight="normal" className={cn(statusClass)}>
      {`${points > 0 ? '+' : ''}${points} IQ Points`}
    </Text>
  )
}

export { QuestPointsDisplay }
