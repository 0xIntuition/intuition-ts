import { Button, Icon, IconName } from '@0xintuition/1ui'
import { QuestStatus } from '@0xintuition/api'

interface QuestCardButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  questStatus: QuestStatus
  disabled?: boolean
  buttonText?: string
}

const getStatusComponentData = (
  status: QuestStatus,
  disabled: boolean = false,
  buttonText?: string,
) => {
  if (buttonText) {
    return {
      iconName:
        status === QuestStatus.COMPLETED
          ? IconName.circleCheck
          : IconName.sparkle,
      text: buttonText,
    }
  }

  if (disabled) {
    return {
      iconName: IconName.lock,
      text: 'Locked',
    }
  }

  const isCompleted = status === QuestStatus.COMPLETED
  return {
    iconName: isCompleted ? IconName.circleCheck : IconName.sparkle,
    text: isCompleted ? 'Completed' : 'Start Quest',
  }
}

const QuestCardButton = ({
  questStatus,
  disabled = false,
  buttonText,
  ...props
}: QuestCardButtonProps) => {
  const { iconName, text } = getStatusComponentData(
    questStatus,
    disabled,
    buttonText,
  )
  return (
    <Button variant="secondary" size="lg" disabled={disabled} {...props}>
      <Icon name={iconName} className="w-5 h-5" />
      {text}
    </Button>
  )
}

export { QuestCardButton }
