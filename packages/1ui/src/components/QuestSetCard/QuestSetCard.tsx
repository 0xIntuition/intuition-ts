import * as React from 'react'

import { ProgressBar } from 'components/ProgressBar'
import { Text } from 'components/Text'
import { cn } from 'styles'
import { getProgressPercentage } from 'utils/progress'

export interface QuestSetCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  imgSrc: string
  title: string
  description: string
  numberQuests: number
  numberCompletedQuests: number
  disabled?: boolean
}

const QuestSetCard = ({
  imgSrc,
  title,
  description,
  numberQuests,
  numberCompletedQuests,
  disabled,
  ...props
}: QuestSetCardProps) => {
  const progressPercentage = getProgressPercentage(
    numberCompletedQuests,
    numberQuests,
  )

  return (
    <div
      className={cn(
        'bg-popover flex flex-col justify-center align-center theme-border rounded-lg p-8 gap-5',
        disabled && 'cursor-not-allowed opacity-50',
      )}
      {...props}
    >
      <img
        src={imgSrc}
        alt={title}
        className="object-cover w-full h-auto rounded-lg theme-border"
      />
      <div className="space-y-2.5">
        <Text variant="headline" weight="medium">
          {title}
        </Text>
        <Text
          variant="bodyLarge"
          weight="regular"
          className="text-foreground/70"
        >
          {description}
        </Text>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center justify-between py-2.5">
          <Text
            variant="bodyLarge"
            weight="regular"
            className="text-muted-foreground"
          >
            {progressPercentage}% Complete
          </Text>
          <Text
            variant="bodyLarge"
            weight="regular"
            className="text-muted-foreground"
          >
            <span className="text-primary">{numberCompletedQuests}</span> /{' '}
            {numberQuests}
          </Text>
        </div>
        <ProgressBar percentage={progressPercentage} />
      </div>
    </div>
  )
}

export { QuestSetCard }
