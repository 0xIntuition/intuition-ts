import React from 'react'

import { PieChart, PieChartSize, PieChartVariant } from 'components/PieChart'
import { Text, TextVariant } from 'components/Text'
import { cn } from 'styles'

export interface StakeTVLProps {
  totalTVL: number
  currency: string
  isClaim?: boolean
  tvlFor?: number
  className?: string
}

const StakeTVL = React.forwardRef<HTMLDivElement, StakeTVLProps>(
  (
    {
      totalTVL = 420.69,
      tvlFor = 240.69,
      currency,
      className,
      isClaim = 'false',
      ...props
    },
    ref,
  ) => {
    const stakedForPercentage = (tvlFor / totalTVL) * 100

    return (
      <div
        ref={ref}
        className={cn(
          'h-9 justify-start items-center gap-1 inline-flex',
          className,
        )}
        {...props}
      >
        <div className="justify-start items-center gap-1 flex">
          <div className="flex-col justify-start items-end inline-flex">
            <Text variant={TextVariant.caption} className="text-primary/70">
              TVL
            </Text>
            <Text variant={TextVariant.caption}>
              {totalTVL} {currency}
            </Text>
          </div>
        </div>
        {isClaim && (
          <div className="p-0.5">
            <PieChart
              variant={PieChartVariant.forVsAgainst}
              size={PieChartSize.sm}
              percentage={stakedForPercentage}
            />
          </div>
        )}
      </div>
    )
  },
)

StakeTVL.displayName = 'StakeTVL'

export { StakeTVL }
