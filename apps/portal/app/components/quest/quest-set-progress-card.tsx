import { getProgressPercentage, ProgressBar, Text } from '@0xintuition/1ui'

import NavigationButton from '@components/navigation-link'

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
      className="flex align-center w-full h-full theme-border rounded-lg max-sm:flex-col"
      {...props}
    >
      <img
        src={imgSrc}
        alt={title}
        className="object-cover w-52 h-full rounded-l-lg theme-border max-sm:w-full max-sm:rounded-r-lg max-sm:h-44"
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
          <div className="flex w-full justify-end max-sm:justify-center">
            <NavigationButton
              to={to}
              prefetch="intent"
              className="max-md:text-base max-md:py-3 max-md:flex-grow"
              variant="secondary"
              size="md"
              disabled={progressPercentage === 100}
            >
              {progressPercentage === 0
                ? 'Get Started'
                : progressPercentage === 100
                  ? 'Completed'
                  : 'Continue'}
            </NavigationButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export { QuestSetProgressCard }
