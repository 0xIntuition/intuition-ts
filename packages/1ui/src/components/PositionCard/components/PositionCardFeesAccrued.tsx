import { FeesAccrued } from 'components/Indicators'
import { Text, TextVariant, TextWeight } from 'components/Text'
import { CurrencyType } from 'types'

interface PositionCardFeesAccruedProps
  extends React.HTMLAttributes<HTMLDivElement> {
  amount: number
  currency?: CurrencyType
}

const PositionCardFeesAccrued = ({
  amount,
  currency,
}: PositionCardFeesAccruedProps) => {
  return (
    <div className="flex flex-col">
      <Text
        variant={TextVariant.caption}
        weight={TextWeight.medium}
        className="text-muted-foreground mb-0.5"
      >
        Fees Accrued
      </Text>
      <FeesAccrued
        value={amount}
        currency={currency}
        variant={TextVariant.bodyLarge}
        weight={TextWeight.medium}
      />
    </div>
  )
}

export { PositionCardFeesAccrued }
