import * as React from 'react'

import { PositionVariant } from 'components/ClaimPosition/ClaimPosition.utils'
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

type PositionVariantType = keyof typeof PositionVariant

interface FollowPositionProps extends React.HTMLAttributes<HTMLDivElement> {
  position: PositionVariantType
  amount: number
  name: string
  avatarSrc: string
  walletAddress: string
  feesAccrued: number
  currency?: CurrencyType
  updatedAt?: string
  tags?: TagWithValueProps[]
}

const FollowPosition = ({
  position,
  amount,
  currency,
  feesAccrued,
  name,
  walletAddress,
  avatarSrc,
  updatedAt,
  tags,
  ...props
}: FollowPositionProps) => {
  return (
    <div className="w-full flex justify-between" {...props}>
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

      <PositionValueDisplay
        value={amount}
        position={position}
        feesAccrued={feesAccrued}
        currency={currency}
      />
    </div>
  )
}

export { FollowPosition }
