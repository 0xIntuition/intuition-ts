import * as React from 'react'

import { cn } from 'styles'
import { CurrencyType, Identity, IdentityType } from 'types'

import {
  Avatar,
  Copy,
  IdentityValueDisplay,
  TagsContent,
  TagWithValue,
  TagWithValueProps,
  TextVariant,
  Trunctacular,
} from '..'

export interface IdentityContentRowProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: IdentityType
  amount: number
  currency?: CurrencyType
  name: string
  id: string
  avatarSrc: string
  link: string
  ipfsLink: string
  totalFollowers: number
  tags?: TagWithValueProps[]
}

interface NameAndAddressProps {
  name: string
  id: string
  link: string
  ipfsLink: string
  hasTags: boolean
}

const NameAndAddress = ({
  name,
  id,
  link,
  ipfsLink,
  hasTags,
}: NameAndAddressProps) => {
  return (
    <div
      className={cn(
        'mb-1 flex',
        hasTags ? 'flex-row items-center' : 'flex-col',
      )}
    >
      <a href={link}>
        <Trunctacular
          value={name}
          variant={TextVariant.bodyLarge}
          className="mr-2"
          maxStringLength={32}
        />
      </a>
      <div className="flex flex-row gap-1 items-center">
        <a href={ipfsLink} target="_blank" rel="noreferrer noreopener">
          <Trunctacular value={id} className="text-secondary-foreground" />
        </a>
        <Copy text={id} />
      </div>
    </div>
  )
}

const IdentityContentRow = ({
  variant = Identity.user,
  amount,
  currency,
  name,
  id,
  avatarSrc,
  link,
  ipfsLink,
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
          <a href={link}>
            <Avatar
              variant={variant}
              src={avatarSrc}
              name={name}
              className="mr-4 w-[64px] h-[64px]"
            />
          </a>
          <div className="flex flex-col">
            <NameAndAddress
              name={name}
              id={id}
              link={link}
              ipfsLink={ipfsLink}
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
