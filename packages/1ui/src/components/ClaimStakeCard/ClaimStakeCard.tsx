import * as React from 'react'

import { CurrencyType } from 'types'

import {
  Button,
  ButtonSize,
  ButtonVariant,
  PieChart,
  PieChartSize,
  PieChartVariant,
  Text,
  TextVariant,
  TextWeight,
} from '..'
import { cn } from '../../styles'

const StakeCardDataSetVariant = {
  For: 'for',
  Against: 'against',
}

type StakeCardDataSetVariantType =
  (typeof StakeCardDataSetVariant)[keyof typeof StakeCardDataSetVariant]

interface ClaimStakeCardDataSetProps {
  variant: StakeCardDataSetVariantType
  value: string | number
}

const ClaimStakeCardDataSet = ({
  variant,
  value,
}: ClaimStakeCardDataSetProps) => {
  const isVariantFor = variant === StakeCardDataSetVariant.For
  let subContainerClassName = 'flex gap-1 items-center'
  if (isVariantFor) {
    subContainerClassName += ' justify-end'
  }
  return (
    <div>
      <div className={subContainerClassName}>
        <span
          className={`block h-2 w-2 rounded-[2px] ${isVariantFor ? 'bg-for' : 'bg-against'}`}
        />
        <Text
          variant={TextVariant.caption}
          weight={TextWeight.medium}
          className="text-muted-foreground"
        >
          {isVariantFor ? 'TVL For' : 'TVL Against'}
        </Text>
      </div>
      <Text
        variant={TextVariant.bodyLarge}
        className={isVariantFor ? 'text-right' : 'text-left'}
      >
        {value}
      </Text>
    </div>
  )
}

export interface ClaimStakeCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  currency: CurrencyType
  totalTVL: number
  tvlAgainst: number
  tvlFor: number
  amountAgainst: number
  amountFor: number
  disableAgainstBtn?: boolean
  onAgainstBtnClick?: () => void
  disableForBtn?: boolean
  onForBtnClick?: () => void
}

const ClaimStakeCard = ({
  currency,
  totalTVL,
  tvlAgainst,
  tvlFor,
  amountAgainst,
  amountFor,
  disableAgainstBtn = false,
  onAgainstBtnClick,
  disableForBtn = false,
  onForBtnClick,
  className,
  ...props
}: ClaimStakeCardProps) => {
  const valueWithCurrency = (value: number, currency: CurrencyType) =>
    `${value} ${currency}`

  const stakedForPercentage = (tvlFor / totalTVL) * 100

  return (
    <div
      className={cn(
        'flex flex-col gap-4 border border-border/30 rounded-xl p-5 w-max',
        className,
      )}
      {...props}
    >
      <Text variant={TextVariant.bodyLarge}>Stake</Text>
      <div className="grid justify-center items-center">
        <div className="col-[1] row-[1] block w-max">
          <PieChart
            variant={PieChartVariant.forVsAgainst}
            size={PieChartSize.lg}
            percentage={stakedForPercentage}
          />
        </div>
        <div className="col-[1] row-[1] text-center">
          <Text
            variant={TextVariant.bodyLarge}
            weight={TextWeight.normal}
            className="text-muted-foreground"
          >
            Total TVL
          </Text>
          <Text variant={TextVariant.bodyLarge}>
            {valueWithCurrency(totalTVL, currency)}
          </Text>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <ClaimStakeCardDataSet
          variant={StakeCardDataSetVariant.Against}
          value={valueWithCurrency(tvlAgainst, currency)}
        />
        <ClaimStakeCardDataSet
          variant={StakeCardDataSetVariant.For}
          value={valueWithCurrency(tvlFor, currency)}
        />
      </div>
      <div className="flex justify-between items-center">
        <ClaimStakeCardDataSet
          variant={StakeCardDataSetVariant.Against}
          value={amountAgainst}
        />
        <ClaimStakeCardDataSet
          variant={StakeCardDataSetVariant.For}
          value={amountFor}
        />
      </div>
      <div className="flex justify-between items-center gap-4 w-max mt-2">
        <Button
          variant={ButtonVariant.against}
          size={ButtonSize.lg}
          disabled={disableAgainstBtn || !onAgainstBtnClick}
          onClick={onAgainstBtnClick}
          className="w-[140px]"
        >
          Deposit Against
        </Button>
        <Button
          variant={ButtonVariant.for}
          size={ButtonSize.lg}
          disabled={disableForBtn || !onForBtnClick}
          onClick={onForBtnClick}
          className="w-[140px]"
        >
          Deposit For
        </Button>
      </div>
    </div>
  )
}

export { ClaimStakeCard }
