import { Icon, IconName } from 'components/Icon'
import { Text, TextVariant } from 'components/Text'
import { CurrencyType } from 'types'

import { MonetaryValue } from './MonetaryValue'

interface ClaimValueDisplayProps extends React.HTMLAttributes<HTMLDivElement> {
  tvl: number
  currency?: CurrencyType
  claimsFor: number
  claimsAgainst: number
}

const ClaimValueDisplay = ({
  tvl,
  currency,
  claimsFor,
  claimsAgainst,
}: ClaimValueDisplayProps) => {
  return (
    <div className="flex flex-col items-end max-md:flex-row max-md:justify-between max-md:items-center">
      <div className="flex gap-1 items-center">
        <Icon name={IconName.ethereum} className="text-primary/90 h-4 w-4" />
        <MonetaryValue
          value={tvl}
          currency={currency}
          className="text-primary/90"
        />
      </div>
      <div className="flex gap-2 items-center mt-2 max-md:mt-0">
        <div className="flex gap-1 items-center">
          <Icon name={IconName.people} className="text-for h-4 w-4" />
          <Text
            variant={TextVariant.body}
            className="text-secondary-foreground"
          >
            {claimsFor}
          </Text>
        </div>
        <div className="flex gap-1 items-center">
          <Icon name={IconName.people} className="text-against h-4 w-4" />
          <Text
            variant={TextVariant.body}
            className="text-secondary-foreground"
          >
            {claimsAgainst}
          </Text>
        </div>
      </div>
    </div>
  )
}

export { ClaimValueDisplay }
