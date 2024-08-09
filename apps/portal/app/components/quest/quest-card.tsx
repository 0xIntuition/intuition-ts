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
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void
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
  handleClick,
  ...props
}: QuestCardProps) => {
  return (
    <div
      className={cn(
        'flex items-stretch theme-border rounded-lg overflow-hidden relative min-h-52 max-sm:flex-col',
        disabled && 'opacity-50',
      )}
      {...props}
    >
      <div
        className="w-52 h-full flex-shrink-0 relative bg-center bg-cover max-sm:w-full max-sm:h-44"
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
      <div className="flex flex-col justify-center -ml-[29px] z-10 max-sm:m-auto max-sm:mt-[-2rem]">
        <QuestStatusIndicator status={questStatus} />
      </div>
      <div className="flex justify-between w-full max-lg:flex-col">
        <div className="flex-1 flex flex-col justify-between p-6 max-sm:p-4 max-sm:pt-0 gap-3">
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
          <QuestCardButton
            questStatus={questStatus}
            disabled={disabled}
            onClick={handleClick}
          />
          <QuestPointsDisplay points={points} questStatus={questStatus} />
        </div>
      </div>
    </div>
  )
}

export { QuestCard }
