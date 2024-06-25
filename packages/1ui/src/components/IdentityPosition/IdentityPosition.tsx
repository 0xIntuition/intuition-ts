import * as React from 'react'

import { CurrencyType } from 'types'
import { formatDate } from 'utils/date'
import { formatWalletAddress } from 'utils/wallet'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Icon,
  IconName,
  PositionValueDisplay,
  TagsContent,
  TagWithValue,
  TagWithValueProps,
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
  currency?: CurrencyType
  feesAccrued: number
  name: string
  walletAddress: string
  avatarSrc: string
  updatedAt?: string
  tags?: TagWithValueProps[]
}

const IdentityPosition = ({
  variant,
  amount,
  currency,
  feesAccrued,
  name,
  walletAddress,
  avatarSrc,
  updatedAt,
  tags,
  ...props
}: IdentityPositionProps) => {
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
              <TagsContent numberOfTags={tags.length}>
                {tags.slice(0, 4).map((tag, index) => (
                  <TagWithValue
                    label={tag.label}
                    value={tag.value}
                    key={index}
                  />
                ))}
              </TagsContent>
            </div>
          )}
        </div>
      </div>

      <PositionValueDisplay
        value={amount}
        position="identity"
        feesAccrued={feesAccrued}
        currency={currency}
      />
    </div>
  )
}

export { IdentityPosition }
