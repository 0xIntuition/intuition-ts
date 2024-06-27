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
    <div className="flex flex-col items-end">
      <MonetaryValue value={value} currency={currency} />

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
