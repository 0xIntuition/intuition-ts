import { MonetaryValue } from 'components/Indicators'
import { Text } from 'components/Text'
import { CurrencyType } from 'types'

interface PositionCardStakedProps extends React.HTMLAttributes<HTMLDivElement> {
  amount: number
  currency?: CurrencyType
}

const PositionCardStaked = ({
  amount,
  currency,
  className,
}: PositionCardStakedProps) => {
  return (
    <div className="flex flex-col max-lg:items-center">
      <Text variant="caption" className="text-muted-foreground mb-0.5">
        Amount Staked
      </Text>
      <MonetaryValue
        variant="bodyLarge"
        value={amount}
        currency={currency}
        className={className}
      />
    </div>
  )
}

export { PositionCardStaked }
