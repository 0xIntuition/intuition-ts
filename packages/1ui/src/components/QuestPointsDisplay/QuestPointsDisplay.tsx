import { Text } from 'components/Text'
import { cn } from 'styles'
import { QuestStatus, QuestStatusType } from 'types'

interface QuestPointsDisplayProps extends React.HTMLAttributes<HTMLDivElement> {
  points: number
  questStatus: QuestStatusType
}

const getStatusComponentData = (status: QuestStatusType) => {
  switch (status) {
    case QuestStatus.notStarted:
      return {
        statusClass: 'text-muted-foreground',
      }
    case QuestStatus.inProgress:
      return {
        statusClass: 'text-muted-foreground',
      }
    case QuestStatus.claimable:
      return {
        statusClass: 'text-foreground',
      }
    case QuestStatus.completed:
      return {
        statusClass: 'text-success',
      }
    case QuestStatus.disabled:
      return {
        statusClass: 'text-muted-foreground',
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
