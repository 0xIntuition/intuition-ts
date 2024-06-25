import React from 'react'

import { Badge, BadgeVariant } from 'components/Badge'
import { Text, TextProps, TextVariant, TextWeight } from 'components/Text'
import { Currency, CurrencyType } from 'types'

import { MonetaryValue } from './MonetaryValue'

export const PositionValueVariants = {
  identity: 'identity',
  claimFor: 'claimFor',
  claimAgainst: 'claimAgainst',
} as const

export type PositionValueVariant =
  (typeof PositionValueVariants)[keyof typeof PositionValueVariants]

interface PositionValueDisplayProps extends TextProps {
  position: PositionValueVariant
  value: number
  feesAccrued: number
  currency?: CurrencyType
}

const PositionValueDisplay = ({
  value,
  position,
  feesAccrued,
  currency = Currency.ETH,
}: PositionValueDisplayProps) => {
  const formattedFeesAccrued = `${feesAccrued > 0 ? '+' : ''}${feesAccrued.toFixed(3)}`
  const amountClass = feesAccrued > 0 ? 'text-success' : ''

  const renderBadge = () => {
    if (position === PositionValueVariants.claimFor) {
      return (
        <Badge variant={BadgeVariant.outline} className="border-for text-for">
          FOR
        </Badge>
      )
    }
    if (position === PositionValueVariants.claimAgainst) {
      return (
        <Badge
          variant={BadgeVariant.outline}
          className="border-against text-against"
        >
          AGAINST
        </Badge>
      )
    }
    return null
  }
  return (
    <div className="flex items-center justify-start gap-2">
      <div className="flex flex-col self-start pt-1">{renderBadge()}</div>
      <div className="flex flex-col items-end">
        <MonetaryValue value={value} currency={currency} />
        <Text
          variant={TextVariant.body}
          weight={TextWeight.medium}
          className={amountClass}
        >
          {formattedFeesAccrued} {currency}
        </Text>
      </div>
    </div>
  )
}

export { PositionValueDisplay }
