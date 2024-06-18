import { Text } from 'components/Text'

import { formatNumber } from '../ProfileCard.utils'

interface ProfileCardStatItemProps {
  value: number | string
  label: string
  valueClassName?: string
}

const ProfileCardStatItem = ({
  value,
  label,
  valueClassName = 'text-primary-300',
}: ProfileCardStatItemProps) => {
  const formattedValue = typeof value === 'number' ? formatNumber(value) : value

  return (
    <div className="flex items-center space-x-1">
      <Text variant="body" weight="medium" className={valueClassName}>
        {formattedValue}
      </Text>
      <Text variant="body" className="text-foreground-muted">
        {label}
      </Text>
    </div>
  )
}

export { ProfileCardStatItem }
