import * as React from 'react'

import { ClaimStatus } from 'components/Dataset'
import { CurrencyType } from 'types'
import { formatDate } from 'utils/date'
import { formatWalletAddress } from 'utils/wallet'

import {
  Avatar,
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
  updatedAt?: string
  tags?: TagWithValueProps[]
}

interface UserVariantProps extends CommonProps {
  variant: 'user'
  claimsFor?: never
  claimsAgainst?: never
  name: string
  avatarSrc: string
  walletAddress: string
}

interface ClaimVariantProps extends CommonProps {
  variant: 'claim'
  claimsFor: number
  claimsAgainst: number
  name?: never
  avatarSrc?: never
  walletAddress?: never
}

type ClaimPositionProps = UserVariantProps | ClaimVariantProps

const ClaimPosition = ({
  variant,
  position,
  claimsFor = 0,
  claimsAgainst = 0,
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
  return (
    <div className="w-full flex justify-between" {...props}>
      {variant === ClaimPositionVariant.user && (
        <div className="flex items-center">
          <Avatar src={avatarSrc} name={name} className="w-16 h-16 mr-4" />
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
        <ClaimStatus claimsFor={claimsFor} claimsAgainst={claimsAgainst}>
          {children}
        </ClaimStatus>
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
