import { Identity, IdentityType } from 'types'

import { Avatar, Copy, Text, Trunctacular } from '../..'

interface ProfileCardHeaderProps {
  variant?: IdentityType
  avatarSrc?: string
  name: string
  walletAddress: string
  ipfsLink: string
}

const ProfileCardHeader = ({
  variant = Identity.user,
  avatarSrc,
  name,
  walletAddress,
  ipfsLink,
}: ProfileCardHeaderProps) => {
  return (
    <div className="flex items-center space-x-4">
      <Avatar variant={variant} src={avatarSrc} name={name} />
      <div>
        <Text variant="headline" weight="medium" className="text-primary">
          {name}
        </Text>
        <div className="flex flex-row gap-1 items-center">
          <a href={ipfsLink} target="_blank" rel="noopener noreferrer">
            <Trunctacular
              value={walletAddress}
              variant="body"
              weight="medium"
              className="text-muted-foreground"
              maxStringLength={24}
            />
          </a>
          <Copy text={walletAddress} />
        </div>
      </div>
    </div>
  )
}

export { ProfileCardHeader }
