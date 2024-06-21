import { Avatar, AvatarFallback, AvatarImage } from 'components/Avatar'
import { Text } from 'components/Text'
import { formatWalletAddress } from 'utils/wallet'

import { ProfileVariantType } from '../ProfileCard'
import { ProfileVariant } from '../ProfileCard.utils'

interface ProfileCardHeaderProps {
  variant: ProfileVariantType
  avatarSrc: string
  name: string
  walletAddress: string
}

const ProfileCardHeader = ({
  variant,
  avatarSrc,
  name,
  walletAddress,
}: ProfileCardHeaderProps) => {
  const avatarClass = variant === ProfileVariant.entity ? 'rounded-lg' : ''

  return (
    <div className="flex items-center space-x-4">
      <Avatar className={avatarClass}>
        <AvatarImage src={avatarSrc} alt={name} />
        <AvatarFallback>{name.slice(0, 2)}</AvatarFallback>
      </Avatar>
      <div>
        <Text variant="headline" weight="medium" className="text-primary">
          {name}
        </Text>
        <Text variant="body" weight="medium" className="text-muted-foreground">
          {formatWalletAddress(walletAddress)}
        </Text>
      </div>
    </div>
  )
}

export { ProfileCardHeader }
