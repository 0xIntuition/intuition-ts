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

const getStatusComponentData = (status: QuestStatus) => {
  const isCompleted = status === QuestStatus.COMPLETED
  return {
    iconName: isCompleted ? IconName.circleCheckFilled : IconName.awaitAction,
    iconClass: isCompleted ? 'text-success' : 'text-muted-foreground',
    bgClass: isCompleted ? 'bg-success/20' : 'bg-primary/10',
    label: isCompleted ? 'Complete' : 'Not Started',
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
