import { cn, Text, TextVariant, TextWeight } from '@0xintuition/1ui'

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
}

export function MasteryPreview({
  title,
  description,
  progress,
  maxProgress,
  levels,
  className,
  background,
}: MasteryPreviewProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-lg p-6',
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
      <div className="mb-6">
        <Text variant={TextVariant.heading2} weight={TextWeight.semibold}>
          {title}
        </Text>
        <Text variant={TextVariant.body} className="text-primary/70 mt-2">
          {description}
        </Text>
      </div>

      {/* Progress Overview */}
      <div className="mb-8">
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
      <div className="grid gap-4">
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
                {level.points.toLocaleString()} points
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
