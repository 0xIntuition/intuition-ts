import { Button, Icon, IconName } from '@0xintuition/1ui'
import { QuestStatus } from '@0xintuition/api'

interface QuestCardButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  questStatus: QuestStatus
  disabled?: boolean
}

const getStatusComponentData = (
  status: QuestStatus,
  disabled: boolean = false,
) => {
  if (disabled) {
    return {
      iconName: IconName.lock,
      text: 'Locked',
    }
  }
  switch (status) {
    case QuestStatus.NOT_STARTED:
      return {
        iconName: IconName.sparkle,
        text: 'Start Quest',
      }
    case QuestStatus.STARTED:
      return {
        iconName: IconName.sparkle,
        text: 'Continue Quest',
      }
    case QuestStatus.CLAIMABLE:
      return {
        iconName: IconName.sparkle,
        text: 'Continue Quest',
      }
    case QuestStatus.COMPLETED:
      return {
        iconName: IconName.circleCheck,
        text: 'Completed',
      }
    default:
      return {
        iconName: IconName.sparkle,
        text: 'Start Quest',
      }
  }
}

const QuestCardButton = ({
  questStatus,
  disabled = false,
  ...props
}: QuestCardButtonProps) => {
  const { iconName, text } = getStatusComponentData(questStatus, disabled)
  return (
    <Button variant="secondary" size="lg" disabled={disabled} {...props}>
      <Icon name={iconName} className="w-5 h-5" />
      {text}
    </Button>
  )
}

export { QuestCardButton }
