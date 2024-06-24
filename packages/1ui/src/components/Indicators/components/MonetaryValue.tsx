import { Text, TextProps, TextVariant } from 'components/Text'
import { Currency, CurrencyType } from 'types'

interface MonetaryValueProps extends TextProps {
  value: number
  symbol?: CurrencyType
}

const MonetaryValue = ({
  value,
  symbol = Currency.ETH,
  ...props
}: MonetaryValueProps) => {
  return (
    <Text variant={TextVariant.bodyLarge} {...props}>
      {value} {symbol}
    </Text>
  )
}

export { MonetaryValue }
