import { cn } from 'styles'
import { formatNumber } from 'utils'

interface Metric {
  label: string
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
    <div className={cn('grid gap-4 p-4', gridColsClass, className)} {...props}>
      {metrics.map(
        ({ label, value, hideOnMobile, suffix, precision }, index) => {
          const formattedValue =
            typeof value === 'string' ? Number(value) : value
          const shouldForceDecimals = formattedValue >= 1000
          const effectivePrecision = shouldForceDecimals ? 2 : precision ?? 0

          return (
            <div
              key={label}
              className={cn(
                'relative text-center px-12',
                hideOnMobile && 'hidden lg:block',
                index !== metrics.length - 1 &&
                  'after:absolute after:right-0 after:inset-y-0 after:w-px after:bg-border/20',
              )}
            >
              <div className="text-sm text-foreground/70">{label}</div>
              <div className="text-2xl font-medium text-foreground">
                {formatNumber(formattedValue, effectivePrecision)}
                {suffix ? ` ${suffix}` : ''}
              </div>
            </div>
          )
        },
      )}
    </div>
  )
}
