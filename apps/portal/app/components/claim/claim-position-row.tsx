import React, { useRef, useState } from 'react'

import {
  Avatar,
  ClaimPositionType,
  ClaimStatus,
  cn,
  Copy,
  CurrencyType,
  formatDate,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  PositionValueDisplay,
  ProfileCard,
  TagsContent,
  TagWithValue,
  TagWithValueProps,
  Text,
  TextVariant,
  TextWeight,
  Trunctacular,
} from '@0xintuition/1ui'
import {
  ClaimPositionRowVariant,
  ClaimPositionRowVariantType,
} from '@0xintuition/1ui/src/components/ClaimPositionRow/ClaimPositionRow.utils'

import { useNavigate } from '@remix-run/react'

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
  description?: string
  avatarSrc: string
  link: string
  id: string
}

interface ClaimVariantProps extends CommonProps {
  variant: 'claim'
  claimsFor: number
  claimsAgainst: number
  name?: never
  description?: never
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
  description,
  id,
  avatarSrc,
  link,
  ipfsLink,
  updatedAt,
  tags,
  children,
  className,
}: ClaimPositionRowProps) => {
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
        `w-full flex justify-between max-sm:flex-col max-sm:gap-2 p-6`,
        `hover:bg-secondary/10 transition-colors duration-200 group`,
        isInteractiveElement ? 'cursor-default' : 'cursor-pointer',
        className,
      )}
    >
      {variant === ClaimPositionRowVariant.user && (
        <div className="flex items-center max-sm:justify-center">
          <HoverCard openDelay={150} closeDelay={150}>
            <HoverCardTrigger asChild>
              <a href={link}>
                <Avatar
                  variant={variant}
                  src={avatarSrc}
                  name={name}
                  className="mr-4 w-[64px] h-[64px]"
                />
              </a>
            </HoverCardTrigger>
            <HoverCardContent side="right" className="w-max hover-card">
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
                {/* {link && (
                  <a href={link}>
                    <Button
                      variant={ButtonVariant.secondary}
                      className="w-full"
                    >
                      View Identity{' '}
                      <Icon name={'arrow-up-right'} className="h-3 w-3" />
                    </Button>
                  </a>
                )} */}
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
