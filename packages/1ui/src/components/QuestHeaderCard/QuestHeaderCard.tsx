import * as React from 'react'

import { Button, ButtonVariant, Text, TextVariant } from '..'

export interface QuestHeaderCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  subtitle: string
  numberOfCompletedQuests: number
  totalNumberOfQuests: number
  onButtonClick: () => void
}

const QuestHeaderCard = ({
  title,
  subtitle,
  numberOfCompletedQuests,
  totalNumberOfQuests,
  onButtonClick,
  ...props
}: QuestHeaderCardProps) => {
  const percentageOfQuestsCompleted =
    (numberOfCompletedQuests / totalNumberOfQuests) * 100
  return (
    <div
      className="flex flex-col gap-6 p-6 rounded-xl border border-border/30 bg-gradient-to-r from-against/30"
      {...props}
    >
      <div className="flex justify-between items-start">
        <div className="flex-col gap-1">
          <Text variant={TextVariant.small}>{subtitle}</Text>
          <Text variant={TextVariant.bodyLarge}>{title}</Text>
        </div>
        <div className="flex gap-1 items-center">
          <Text variant={TextVariant.bodyLarge}>{numberOfCompletedQuests}</Text>
          <Text
            variant={TextVariant.bodyLarge}
            className="text-muted-foreground"
          >
            /
          </Text>
          <Text
            variant={TextVariant.bodyLarge}
            className="text-muted-foreground"
          >
            {totalNumberOfQuests}
          </Text>
        </div>
      </div>
      <div className="flex justify-between items-end">
        <Text variant={TextVariant.small}>
          {`${percentageOfQuestsCompleted}% Complete`}
        </Text>
        <Button variant={ButtonVariant.secondary} onClick={() => onButtonClick}>
          View quests
        </Button>
      </div>
    </div>
  )
}

export { QuestHeaderCard }
