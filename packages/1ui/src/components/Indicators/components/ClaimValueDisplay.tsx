import { Icon, IconName } from 'components/Icon'
import { Text, TextVariant } from 'components/Text'
import { CurrencyType } from 'types'

import { MonetaryValue } from './MonetaryValue'

interface ClaimValueDisplayProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  currency?: CurrencyType
  claimsFor: number
  claimsAgainst: number
}

const ClaimValueDisplay = ({
  value,
  currency,
  claimsFor,
  claimsAgainst,
}: ClaimValueDisplayProps) => {
  return (
    <div className="flex flex-col items-end">
      <MonetaryValue
        variant={TextVariant.bodyLarge}
        value={value}
        currency={currency}
      />
      <div className="flex gap-2 items-center mt-2">
        <div className="flex gap-1 items-center">
          <Icon name={IconName.people} className="text-against h-4 w-4" />
          <Text
            variant={TextVariant.body}
            className="text-secondary-foreground"
          >
            {claimsAgainst}
          </Text>
        </div>
        <div className="flex gap-1 items-center">
          <Icon name={IconName.people} className="text-for h-4 w-4" />
          <Text
            variant={TextVariant.body}
            className="text-secondary-foreground"
          >
            {claimsFor}
          </Text>
        </div>
      </div>
    </div>
  )
}

export { ClaimValueDisplay }
