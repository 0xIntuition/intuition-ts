import * as React from 'react'

import {
  Button,
  ButtonSize,
  ButtonVariant,
  CurrencyValueDisplay,
  PieChart,
  PieChartSize,
  PieChartVariant,
  Text,
  TextVariant,
  TextWeight,
} from 'components'
import { cn } from 'styles'
import { CurrencyType } from 'types'

const StakeCardDataSetVariant = {
  for: 'for',
  against: 'against',
}

type StakeCardDataSetVariantType =
  (typeof StakeCardDataSetVariant)[keyof typeof StakeCardDataSetVariant]

interface ClaimStakeCardDataSetProps {
  variant: StakeCardDataSetVariantType
  value: number
  currency?: CurrencyType
}

const ClaimStakeCardDataSet = ({
  variant,
  value,
  currency,
}: ClaimStakeCardDataSetProps) => {
  const isVariantFor = variant === StakeCardDataSetVariant.for
  let subContainerClassName = 'flex gap-1 items-center'
  if (isVariantFor) {
    subContainerClassName += ' justify-start'
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
          {!currency ? 'Depositors' : isVariantFor ? 'TVL For' : 'TVL Against'}
        </Text>
      </div>
      {currency ? (
        <CurrencyValueDisplay
          variant={TextVariant.bodyLarge}
          value={value}
          currency={currency}
          className={isVariantFor ? 'text-left' : 'text-right'}
        />
      ) : (
        <Text
          variant={TextVariant.bodyLarge}
          weight={TextWeight.medium}
          className={isVariantFor ? 'text-left' : 'text-right'}
        >
          {value}
        </Text>
      )}
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
  const stakedForPercentage = (tvlFor / totalTVL) * 100

  return (
    <div
      className={cn(
        'flex flex-col gap-4 theme-border rounded-xl p-5 w-80',
        className,
      )}
      {...props}
    >
      <Text variant={TextVariant.bodyLarge}>Stake</Text>
      <div className="grid justify-center items-center">
        <div className="col-[1] row-[1] block w-full">
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
            TVL
          </Text>
          <CurrencyValueDisplay
            variant={TextVariant.bodyLarge}
            value={totalTVL}
            currency={currency}
          />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <ClaimStakeCardDataSet
          variant={StakeCardDataSetVariant.for}
          value={tvlFor}
          currency={currency}
        />
        <ClaimStakeCardDataSet
          variant={StakeCardDataSetVariant.against}
          value={tvlAgainst}
          currency={currency}
        />
      </div>
      <div className="flex justify-between items-center">
        <ClaimStakeCardDataSet
          variant={StakeCardDataSetVariant.for}
          value={amountFor}
        />
        <ClaimStakeCardDataSet
          variant={StakeCardDataSetVariant.against}
          value={amountAgainst}
        />
      </div>
      <div className="flex justify-between items-center gap-4 w-full mt-2">
        <Button
          variant={ButtonVariant.for}
          size={ButtonSize.md}
          disabled={disableForBtn || !onForBtnClick}
          onClick={onForBtnClick}
          className="w-full"
        >
          Deposit For
        </Button>
        <Button
          variant={ButtonVariant.against}
          size={ButtonSize.md}
          disabled={disableAgainstBtn || !onAgainstBtnClick}
          onClick={onAgainstBtnClick}
          className="w-full"
        >
          Deposit Against
        </Button>
      </div>
    </div>
  )
}

export { ClaimStakeCard }
