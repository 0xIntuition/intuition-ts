import * as React from 'react'

import { cn } from 'styles'
import { CurrencyType, Identity, IdentityType } from 'types'
import { formatDate } from 'utils/date'

import {
  Avatar,
  Copy,
  PositionValueDisplay,
  PositionValueVariants,
  TagsContent,
  TagWithValue,
  TagWithValueProps,
  Text,
  TextVariant,
  TextWeight,
  Trunctacular,
} from '..'

export interface IdentityPositionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: IdentityType
  amount: number
  currency?: CurrencyType
  feesAccrued: number
  name: string
  id: string
  avatarSrc: string
  link: string
  ipfsLink: string
  updatedAt?: string
  tags?: TagWithValueProps[]
}

const IdentityPosition = ({
  variant = Identity.user,
  amount,
  currency,
  feesAccrued,
  name,
  id,
  avatarSrc,
  link,
  ipfsLink,
  updatedAt,
  tags,
  className,
  ...props
}: IdentityPositionProps) => {
  return (
    <div
      className={cn(
        `w-full flex justify-between max-sm:flex-col max-sm:items-center`,
        className,
      )}
      {...props}
    >
      <div className="flex items-center">
        <a href={link}>
          <Avatar
            variant={variant}
            src={avatarSrc}
            name={name}
            className="w-16 h-16 mr-4"
          />
        </a>
        <div className="flex flex-col">
          <div className="flex items-center mb-1.5 max-sm:flex-col max-sm:gap-px max-sm:items-start">
            <a href={link}>
              <Trunctacular value={name} variant="bodyLarge" className="mr-1" />
            </a>
            <div className="flex flex-row items-center gap-1">
              <a href={ipfsLink}>
                <Trunctacular
                  value={id}
                  variant="body"
                  className="text-secondary-foreground"
                />
              </a>
              <Copy text={id} className="text-secondary-foreground" />
            </div>
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
        position={PositionValueVariants.identity}
        feesAccrued={feesAccrued}
        currency={currency}
      />
    </div>
  )
}

export { IdentityPosition }
