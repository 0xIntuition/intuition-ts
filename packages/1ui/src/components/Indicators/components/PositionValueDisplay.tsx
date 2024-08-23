import { Currency, CurrencyType } from 'types'

import { Icon, IconName, Tag, TagVariant, TextProps } from '../..'
// import { FeesAccrued } from './FeesAccrued'
import { MonetaryValue } from './MonetaryValue'

export const PositionValueVariants = {
  identity: 'identity',
  claimFor: 'claimFor',
  claimAgainst: 'claimAgainst',
} as const

export type PositionValueVariantType =
  (typeof PositionValueVariants)[keyof typeof PositionValueVariants]

interface PositionValueDisplayProps extends TextProps {
  position: PositionValueVariantType
  value: number
  feesAccrued: number
  currency?: CurrencyType
}

const PositionValueDisplay = ({
  value,
  position,
  // feesAccrued,
  currency = Currency.ETH,
}: PositionValueDisplayProps) => {
  const renderBadge = () => {
    if (position === PositionValueVariants.claimFor) {
      return <Tag variant={TagVariant.for}>FOR</Tag>
    }
    if (position === PositionValueVariants.claimAgainst) {
      return <Tag variant={TagVariant.against}>AGAINST</Tag>
    }
    return null
  }
  return (
    <div className="flex items-center justify-start gap-2 max-sm:justify-between">
      <div className="h-full flex flex-col pt-1">{renderBadge()}</div>
      <div className="h-full flex flex-col items-end">
        <div className="flex gap-1 items-center">
          <Icon name={IconName.ethereum} className="text-primary/90 h-4 w-4" />
          <MonetaryValue
            value={value}
            currency={currency}
            className="text-primary/90"
          />
        </div>{' '}
        {/* TODO: Uncomment when feature is supported  */}
        {/* <FeesAccrued value={feesAccrued} currency={currency} /> */}
      </div>
    </div>
  )
}

export { PositionValueDisplay }
