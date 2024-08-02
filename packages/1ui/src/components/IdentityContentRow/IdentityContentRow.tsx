import * as React from 'react'

import { cn } from 'styles'
import { CurrencyType, Identity, IdentityType } from 'types'
import { formatWalletAddress } from 'utils/wallet'

import {
  Avatar,
  IdentityValueDisplay,
  TagsContent,
  TagWithValue,
  TagWithValueProps,
  Text,
  TextVariant,
} from '..'

export interface IdentityContentRowProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: IdentityType
  amount: number
  currency?: CurrencyType
  name: string
  walletAddress: string
  avatarSrc: string
  totalFollowers: number
  tags?: TagWithValueProps[]
}

interface NameAndAddressProps {
  name: string
  walletAddress: string
  hasTags: boolean
}

const NameAndAddress = ({
  name,
  walletAddress,
  hasTags,
}: NameAndAddressProps) => {
  return (
    <div
      className={cn(
        'mb-1 flex',
        hasTags ? 'flex-row items-center' : 'flex-col',
      )}
    >
      <Text variant={TextVariant.bodyLarge} className="mr-2">
        {name}
      </Text>
      <Text variant={TextVariant.body} className="text-secondary-foreground">
        {formatWalletAddress(walletAddress)}
      </Text>
    </div>
  )
}

const IdentityContentRow = ({
  variant = Identity.user,
  amount,
  currency,
  name,
  walletAddress,
  avatarSrc,
  totalFollowers,
  tags,
  children,
  className,
  ...props
}: IdentityContentRowProps) => {
  const hasTags = !!(tags && tags.length > 0)

  return (
    <div className="w-full">
      <div
        className={cn(
          `w-full flex justify-between items-center max-sm:flex-col max-sm:gap-3`,
          className,
        )}
        {...props}
      >
        <div className="flex items-center">
          <Avatar
            variant={variant}
            src={avatarSrc}
            name={name}
            className="mr-4 w-[64px] h-[64px]"
          />
          <div className="flex flex-col">
            <NameAndAddress
              name={name}
              walletAddress={walletAddress}
              hasTags={hasTags}
            />
            {hasTags && (
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

        <IdentityValueDisplay
          value={amount}
          currency={currency}
          followers={totalFollowers}
        />
      </div>
      {children}
    </div>
  )
}

export { IdentityContentRow }
