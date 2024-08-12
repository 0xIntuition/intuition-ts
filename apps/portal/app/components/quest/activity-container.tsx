import { cn, Icon, IconName } from '@0xintuition/1ui'
import { QuestStatus } from '@0xintuition/api'

const getCreateActivityComponentData = (status: QuestStatus) => {
  switch (status) {
    case QuestStatus.NOT_STARTED:
      return {
        iconName: IconName.awaitAction,
        iconClass: 'text-muted-foreground',
        containerClass: 'bg-primary/5 theme-border',
      }
    case QuestStatus.STARTED:
      return {
        iconName: IconName.awaitAction,
        iconClass: 'text-muted-foreground',
        containerClass: 'bg-primary/5 border border-accent/20 border-dashed',
      }
    case QuestStatus.CLAIMABLE:
      return {
        iconName: IconName.circleCheckFilled,
        iconClass: 'text-success',
        containerClass: 'bg-primary/5 border border-success border-solid',
      }
    case QuestStatus.COMPLETED:
      return {
        iconName: IconName.circleCheckFilled,
        iconClass: 'text-success',
        containerClass: 'bg-primary/5 border border-success border-solid',
      }
    default:
      return {
        iconName: IconName.awaitAction,
        iconClass: 'text-muted-foreground',
        containerClass: 'bg-primary/5 theme-border',
      }
  }
}

export interface ActivityContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  status: QuestStatus
}

export default function ActivityContainer({
  status,
  children,
  className,
  ...props
}: ActivityContainerProps) {
  const { iconName, iconClass, containerClass } =
    getCreateActivityComponentData(status)
  return (
    <div
      className={cn(
        'rounded-lg p-5 flex flex-col w-full justify-center items-center gap-5 max-md:p-5 max-md:gap-3',
        containerClass,
        className,
      )}
      {...props}
    >
      <div className="w-full justify-start flex items-center">
        <Icon className={cn(iconClass, 'h-6 w-6')} name={iconName} />
      </div>
      <div className="pb-5 max-md:pb-0">{children}</div>
    </div>
  )
}
