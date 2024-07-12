import { Button, Icon, IconName } from 'components'
import { QuestStatus, QuestStatusType } from 'types'

interface QuestCardButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  questStatus: QuestStatusType
}

const getStatusComponentData = (status: QuestStatusType) => {
  switch (status) {
    case QuestStatus.notStarted:
      return {
        iconName: IconName.sparkle,
        text: 'Start Quest',
      }
    case QuestStatus.inProgress:
      return {
        iconName: IconName.sparkle,
        text: 'Continue Quest',
      }
    case QuestStatus.claimable:
      return {
        iconName: IconName.sparkle,
        text: 'Continue Quest',
      }
    case QuestStatus.completed:
      return {
        iconName: IconName.circleCheck,
        text: 'Completed',
      }
    case QuestStatus.disabled:
      return {
        iconName: IconName.lock,
        text: 'Locked',
      }
    default:
      return {
        iconName: IconName.sparkle,
        text: 'Start Quest',
      }
  }
}

const QuestCardButton = ({ questStatus }: QuestCardButtonProps) => {
  const { iconName, text } = getStatusComponentData(questStatus)
  return (
    <Button
      variant="secondary"
      size="lg"
      disabled={questStatus === QuestStatus.disabled}
    >
      <Icon name={iconName} className="w-5 h-5" />
      {text}
    </Button>
  )
}

export { QuestCardButton }
