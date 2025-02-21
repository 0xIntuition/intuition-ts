import { Button, cn, Text, TextVariant, TextWeight } from '@0xintuition/1ui'

import { useNavigate } from '@remix-run/react'

interface MasteryPreviewProps {
  title: string
  description: string
  progress: number
  maxProgress: number
  levels: Array<{
    points: number
    percentage: number
    isLocked: boolean
  }>
  className?: string
  background?: string
  actionButton?: {
    text: string
    to: string
  }
  totalPoints?: number
}

export function MasteryPreview({
  title,
  description,
  progress,
  maxProgress,
  levels,
  className,
  background,
  actionButton,
  totalPoints,
}: MasteryPreviewProps) {
  const navigate = useNavigate()

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (actionButton?.to) {
      navigate(actionButton.to)
    }
  }

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-lg p-4 sm:p-6',
        'bg-background/80 backdrop-blur-sm',
        className,
      )}
    >
      <div
        className={cn(`absolute inset-0 bg-no-repeat bg-center opacity-30`)}
        style={{
          backgroundImage: background ? `url(${background})` : 'none',
          backgroundSize: 'cover',
        }}
      />
      {/* Header */}
      <div className="mb-4 sm:mb-6 relative">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-2">
          <Text
            variant={TextVariant.heading2}
            weight={TextWeight.semibold}
            className="break-words"
          >
            {title}
          </Text>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {totalPoints !== undefined && (
              <div className="flex flex-row gap-2 items-center">
                <Text
                  variant={TextVariant.heading4}
                  weight={TextWeight.semibold}
                  className={cn(totalPoints > 0 && 'text-success')}
                >
                  {totalPoints.toLocaleString()}
                </Text>{' '}
                <Text
                  variant={TextVariant.headline}
                  weight={TextWeight.medium}
                  className="text-muted-foreground whitespace-nowrap"
                >
                  IQ Earned
                </Text>
              </div>
            )}
            {actionButton && (
              <Button
                variant="primary"
                size="lg"
                onClick={handleClick}
                onMouseDown={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
                className="z-50 relative w-full sm:w-auto"
              >
                {actionButton.text}
              </Button>
            )}
          </div>
        </div>
        <Text variant={TextVariant.body} className="text-primary/70">
          {description}
        </Text>
      </div>

      {/* Progress Overview */}
      <div className="mb-6 sm:mb-8 relative">
        <div className="flex justify-between mb-2">
          <Text variant={TextVariant.body}>Overall Progress</Text>
          <Text variant={TextVariant.body} className="text-primary">
            {Math.round((progress / maxProgress) * 100)}%
          </Text>
        </div>
        <div className="h-2 bg-background/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${(progress / maxProgress) * 100}%` }}
          />
        </div>
      </div>

      {/* Level Progress */}
      <div className="grid gap-3 sm:gap-4">
        {levels.map((level, index) => (
          <div key={index} className="relative">
            <div className="flex justify-between mb-1">
              <Text variant={TextVariant.body}>Level {index + 1}</Text>
              <Text
                variant={TextVariant.body}
                className={cn(
                  level.isLocked ? 'text-primary/50' : 'text-primary',
                )}
              >
                {level.points.toLocaleString()} IQ
              </Text>
            </div>
            <div className="h-1.5 bg-background/20 rounded-full overflow-hidden">
              <div
                className={cn(
                  'h-full transition-all duration-300',
                  level.isLocked ? 'bg-primary/50' : 'bg-primary',
                )}
                style={{ width: `${level.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
