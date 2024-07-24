import * as React from 'react'

import {
  cn,
  Icon,
  IconName,
  Text,
  TextVariant,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@0xintuition/1ui'
import { QuestStatus } from '@0xintuition/api'

const getInProgressLabel = (status: QuestStatus) => {
  switch (status) {
    case QuestStatus.NOT_STARTED:
      return 'Not Started'
    case QuestStatus.STARTED:
      return 'In Progress'
    case QuestStatus.CLAIMABLE:
      return 'Ready to Claim'
    case QuestStatus.COMPLETED:
      return 'Complete'
    default:
      return 'Not Started'
  }
}

const getStatusComponentData = (status: QuestStatus) => {
  switch (status) {
    case QuestStatus.NOT_STARTED:
      return {
        iconName: IconName.awaitAction,
        iconClass: 'text-muted-foreground',
        bgClass: 'bg-primary/10',
        label: getInProgressLabel(status),
      }
    case QuestStatus.STARTED:
      return {
        iconName: IconName.awaitAction,
        iconClass: 'text-warning',
        bgClass: 'bg-warning/20',
        label: getInProgressLabel(status),
      }
    case QuestStatus.CLAIMABLE:
      return {
        iconName: IconName.circleCheck,
        iconClass: 'text-success',
        bgClass: 'bg-primary/10',
        label: getInProgressLabel(status),
      }
    case QuestStatus.COMPLETED:
      return {
        iconName: IconName.circleCheckFilled,
        iconClass: 'text-success',
        bgClass: 'bg-success/20',
        label: getInProgressLabel(status),
      }
    default:
      return {
        iconName: IconName.awaitAction,
        iconClass: 'text-muted-foreground',
        bgClass: 'bg-primary/10',
        label: getInProgressLabel(QuestStatus.NOT_STARTED),
      }
  }
}

const QuestStatusCardComponent = ({
  status,
  tooltip,
  ...props
}: QuestStatusCardProps) => {
  const rootIconClassName = 'h-4 w-4'
  const statusComponentData = getStatusComponentData(status)

  return (
    <div
      className={cn(
        'flex items-center gap-2 rounded-md theme-border p-3',
        statusComponentData.bgClass,
      )}
      {...props}
    >
      <Icon
        className={cn(statusComponentData.iconClass, rootIconClassName)}
        name={statusComponentData.iconName}
      />
      <Text
        variant={TextVariant.body}
        className={cn(statusComponentData.iconClass)}
      >
        {statusComponentData.label}
      </Text>
      {tooltip && (
        <Icon
          name={IconName.circleQuestionMark}
          className={cn('text-primary/20', rootIconClassName)}
        />
      )}
    </div>
  )
}

export interface QuestStatusCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  status: QuestStatus
  tooltip?: string
}

const QuestStatusCard = ({
  status,
  tooltip,
  ...props
}: QuestStatusCardProps) => {
  const extendedProps = { status, tooltip, ...props }
  return tooltip ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <QuestStatusCardComponent {...extendedProps} />
        </TooltipTrigger>
        <TooltipContent>{tooltip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    <QuestStatusCardComponent {...extendedProps} />
  )
}

export default QuestStatusCard
