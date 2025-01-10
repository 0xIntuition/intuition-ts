import { useMemo, useState } from 'react'

import {
  Button,
  ButtonSize,
  ButtonVariant,
  Card,
  CardContent,
  CardHeader,
  cn,
  Icon,
  Text,
  TextVariant,
  TextWeight,
} from '@0xintuition/1ui'

import { Share2 } from 'lucide-react'
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from 'recharts'

import { TimeFilter, TimeFilterType } from './time-filter'

export interface PortfolioStats {
  value: number
  change: number
  points: number
}

interface TimeSeriesData {
  timestamp: number
  value: number
  change: number
  difference: number
}

interface PortfolioStatsProps {
  stats: PortfolioStats
}

// Generate a static 1-year dataset with hourly data for the last day
const generateStaticYearData = (): TimeSeriesData[] => {
  const data: TimeSeriesData[] = []
  const startDate = new Date()
  startDate.setFullYear(startDate.getFullYear() - 1)
  const startValue = 1000
  const endValue = 1250 // Target 25% increase

  // Helper function to calculate smooth growth with more aggressive upward trend
  const calculateGrowth = (progress: number) => {
    // Use cubic-bezier-like curve for more natural growth
    const curve = Math.pow(progress, 0.7) // Less than 1 for faster initial growth
    return startValue + (endValue - startValue) * curve
  }

  // Generate daily data for the year
  for (let i = 0; i <= 364; i++) {
    const date = new Date(startDate)
    date.setDate(date.getDate() + i)

    const progress = i / 364
    const baseValue = calculateGrowth(progress)

    // Add very subtle variations that don't disrupt the trend
    const noise = Math.sin(i * 0.1) * (baseValue * 0.001) // 0.1% daily noise
    const value = baseValue + noise

    const prevValue = data[data.length - 1]?.value || value
    const difference = value - prevValue
    const change = (difference / prevValue) * 100

    data.push({
      timestamp: date.getTime(),
      value,
      change,
      difference,
    })
  }

  // Generate hourly data for the last 24 hours
  const lastDayValue = data[data.length - 1].value
  const hourlyData: TimeSeriesData[] = []

  for (let i = 0; i < 24; i++) {
    const date = new Date()
    date.setHours(date.getHours() - 23 + i)

    // Very subtle hourly fluctuations
    const hourlyProgress = i / 23
    const trendValue = lastDayValue * (1 + hourlyProgress * 0.001) // Slight upward trend
    const hourlyNoise = Math.sin(i * 0.5) * (lastDayValue * 0.0005) // 0.05% hourly noise
    const value = trendValue + hourlyNoise

    const prevValue = hourlyData[hourlyData.length - 1]?.value || value
    const difference = value - prevValue
    const change = (difference / prevValue) * 100

    hourlyData.push({
      timestamp: date.getTime(),
      value,
      change,
      difference,
    })
  }

  return [...data.slice(0, -1), ...hourlyData]
}

const STATIC_YEAR_DATA = generateStaticYearData()

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (!active || !payload?.length) {
    return null
  }

  const data = payload[0].payload as TimeSeriesData
  return (
    <div className="rounded-md border border-border/10 bg-background/80 p-2 backdrop-blur-sm">
      <div className="text-sm font-medium">${data.value.toFixed(2)}</div>
      <div className="text-xs text-muted-foreground">
        {new Date(data.timestamp).toLocaleDateString()}
      </div>
    </div>
  )
}

interface CustomDotProps {
  cx: number
  cy: number
}

const CustomDot = ({ cx, cy }: CustomDotProps) => {
  return (
    <circle
      cx={cx}
      cy={cy}
      r="3"
      fill="white"
      style={{ pointerEvents: 'none' }}
    />
  )
}

export function PortfolioStats({ stats }: PortfolioStatsProps) {
  const [selectedTimeFilter, setSelectedTimeFilter] =
    useState<TimeFilterType>('YTD')
  const [hoveredPoint, setHoveredPoint] = useState<TimeSeriesData | null>(null)

  // Filter the static data based on selected time range
  const timeSeriesData = useMemo(() => {
    const now = new Date()
    const filterDate = new Date(now)

    switch (selectedTimeFilter) {
      case '1D':
        filterDate.setHours(filterDate.getHours() - 24)
        return STATIC_YEAR_DATA.slice(0, 24) // Use first 24 hours of data
      case '1W':
        filterDate.setDate(filterDate.getDate() - 7)
        break
      case '1M':
        filterDate.setMonth(filterDate.getMonth() - 1)
        break
      case '3M':
        filterDate.setMonth(filterDate.getMonth() - 3)
        break
      case '1Y':
        filterDate.setFullYear(filterDate.getFullYear() - 1)
        break
      case 'YTD':
        filterDate.setMonth(0, 1) // January 1st of current year
        break
    }

    return STATIC_YEAR_DATA.filter((d) => d.timestamp >= filterDate.getTime())
  }, [selectedTimeFilter])

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp)
    if (selectedTimeFilter === '1D') {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    return date.toLocaleDateString([], {
      month: 'short',
      day: 'numeric',
      year:
        selectedTimeFilter === '1Y' || selectedTimeFilter === 'YTD'
          ? 'numeric'
          : undefined,
    })
  }

  return (
    <Card className="rounded-lg border-none bg-gradient-to-br from-[#060504] to-[#101010] min-w-[480px]">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <Text variant={TextVariant.bodyLarge}>Portfolio</Text>
        </div>
        <Button variant={ButtonVariant.secondary} size={ButtonSize.iconXl}>
          <Share2 className="h-4 w-4" />
          <span className="sr-only">Share</span>
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Text variant={TextVariant.heading4} weight={TextWeight.medium}>
              ${hoveredPoint?.value.toFixed(2) ?? stats.value.toFixed(2)}
            </Text>
            <Text
              variant={TextVariant.bodyLarge}
              className={cn(
                (hoveredPoint?.change ?? stats.change) >= 0
                  ? 'text-[#34C578]'
                  : 'text-[#FF4A4A]',
              )}
            >
              {(hoveredPoint?.change ?? stats.change) >= 0 ? '+' : '-'}
              <span className="mr-1">
                {Math.abs(hoveredPoint?.difference ?? 0).toFixed(2)}
              </span>
              ({(hoveredPoint?.change ?? stats.change) >= 0 ? '+' : ''}
              {(hoveredPoint?.change ?? stats.change).toFixed(2)}%)
            </Text>
          </div>
          <div className="flex items-center gap-2">
            <Text variant={TextVariant.headline} className="text-accent">
              {stats.points} Points
            </Text>
            <Button
              variant="text"
              size="icon"
              className="h-5 w-5 p-0 text-accent/70 hover:text-accent"
            >
              <Icon name="arrows-repeat" className="!h-5 !w-5" />
              <span className="sr-only">Refresh</span>
            </Button>
          </div>
        </div>

        <div className="h-32 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={timeSeriesData}
              margin={{ top: 5, right: 0, left: 0, bottom: 0 }}
              onMouseMove={(e) => {
                if (e.activePayload?.[0]) {
                  setHoveredPoint(e.activePayload[0].payload as TimeSeriesData)
                }
              }}
              onMouseLeave={() => setHoveredPoint(null)}
            >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ba8461" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#ba8461" stopOpacity="0" />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="timestamp"
                type="number"
                domain={['dataMin', 'dataMax']}
                tickFormatter={formatDate}
                hide
              />
              <YAxis dataKey="value" domain={['auto', 'auto']} hide />
              <Tooltip
                content={CustomTooltip}
                cursor={false}
                isAnimationActive={false}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#ba8461"
                strokeWidth={1}
                fill="url(#colorValue)"
                isAnimationActive={false}
                dot={false}
                activeDot={CustomDot}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <TimeFilter
          selected={selectedTimeFilter}
          onSelect={setSelectedTimeFilter}
        />
      </CardContent>
    </Card>
  )
}
