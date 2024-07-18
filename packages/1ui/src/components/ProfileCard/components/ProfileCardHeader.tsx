import { Identity, IdentityType } from 'types'
import { formatWalletAddress } from 'utils/wallet'

import { Avatar, Text } from '../..'

interface ProfileCardHeaderProps {
  variant?: IdentityType
  avatarSrc?: string
  name: string
  walletAddress: string
}

const ProfileCardHeader = ({
  variant = Identity.user,
  avatarSrc,
  name,
  walletAddress,
}: ProfileCardHeaderProps) => {
  return (
    <div className="flex items-center space-x-4">
      <Avatar variant={variant} src={avatarSrc} name={name} />
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
