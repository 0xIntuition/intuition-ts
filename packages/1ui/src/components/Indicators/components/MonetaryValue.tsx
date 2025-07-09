import {
  Text,
  TextVariant,
  TextWeight,
  type TextProps,
  type TextVariantType,
} from 'components/Text'
import { Currency, type CurrencyType } from 'types'

interface MonetaryValueProps extends TextProps {
  value: number
  currency?: CurrencyType
  textVariant?: TextVariantType
}

const MonetaryValue = ({
  value,
  currency = Currency.ETH,
  textVariant = TextVariant.bodyLarge,
  ...props
}: MonetaryValueProps) => {
  return (
    <Text variant={textVariant} weight={TextWeight.medium} {...props}>
      {value} {currency}
    </Text>
  )
}

export { MonetaryValue }
