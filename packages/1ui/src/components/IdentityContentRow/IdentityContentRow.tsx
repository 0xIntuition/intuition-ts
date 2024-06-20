import * as React from 'react'

import { formatWalletAddress } from 'utils/wallet'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Icon,
  IconName,
  Text,
  TextVariant,
} from '..'
import { ProfileVariant } from '../ProfileCard/ProfileCard.utils'

export interface IdentityContentRowProps
  extends React.HTMLAttributes<HTMLDivElement> {
  amountFor: string
  totalFollowers: number
  type: string
  avatarSrc: string
  name: string
  walletAddress: string
}

const IdentityContentRow = ({
  type,
  avatarSrc,
  name,
  walletAddress,
  amountFor,
  totalFollowers,
  children,
  ...props
}: IdentityContentRowProps) => {
  const avatarClass = type === ProfileVariant.entity ? 'rounded-lg' : ''

  return (
    <div className="flex gap-2" {...props}>
      <Avatar className={avatarClass}>
        <AvatarImage src={avatarSrc} alt={name} />
        <AvatarFallback>{name.slice(0, 2)}</AvatarFallback>
      </Avatar>
      <div className="flex-col gap-2">
        <div className="flex justify-between items-center">
          <div>
            <Text variant={TextVariant.bodyLarge}>{name}</Text>
            <Text
              variant={TextVariant.body}
              className="text-secondary-foreground"
            >
              {formatWalletAddress(walletAddress)}
            </Text>
          </div>
          <Text variant={TextVariant.bodyLarge}>{amountFor}</Text>
        </div>
        <div className="flex justify-between items-center">
          {children}
          <div className="flex gap-1 items-center">
            <Icon
              name={IconName.people}
              className="text-secondary-foreground h-4 w-4"
            />
            <Text
              variant={TextVariant.body}
              className="text-secondary-foreground"
            >
              {totalFollowers}
            </Text>
          </div>
        </div>
      </div>
    </div>
  )
}

export { IdentityContentRow }
