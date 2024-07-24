import * as React from 'react'

import { cn, Text } from '@0xintuition/1ui'
import { QuestStatus } from '@0xintuition/api'

interface QuestPointsDisplayProps extends React.HTMLAttributes<HTMLDivElement> {
  points: number
  questStatus: QuestStatus
}

const getStatusComponentData = (status: QuestStatus) => {
  switch (status) {
    case QuestStatus.NOT_STARTED:
      return {
        statusClass: 'text-muted-foreground',
      }
    case QuestStatus.STARTED:
      return {
        statusClass: 'text-muted-foreground',
      }
    case QuestStatus.CLAIMABLE:
      return {
        statusClass: 'text-foreground',
      }
    case QuestStatus.COMPLETED:
      return {
        statusClass: 'text-success',
      }
    default:
      return {
        statusClass: 'text-muted-foreground',
      }
  }
}

const QuestPointsDisplay = ({
  points,
  questStatus,
}: QuestPointsDisplayProps) => {
  const { statusClass } = getStatusComponentData(questStatus)

  return (
    <Text variant="body" weight="normal" className={cn(statusClass)}>
      {`${points > 0 ? '+' : ''}${points} Points`}
    </Text>
  )
}

export { QuestPointsDisplay }
