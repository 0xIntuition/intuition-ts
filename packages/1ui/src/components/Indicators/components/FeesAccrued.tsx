import { Text, TextProps, TextVariant, TextWeight } from 'components/Text'
import { Currency, CurrencyType } from 'types'

interface FeesAccruedProps extends TextProps {
  value: number
  currency?: CurrencyType
}

const FeesAccrued = ({
  value,
  currency = Currency.ETH,
  ...props
}: FeesAccruedProps) => {
  const formattedFeesAccrued = `${value > 0 ? '+' : ''}${value.toFixed(3)}`
  const amountClass = value > 0 ? 'text-success' : ''
  return (
    <Text
      variant={TextVariant.body}
      weight={TextWeight.medium}
      className={amountClass}
      {...props}
    >
      {formattedFeesAccrued} {currency}
    </Text>
  )
}

export { FeesAccrued }
