import { cn } from 'styles'
import { formatNumber } from 'utils'

interface NetworkStatsProps extends React.HTMLAttributes<HTMLDivElement> {
  tvl: number
  atomsCount: number
  triplesCount: number
  signalsCount: number
  usersCount: number
}

export function NetworkStats({
  tvl,
  atomsCount,
  triplesCount,
  signalsCount,
  usersCount,
  className,
  ...props
}: NetworkStatsProps) {
  const stats = [
    { label: 'TVL', value: `${formatNumber(tvl, 2)} ETH` },
    { label: 'Atoms', value: formatNumber(atomsCount, 2) },
    { label: 'Triples', value: formatNumber(triplesCount, 2) },
    {
      label: 'Signals',
      value: formatNumber(signalsCount, 2),
      hideOnMobile: true,
    },
    { label: 'Users', value: formatNumber(usersCount, 2) },
  ]

  return (
    <div
      className={cn(
        'grid grid-cols-2 gap-4 rounded-lg bg-background/20 p-4 sm:grid-cols-4 lg:grid-cols-5',
        className,
      )}
      {...props}
    >
      {stats.map(({ label, value, hideOnMobile }, index) => (
        <div
          key={label}
          className={cn(
            'relative text-center px-12',
            hideOnMobile && 'hidden lg:block',
            index !== stats.length - 1 &&
              'after:absolute after:right-0 after:inset-y-0 after:w-px after:bg-border/20',
          )}
        >
          <div className="text-sm text-foreground/70">{label}</div>
          <div className="text-2xl font-medium text-foreground">{value}</div>
        </div>
      ))}
    </div>
  )
}
