import * as React from 'react'

import { cn } from 'styles'
import { CurrencyType, Identity, IdentityType } from 'types'

import {
  Avatar,
  Button,
  ButtonVariant,
  Copy,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Icon,
  IdentityValueDisplay,
  ProfileCard,
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
  description: string
  id: string
  claimLink?: string
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
          maxStringLength={42}
        />
      </a>
      <div className="flex flex-row gap-1 items-center">
        <a href={ipfsLink} target="_blank" rel="noreferrer noreopener">
          <Trunctacular
            value={id}
            className="text-secondary-foreground"
            maxStringLength={16}
          />
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
  description,
  id,
  claimLink,
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

  const content = (
    <div
      className={cn(
        `w-full flex justify-between items-center max-sm:flex-col max-sm:gap-3`,
        className,
      )}
      {...props}
    >
      <div className="flex items-center">
        <HoverCard openDelay={100} closeDelay={100}>
          <HoverCardTrigger asChild>
            <a href={claimLink || link}>
              <Avatar
                variant={variant}
                src={avatarSrc}
                name={name}
                className="mr-4 w-[64px] h-[64px]"
              />
            </a>
          </HoverCardTrigger>
          <HoverCardContent side="right" className="w-max">
            <div className="flex flex-col gap-4 w-80 max-md:w-[80%]">
              <ProfileCard
                variant={variant}
                avatarSrc={avatarSrc ?? ''}
                name={name}
                id={id ?? ''}
                bio={description ?? ''}
                ipfsLink={ipfsLink}
                className="profile-card"
              />
              {link && (
                <a href={link}>
                  <Button variant={ButtonVariant.secondary} className="w-full">
                    View Identity{' '}
                    <Icon name={'arrow-up-right'} className="h-3 w-3" />
                  </Button>
                </a>
              )}
            </div>
          </HoverCardContent>
        </HoverCard>
        <div className="flex flex-col">
          <NameAndAddress
            name={name}
            id={id}
            link={claimLink || link}
            ipfsLink={ipfsLink}
            hasTags={hasTags}
          />
          {hasTags && (
            <div className="flex gap-2 mt-1">
              <TagsContent numberOfTags={tags.length} link={link}>
                {tags.slice(0, 2).map((tag, index) => (
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
  )

  return (
    <div className="w-full">
      {content}
      {children}
    </div>
  )
}

export { IdentityContentRow }
