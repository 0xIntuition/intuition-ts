import * as React from 'react'

import {
  Avatar,
  ClaimStatus,
  Copy,
  PositionValueDisplay,
  TagsContent,
  TagWithValue,
  TagWithValueProps,
  Text,
  TextVariant,
  TextWeight,
  Trunctacular,
} from 'components'
import { cn } from 'styles'
import { ClaimPositionType, CurrencyType } from 'types'
import { formatDate } from 'utils/date'

import {
  ClaimPositionRowVariant,
  ClaimPositionRowVariantType,
} from './ClaimPositionRow.utils'

interface CommonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant: ClaimPositionRowVariantType
  position: ClaimPositionType
  amount: number
  currency?: CurrencyType
  feesAccrued: number
  updatedAt?: string
  tags?: TagWithValueProps[]
  claimsForValue?: number
  claimsAgainstValue?: number
  link: string
  ipfsLink?: string
}

interface UserVariantProps extends CommonProps {
  variant: 'user'
  claimsFor?: number
  claimsAgainst?: number
  name: string
  avatarSrc: string
  link: string
  id: string
}

interface ClaimVariantProps extends CommonProps {
  variant: 'claim'
  claimsFor: number
  claimsAgainst: number
  name?: never
  avatarSrc?: never
  id?: never
}

type ClaimPositionRowProps = UserVariantProps | ClaimVariantProps

const ClaimPositionRow = ({
  variant,
  position,
  claimsFor = 0,
  claimsAgainst = 0,
  claimsForValue = 0,
  claimsAgainstValue = 0,
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
  children,
  className,
  ...props
}: ClaimPositionRowProps) => {
  return (
    <div
      className={cn(
        `w-full flex justify-between max-sm:flex-col max-sm:gap-2`,
        className,
      )}
      {...props}
    >
      {variant === ClaimPositionRowVariant.user && (
        <div className="flex items-center max-sm:justify-center">
          <Avatar src={avatarSrc} name={name} className="w-16 h-16 mr-4" />
          <div className="flex flex-col">
            <div className="flex items-center mb-1.5 max-sm:flex-col max-sm:gap-px max-sm:items-start">
              <a href={link}>
                <Trunctacular
                  value={name}
                  variant="bodyLarge"
                  className="mr-1"
                />
              </a>
              <div className="flex flex-row items-center gap-1">
                <a href={ipfsLink} target="_blank" rel="noreferrer noopener">
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
      )}

      {variant === ClaimPositionRowVariant.claim && (
        <div className="w-[60%] max-sm:w-full">
          <ClaimStatus
            claimsFor={claimsFor}
            claimsAgainst={claimsAgainst}
            claimsForValue={claimsForValue}
            claimsAgainstValue={claimsAgainstValue}
            className="w-[60%] max-sm:w-full"
          >
            {children}
          </ClaimStatus>
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

export { ClaimPositionRow }
