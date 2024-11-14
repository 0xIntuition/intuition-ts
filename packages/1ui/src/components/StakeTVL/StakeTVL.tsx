import React from 'react'

import { ClaimStakeCard } from 'components/ClaimStakeCard'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from 'components/HoverCard'
import { PieChart, PieChartSize, PieChartVariant } from 'components/PieChart'
import { Text, TextVariant } from 'components/Text'
import { cn } from 'styles'
import { CurrencyType } from 'types'

export interface StakeTVLProps {
  totalTVL: number
  numPositions?: number
  numPositionsFor?: number
  numPositionsAgainst?: number
  currency?: CurrencyType
  isClaim?: boolean
  tvlFor?: number
  tvlAgainst?: number
  className?: string
}

const StakeTVL = React.forwardRef<HTMLDivElement, StakeTVLProps>(
  (
    {
      totalTVL,
      numPositionsFor,
      numPositionsAgainst,
      currency = 'ETH',
      className,
      isClaim,
      tvlFor,
      tvlAgainst,
      ...props
    },
    ref,
  ) => {
    const stakedForPercentage =
      tvlFor && totalTVL ? (+tvlFor / +totalTVL) * 100 : 0

    const content = (
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
            <div className="flex flex-row items-center gap-1">
              <Text variant={TextVariant.caption}>{totalTVL}</Text>
              <Text variant={TextVariant.caption}>{currency}</Text>
            </div>
          </div>
        </div>
        {isClaim && (
          <div className="p-0.5">
            <PieChart
              variant={
                (tvlFor && +tvlFor > 0) || (tvlAgainst && +tvlAgainst > 0)
                  ? PieChartVariant.forVsAgainst
                  : PieChartVariant.default
              }
              size={PieChartSize.sm}
              percentage={stakedForPercentage}
            />
          </div>
        )}
      </div>
    )

    if (!isClaim) {
      return content
    }

    return (
      <HoverCard>
        <HoverCardTrigger asChild>{content}</HoverCardTrigger>
        <HoverCardContent align="end" side="top">
          <ClaimStakeCard
            currency={currency}
            totalTVL={totalTVL}
            tvlAgainst={tvlAgainst!}
            tvlFor={tvlFor!}
            numPositionsAgainst={numPositionsAgainst ?? 0}
            numPositionsFor={numPositionsFor ?? 0}
            disableStaking={true}
            className="border-none p-0"
          />
        </HoverCardContent>
      </HoverCard>
    )
  },
)

StakeTVL.displayName = 'StakeTVL'

export { StakeTVL }
