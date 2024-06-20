import * as React from 'react'

import { formatWalletAddress } from 'utils/wallet'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Icon,
  IconName,
  TagsBadge,
  TagsBadgeProps,
  TagsBadges,
  Text,
  TextVariant,
} from '..'
import { IdentityVariant } from './IdentityContentRow.utils'

export interface IdentityContentRowProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant: string
  amount: string
  name: string
  walletAddress: string
  avatarSrc: string
  totalFollowers: number
  tags?: TagsBadgeProps[]
}

const IdentityContentRow = ({
  variant,
  amount,
  name,
  walletAddress,
  avatarSrc,
  totalFollowers,
  tags,
  children,
  ...props
}: IdentityContentRowProps) => {
  return (
    <div className="w-full mb-4">
      <div className="w-full flex justify-between items-center" {...props}>
        <div className="flex items-center">
          <Avatar className="mr-4">
            <AvatarImage src={avatarSrc} alt={name} />
            {variant === IdentityVariant.user && (
              <AvatarFallback>{name.slice(0, 2)}</AvatarFallback>
            )}
            {variant === IdentityVariant.entity && (
              <AvatarFallback>
                <Icon
                  name={IconName.fingerprint}
                  className="h-full w-full rounded-lg"
                />
              </AvatarFallback>
            )}
          </Avatar>
          <div className="flex flex-col">
            <div className="flex items-center">
              <Text variant={TextVariant.bodyLarge} className="mr-1">
                {name}
              </Text>
              <Text
                variant={TextVariant.body}
                className="text-secondary-foreground"
              >
                {formatWalletAddress(walletAddress)}
              </Text>
            </div>
            {tags && tags.length > 0 && (
              <div className="flex gap-2 mt-1">
                <TagsBadges numberOfTags={tags.length}>
                  {tags.slice(0, 4).map((tag, index) => (
                    <TagsBadge
                      label={tag.label}
                      value={tag.value}
                      key={index}
                    />
                  ))}
                </TagsBadges>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col items-end">
          <Text variant={TextVariant.bodyLarge}>{amount}</Text>

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
      {children}
    </div>
  )
}

export { IdentityContentRow }
