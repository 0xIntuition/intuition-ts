import { cn, Icon, IconName, Text } from '@0xintuition/1ui'
import { QuestStatus } from '@0xintuition/api'

interface QuestCriteriaDisplayProps
  extends React.HTMLAttributes<HTMLDivElement> {
  criteria: string
  status: QuestStatus
}

const getStatusComponentData = (status: QuestStatus) => {
  switch (status) {
    case QuestStatus.NOT_STARTED:
      return {
        iconName: IconName.circle,
        iconClass: 'text-muted-foreground',
        criteriaClass: 'text-foreground/70',
      }
    case QuestStatus.STARTED:
      return {
        iconName: IconName.circle,
        iconClass: 'text-warning',
        criteriaClass: 'text-warning',
      }
    case QuestStatus.CLAIMABLE:
      return {
        iconName: IconName.circleCheckFilled,
        iconClass: 'text-success',
        criteriaClass: 'text-success',
      }
    case QuestStatus.CLAIMABLE:
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
