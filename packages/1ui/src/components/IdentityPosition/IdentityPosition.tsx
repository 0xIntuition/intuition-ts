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
import { IdentityPositionVariant } from './IdentityPosition.utils'

export interface IdentityPositionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant: string
  amount: number
  name: string
  walletAddress: string
  avatarSrc: string
  tags?: TagsBadgeProps[]
}

const IdentityPosition = ({
  variant,
  amount,
  name,
  walletAddress,
  avatarSrc,
  tags,
  children,
  ...props
}: IdentityPositionProps) => {
  const formattedAmount = `${amount > 0 ? '+' : amount < 0 ? '-' : ''}${Math.abs(amount).toFixed(3)} ETH`
  const amountClass =
    amount > 0
      ? 'text-success'
      : amount < 0
        ? 'text-destructive-foreground'
        : 'text-muted-foreground'

  return (
    <div className="w-full mb-4">
      <div className="w-full flex justify-between items-center" {...props}>
        <div className="flex items-center">
          <Avatar
            className={`w-[64px] h-[64px] mr-4 ${variant === IdentityPositionVariant.identity ? 'rounded-lg' : ''}`}
          >
            <AvatarImage src={avatarSrc} alt={name} />
            {variant === IdentityPositionVariant.user && (
              <AvatarFallback>{name.slice(0, 2)}</AvatarFallback>
            )}
            {variant === IdentityPositionVariant.identity && (
              <AvatarFallback className="rounded-lg">
                <Icon name={IconName.fingerprint} className="h-full w-full" />
              </AvatarFallback>
            )}
          </Avatar>
          <div className="flex flex-col">
            <div className="flex items-center mb-1.5">
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
          <Text variant={TextVariant.bodyLarge} className="mb-1.5">
            {amount}
          </Text>

          <div className="flex items-center">
            <Text variant="bodyLarge" weight="medium" className={amountClass}>
              {formattedAmount}
            </Text>
          </div>
        </div>
      </div>
      {children}
    </div>
  )
}

export { IdentityPosition }
