import { HTMLAttributes } from 'react'

import { cn, Icon, IconName } from '@0xintuition/1ui'
import { QuestStatus } from '@0xintuition/api'

export interface QuestStatusIndicatorProps
  extends HTMLAttributes<HTMLDivElement> {
  status: QuestStatus
  className?: string
}

const getStatusComponentData = (status: QuestStatus) => {
  switch (status) {
    case QuestStatus.NOT_STARTED:
      return {
        iconName: IconName.awaitAction,
        iconClass: 'text-muted-foreground',
        bgClass: 'fill-muted',
      }
    case QuestStatus.STARTED:
      return {
        iconName: IconName.awaitAction,
        iconClass: 'text-warning',
        bgClass: 'fill-muted',
      }
    case QuestStatus.CLAIMABLE:
      return {
        iconName: IconName.awaitAction,
        iconClass: 'text-success',
        bgClass: 'fill-muted',
      }
    case QuestStatus.COMPLETED:
      return {
        iconName: IconName.circleCheck,
        iconClass: 'text-primary',
        bgClass: 'fill-success',
      }
    default:
      return {
        iconName: IconName.awaitAction,
        iconClass: 'text-muted-foreground',
        bgClass: 'fill-muted',
      }
  }
}

const QuestStatusIndicator = ({
  status,
  className,
}: QuestStatusIndicatorProps) => {
  const { iconName, iconClass, bgClass } = getStatusComponentData(status)

  return (
    <div className={cn(`relative w-[58px] h-[64px]`, className)}>
      <svg
        width="58"
        height="64"
        viewBox="0 0 58 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M51.9628 12.6802L34.25 2.45374C31.0013 0.578094 26.9987 0.578094 23.75 2.45374L6.03719 12.6802C2.78848 14.5559 0.787188 18.0222 0.787188 21.7735V42.2265C0.787188 45.9778 2.78848 49.4441 6.03719 51.3198L23.75 61.5463C26.9987 63.4219 31.0013 63.4219 34.25 61.5463L51.9628 51.3198C55.2115 49.4441 57.2128 45.9778 57.2128 42.2265V21.7735C57.2128 18.0222 55.2115 14.5559 51.9628 12.6802Z"
          className={cn(bgClass, 'shadow-md stroke-primary/20')}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <Icon name={iconName} className={cn(iconClass, 'w-8 h-8')} />
      </div>
    </div>
  )
}

export { QuestStatusIndicator }
