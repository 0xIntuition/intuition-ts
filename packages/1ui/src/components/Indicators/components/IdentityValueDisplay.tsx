import { Icon, IconName } from 'components/Icon'
import { Text, TextVariant } from 'components/Text'
import { CurrencyType } from 'types'

import { MonetaryValue } from './MonetaryValue'

interface IdentityValueDisplayProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  currency?: CurrencyType
  followers: number
}

const IdentityValueDisplay = ({
  value,
  currency,
  followers,
}: IdentityValueDisplayProps) => {
  return (
    <div className="flex flex-col items-end max-sm:flex-row max-sm:justify-between max-sm:items-center max-sm:w-full">
      <div className="flex gap-1 items-center">
        <Icon name={IconName.ethereum} className="text-primary/90 h-4 w-4" />
        <MonetaryValue
          value={value}
          currency={currency}
          className="text-primary/90"
        />
      </div>
      <div className="flex gap-1 items-center">
        <Icon
          name={IconName.people}
          className="text-secondary-foreground h-4 w-4"
        />
        <Text variant={TextVariant.body} className="text-secondary-foreground">
          {followers}
        </Text>
      </div>
    </div>
  )
}

export { IdentityValueDisplay }
