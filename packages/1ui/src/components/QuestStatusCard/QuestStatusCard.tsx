import * as React from 'react'

import { cn } from 'styles'
import { QuestStatus, QuestStatusType } from 'types'

import {
  Icon,
  IconName,
  Text,
  TextVariant,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '..'

const getInProgressLabel = (status: QuestStatusType) => {
  switch (status) {
    case QuestStatus.notStarted:
      return 'Not Started'
    case QuestStatus.inProgress:
      return 'In Progress'
    case QuestStatus.claimable:
      return 'Ready to Claim'
    case QuestStatus.completed:
      return 'Complete'
    default:
      return 'Not Started'
  }
}

const getStatusComponentData = (status: QuestStatusType) => {
  switch (status) {
    case QuestStatus.notStarted:
      return {
        iconName: IconName.awaitAction,
        iconClass: 'text-muted-foreground',
        bgClass: 'bg-primary/10',
        label: getInProgressLabel(status),
      }
    case QuestStatus.inProgress:
      return {
        iconName: IconName.awaitAction,
        iconClass: 'text-warning',
        bgClass: 'bg-warning/20',
        label: getInProgressLabel(status),
      }
    case QuestStatus.claimable:
      return {
        iconName: IconName.circleCheck,
        iconClass: 'text-success',
        bgClass: 'bg-primary/10',
        label: getInProgressLabel(status),
      }
    case QuestStatus.completed:
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
        label: getInProgressLabel('not-started'),
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
  status: QuestStatusType
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

export { QuestStatusCard }
