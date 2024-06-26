import * as React from 'react'

import { CurrencyType } from 'types'
import { formatDate } from 'utils/date'
import { formatWalletAddress } from 'utils/wallet'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  PositionValueDisplay,
  TagsContent,
  TagWithValue,
  TagWithValueProps,
  Text,
  TextVariant,
  TextWeight,
} from '..'
import { ClaimPositionVariant, PositionVariant } from './ClaimPosition.utils'

export type ClaimPositionVariantType = keyof typeof ClaimPositionVariant
export type PositionVariantType = keyof typeof PositionVariant

interface CommonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant: ClaimPositionVariantType
  position: PositionVariantType
  amount: number
  currency?: CurrencyType
  feesAccrued: number
  name: string
  walletAddress: string
  avatarSrc: string
  updatedAt?: string
  tags?: TagWithValueProps[]
}

interface UserVariantProps extends CommonProps {
  variant: 'user'
  claimsFor?: never
  claimsAgainst?: never
}

interface ClaimVariantProps extends CommonProps {
  variant: 'claim'
  claimsFor: number
  claimsAgainst: number
}

type ClaimPositionProps = UserVariantProps | ClaimVariantProps

const ClaimPosition = ({
  variant,
  position,
  claimsFor,
  claimsAgainst,
  amount,
  currency,
  feesAccrued,
  name,
  walletAddress,
  avatarSrc,
  updatedAt,
  tags,
  children,
  ...props
}: ClaimPositionProps) => {
  const againstPercentage =
    ((claimsAgainst ?? 0) / ((claimsFor ?? 0) + (claimsAgainst ?? 0))) * 100

  return (
    <div className="w-full flex justify-between" {...props}>
      {variant === ClaimPositionVariant.user && (
        <div className="flex items-center">
          <Avatar className="w-16 h-16 mr-4">
            <AvatarImage src={avatarSrc} alt={name} />
            <AvatarFallback>{name.slice(0, 2)}</AvatarFallback>
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
      )}

      {variant === ClaimPositionVariant.claim && (
        <div className="flex flex-col justify-between w-[60%]">
          <div className="flex items-center h-[6px] mb-4">
            <span
              className="h-full bg-against block rounded-l-sm"
              style={{ width: `${againstPercentage}%` }}
            />
            <span className="h-full w-full bg-for block rounded-r-sm" />
          </div>
          {children}
        </div>
      )}

      <PositionValueDisplay
        value={amount}
        position={position}
        feesAccrued={feesAccrued}
        currency={currency}
      />
    </div>
  )
}

export { ClaimPosition }
