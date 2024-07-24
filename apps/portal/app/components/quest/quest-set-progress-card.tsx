import {
  Button,
  getProgressPercentage,
  ProgressBar,
  Text,
} from '@0xintuition/1ui'

import { Link } from '@remix-run/react'

export interface QuestSetProgressCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  imgSrc: string
  title: string
  numberQuests: number
  numberCompletedQuests: number
  to: string
}

const QuestSetProgressCard = ({
  imgSrc,
  title,
  numberQuests,
  numberCompletedQuests,
  to,
  ...props
}: QuestSetProgressCardProps) => {
  const progressPercentage = getProgressPercentage(
    numberCompletedQuests,
    numberQuests,
  )
  return (
    <div
      className="flex align-center w-full theme-border rounded-lg"
      {...props}
    >
      <img
        src={imgSrc}
        alt={title}
        className="object-cover w-52 h-52 rounded-l-lg theme-border"
      />
      <div className="flex flex-col justify-between gap-2 w-full px-6 py-5">
        <Text variant="headline">{title}</Text>
        <div className="flex flex-col">
          <div className="flex items-center justify-between py-2.5">
            <Text
              variant="body"
              weight="regular"
              className="text-muted-foreground"
            >
              {progressPercentage}% Complete
            </Text>
            <Text
              variant="body"
              weight="regular"
              className="text-muted-foreground"
            >
              <span className="text-primary">{numberCompletedQuests}</span> /{' '}
              {numberQuests}
            </Text>
          </div>
          <ProgressBar percentage={progressPercentage} />
          <div className="flex w-full justify-end">
            <Link to={to} prefetch="intent">
              <Button variant="secondary" size="md">
                Continue
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export { QuestSetProgressCard }
