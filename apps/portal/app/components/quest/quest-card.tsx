import { cn, Text } from '@0xintuition/1ui'
import { QuestStatus } from '@0xintuition/api'

import { QuestCardButton } from './quest-card-button'
import { QuestCriteriaDisplay } from './quest-criteria-display'
import { QuestPointsDisplay } from './quest-points-display'
import { QuestStatusIndicator } from './quest-status-indicator'

export interface QuestCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imgSrc: string
  title: string
  description: string
  questStatus: QuestStatus
  label: string
  points: number
  questCriteria: string
  disabled: boolean
}

const QuestCard = ({
  imgSrc,
  title,
  description,
  questStatus,
  label,
  points,
  questCriteria,
  disabled = false,
  ...props
}: QuestCardProps) => {
  return (
    <div
      className={cn(
        'flex items-stretch theme-border rounded-lg overflow-hidden relative h-full',
        disabled && 'opacity-50',
      )}
      {...props}
    >
      <div
        className="w-52 h-52 flex-shrink-0 relative bg-center bg-cover"
        style={{ backgroundImage: `url(${imgSrc})` }}
      >
        <div className="absolute top-2.5 left-2.5">
          <Text
            variant="body"
            className="text-foreground/70 bg-background/70 backdrop-blur-md px-2 py-1 rounded-md theme-border"
          >
            {label}
          </Text>
        </div>
        <div className="w-full h-full bg-cover bg-center border-r border-border/10"></div>
      </div>
      <div className="flex flex-col justify-center -ml-[29px] z-10">
        <QuestStatusIndicator status={questStatus} />
      </div>
      <div className="flex-1 flex flex-col justify-between p-6">
        <div className="space-y-2.5">
          <Text variant="headline" weight="normal">
            {title}
          </Text>
          <Text
            variant="bodyLarge"
            weight="normal"
            className="text-foreground/70"
          >
            {description}
          </Text>
        </div>
        <QuestCriteriaDisplay criteria={questCriteria} status={questStatus} />
      </div>
      <div className="flex flex-col gap-2 items-center p-6">
        <QuestCardButton questStatus={questStatus} disabled={disabled} />
        <QuestPointsDisplay points={points} questStatus={questStatus} />
      </div>
    </div>
  )
}

export { QuestCard }
