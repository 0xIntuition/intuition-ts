import React, { useRef, useState } from 'react'

import {
  Avatar,
  Button,
  ButtonVariant,
  cn,
  Copy,
  CurrencyType,
  formatDate,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Icon,
  Identity,
  IdentityType,
  PositionValueDisplay,
  PositionValueVariants,
  ProfileCard,
  TagsContent,
  TagWithValue,
  TagWithValueProps,
  Text,
  TextVariant,
  TextWeight,
  Trunctacular,
} from '@0xintuition/1ui'

import { useNavigate } from '@remix-run/react'

export interface IdentityPositionRowProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: IdentityType
  amount: number
  currency?: CurrencyType
  feesAccrued: number
  name: string
  description: string
  id: string
  avatarSrc: string
  link: string
  ipfsLink: string
  updatedAt?: string
  tags?: TagWithValueProps[]
}

const IdentityPositionRow = ({
  variant = Identity.user,
  amount,
  currency,
  feesAccrued,
  name,
  description,
  id,
  avatarSrc,
  link,
  ipfsLink,
  updatedAt,
  tags,
  className,
}: IdentityPositionRowProps) => {
  const navigate = useNavigate()
  const [isInteractiveElement, setIsInteractiveElement] = useState(false)
  const linkRef = useRef<HTMLDivElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isInteractiveElement && link && event.target === linkRef.current) {
      navigate(link)
    }
  }

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement
    const interactiveElement = target.closest(
      'a, button, .identity-tag, .hover-card',
    )
    setIsInteractiveElement(!!interactiveElement)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && !isInteractiveElement && link) {
      navigate(link)
    }
  }

  return (
    <div
      ref={linkRef}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseMove={handleMouseMove}
      role={isInteractiveElement ? undefined : 'button'}
      tabIndex={isInteractiveElement ? undefined : 0}
      className={cn(
        `w-full flex justify-between max-sm:flex-col max-sm:items-center p-6`,
        `hover:bg-secondary/10 transition-colors duration-200 group`,
        isInteractiveElement ? 'cursor-default' : 'cursor-pointer',
        className,
      )}
    >
      <div className="flex items-center">
        <HoverCard openDelay={150} closeDelay={150}>
          <HoverCardTrigger asChild>
            <a href={link}>
              <Avatar
                variant={variant}
                src={avatarSrc}
                name={name}
                className="w-16 h-16 mr-4"
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
                    <Icon name={'arrow-up-right'} className="h-3 w-3" />{' '}
                  </Button>
                </a>
              )}
            </div>
          </HoverCardContent>
        </HoverCard>
        <div className="flex flex-col">
          <div className="flex items-center mb-1.5 max-sm:flex-col max-sm:gap-px max-sm:items-start">
            <a href={link}>
              <Trunctacular
                value={name}
                variant="bodyLarge"
                maxStringLength={42}
                className="mr-1"
              />
            </a>
            <div className="flex flex-row items-center gap-1">
              <a href={ipfsLink} target="_blank" rel="noreferrer noopener">
                <Trunctacular
                  value={id}
                  variant="body"
                  className="text-primary/60 hover:text-primary"
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

export { IdentityPositionRow }
