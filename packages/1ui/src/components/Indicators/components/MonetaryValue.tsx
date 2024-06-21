import { Text, TextProps, TextVariant } from 'components/Text'

interface MonetaryValueProps extends TextProps {
  value: number
  symbol: string
}

const MonetaryValue = ({ value, symbol, ...props }: MonetaryValueProps) => {
  return (
    <Text variant={TextVariant.bodyLarge} {...props}>
      {value} {symbol}
    </Text>
  )
}

export { MonetaryValue }
