import { Text, TextProps, TextVariant } from 'components/Text'
import { Currency, CurrencyType } from 'types'

interface MonetaryValueProps extends TextProps {
  value: number
  currency?: CurrencyType
}

const MonetaryValue = ({
  value,
  currency = Currency.ETH,
  ...props
}: MonetaryValueProps) => {
  return (
    <Text variant={TextVariant.bodyLarge} {...props}>
      {value} {currency}
    </Text>
  )
}

export { MonetaryValue }
