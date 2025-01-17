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

export function AggregatedMetrics({
  metrics,
  className,
  ...props
}: AggregatedMetricsProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-2 gap-4 p-4 sm:grid-cols-4 lg:grid-cols-5',
        className,
      )}
      {...props}
    >
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
