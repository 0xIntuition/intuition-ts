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
import { IdentityVariant } from './IdentityContentRow.utils'

export interface IdentityContentRowProps
  extends React.HTMLAttributes<HTMLDivElement> {
  amount: string
  totalFollowers: number
  variant: string
  avatarSrc: string
  name: string
  walletAddress: string
}

const IdentityContentRow = ({
  variant,
  avatarSrc,
  name,
  walletAddress,
  amount,
  totalFollowers,
  children,
  ...props
}: IdentityContentRowProps) => {
  const avatarClass = variant === IdentityVariant.entity ? 'rounded-lg' : ''

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
          <Text variant={TextVariant.bodyLarge}>{amount}</Text>
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
