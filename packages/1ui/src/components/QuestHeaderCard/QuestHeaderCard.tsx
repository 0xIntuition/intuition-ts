import * as React from 'react'

import { Button, ButtonVariant, Icon, IconName, Text, TextVariant } from '..'

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
      className={`flex flex-col gap-6 p-6 rounded-xl theme-border bg-gradient-to-r ${percentageOfQuestsCompleted === 100 ? 'from-for/30' : 'from-against/30'}`}
      {...props}
    >
      <div className="flex justify-between items-start">
        <div className="flex-col gap-1">
          <Text variant={TextVariant.body} className="text-foreground/70">
            {subtitle}
          </Text>
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
        <Text variant={TextVariant.body} className="text-foreground/70">
          {`${percentageOfQuestsCompleted.toFixed(0)}% Complete`}
        </Text>
        <Button variant={ButtonVariant.secondary} onClick={onButtonClick}>
          <Icon name={IconName.crystalBall} className="h-4 w-4" /> View Quests
        </Button>
      </div>
    </div>
  )
}

export { QuestHeaderCard }
