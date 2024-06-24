import * as React from 'react'

import { formatDate } from 'utils/date'
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
  TextWeight,
} from '..'
import { IdentityPositionVariant } from './IdentityPosition.utils'

export type IdentityPositionVariantType = keyof typeof IdentityPositionVariant

export interface IdentityPositionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant: IdentityPositionVariantType
  amount: number
  amountChange: number
  name: string
  walletAddress: string
  avatarSrc: string
  updatedAt?: string
  tags?: TagsBadgeProps[]
}

const IdentityPosition = ({
  variant,
  amount,
  amountChange,
  name,
  walletAddress,
  avatarSrc,
  updatedAt,
  tags,
  ...props
}: IdentityPositionProps) => {
  const formattedAmountChange = `${amountChange > 0 ? '+' : amountChange < 0 ? '-' : ''}${Math.abs(amountChange).toFixed(3)} ETH`
  const amountClass =
    amount > 0
      ? 'text-success'
      : amount < 0
        ? 'text-destructive-foreground'
        : 'text-muted-foreground'

  return (
    <div className="w-full flex justify-between" {...props}>
      <div className="flex items-center">
        <Avatar
          className={`w-16 h-16 mr-4 ${variant === IdentityPositionVariant.identity ? 'rounded-lg' : ''}`}
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
          {updatedAt && (
            <Text
              variant={TextVariant.caption}
              weight={TextWeight.medium}
              className="text-secondary-foreground mb-2"
            >
              Last update {formatDate(updatedAt)}
            </Text>
          )}
          {tags && tags.length > 0 && (
            <div className="flex gap-2 mt-1">
              <TagsBadges numberOfTags={tags.length}>
                {tags.slice(0, 4).map((tag, index) => (
                  <TagsBadge label={tag.label} value={tag.value} key={index} />
                ))}
              </TagsBadges>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col items-end justify-between">
        <Text variant={TextVariant.bodyLarge} className="">
          {amount} ETH
        </Text>

        <div className="flex items-center">
          <Text variant="bodyLarge" weight="medium" className={amountClass}>
            {formattedAmountChange}
          </Text>
        </div>
      </div>
    </div>
  )
}

export { IdentityPosition }
