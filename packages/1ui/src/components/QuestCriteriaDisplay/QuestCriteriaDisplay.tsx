import { Icon, IconName } from 'components/Icon'
import { Text } from 'components/Text'
import { cn } from 'styles'
import {
  QuestCriteriaStatus,
  QuestCriteriaStatusType,
  QuestCriteriaType,
} from 'types'

interface QuestCriteriaDisplayProps
  extends React.HTMLAttributes<HTMLDivElement>,
    QuestCriteriaType {}

const getStatusComponentData = (status: QuestCriteriaStatusType) => {
  switch (status) {
    case QuestCriteriaStatus.notStarted:
      return {
        iconName: IconName.circle,
        iconClass: 'text-muted-foreground',
        criteriaClass: 'text-foreground/70',
      }
    case QuestCriteriaStatus.partiallyFulfilled:
      return {
        iconName: IconName.circle,
        iconClass: 'text-warning',
        criteriaClass: 'text-warning',
      }
    case QuestCriteriaStatus.fulfilled:
      return {
        iconName: IconName.circleCheckFilled,
        iconClass: 'text-success',
        criteriaClass: 'text-success',
      }
    default:
      return {
        iconName: IconName.circle,
        iconClass: 'text-muted-foreground',
        criteriaClass: 'text-muted-foreground',
      }
  }
}

const QuestCriteriaDisplay = ({
  criteria,
  status,
}: QuestCriteriaDisplayProps) => {
  const { iconName, iconClass, criteriaClass } = getStatusComponentData(status)
  return (
    <Text
      variant="body"
      weight="medium"
      className={cn(criteriaClass, 'flex items-center gap-2')}
    >
      <Icon name={iconName} className={cn('w-4 h-4', iconClass)} />
      {criteria}
    </Text>
  )
}

export { QuestCriteriaDisplay }
