import { Text, TextVariant, TextWeight } from 'components/Text'
import { Circle } from 'lucide-react'
import { cn } from 'styles'
import { formatNumber } from 'utils'

interface Metric {
  label: string
  icon?: React.ReactNode
  value: number | string
  hideOnMobile?: boolean
  suffix?: string
  precision?: number
}

interface AggregatedMetricsProps extends React.HTMLAttributes<HTMLDivElement> {
  metrics: Metric[]
}

const getGridColsClass = (count: number) => {
  switch (count) {
    case 1:
      return 'grid-cols-1 sm:grid-cols-1'
    case 2:
      return 'grid-cols-2 sm:grid-cols-2'
    case 3:
      return 'grid-cols-2 sm:grid-cols-3'
    case 4:
      return 'grid-cols-2 sm:grid-cols-4'
    default:
      return 'grid-cols-2 sm:grid-cols-5'
  }
}

export function AggregatedMetrics({
  metrics,
  className,
  ...props
}: AggregatedMetricsProps) {
  const gridColsClass = getGridColsClass(Math.min(metrics.length, 5))

  return (
    <div className={cn('grid gap-4', gridColsClass, className)} {...props}>
      {metrics.map(
        ({ label, icon, value, hideOnMobile, suffix, precision }) => {
          const formattedValue =
            typeof value === 'string' ? Number(value) : value
          const shouldForceDecimals = formattedValue >= 1000
          const effectivePrecision = shouldForceDecimals ? 2 : precision ?? 0

          return (
            <div
              key={label}
              className={cn(
                'relative p-4 rounded-lg bg-white/5 backdrop-blur-md backdrop-saturate-150 border border-border/10',
                hideOnMobile && 'hidden lg:block',
              )}
            >
              <div className="flex flex-row justify-between w-full">
                <Text variant={TextVariant.body}>{label}</Text>
                {icon ? icon : <Circle className="w-4 h-4" />}
              </div>
              <Text variant={TextVariant.headline} weight={TextWeight.medium}>
                {formatNumber(formattedValue, effectivePrecision)}
                {suffix ? ` ${suffix}` : ''}
              </Text>
            </div>
          )
        },
      )}
    </div>
  )
}
