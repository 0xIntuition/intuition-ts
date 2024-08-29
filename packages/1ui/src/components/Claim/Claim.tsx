import { useState } from 'react'

import { Button, ButtonVariant } from 'components/Button'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from 'components/HoverCard'
import { Icon } from 'components/Icon'
import { IdentityTag, IdentityTagSize } from 'components/IdentityTag'
import { ProfileCard } from 'components/ProfileCard'
import { Separator } from 'components/Separator'
import { Trunctacular } from 'components/Trunctacular'
import { Fragment } from 'react/jsx-runtime'
import { cn } from 'styles'
import { IdentityType } from 'types'

interface ClaimItemProps {
  variant?: IdentityType
  label: string
  imgSrc?: string | null
  id?: string | null
  description?: string | null
  ipfsLink?: string
  link?: string
  shouldHover?: boolean
}

export interface ClaimProps {
  size?: keyof typeof IdentityTagSize
  disabled?: boolean
  subject: ClaimItemProps
  predicate: ClaimItemProps
  object: ClaimItemProps
  maxIdentityLength?: number
}

const ClaimItem = ({
  item,
  size,
  disabled,
  shouldHover = true,
  maxIdentityLength,
  isHovered,
  otherItemHovered,
}: {
  item: ClaimItemProps
  link?: string
  size?: keyof typeof IdentityTagSize
  shouldHover?: boolean
  disabled?: boolean
  maxIdentityLength?: number
  isHovered: boolean
  otherItemHovered: boolean
}) => {
  const effectiveMaxLength = maxIdentityLength ?? 24

  const content = (
    <IdentityTag
      variant={item.variant}
      size={size}
      imgSrc={item.imgSrc}
      disabled={disabled}
      className={cn(
        'hover:bg-primary/20 hover:border-primary relative z-10 identity-tag',
        {
          'group-hover:border-primary group-hover:bg-primary/20 duration-200':
            !otherItemHovered,
          'border-primary bg-primary/20': isHovered,
        },
      )}
      shouldHover={shouldHover && !otherItemHovered}
    >
      <Trunctacular
        value={item.label}
        disableTooltip={shouldHover}
        maxStringLength={effectiveMaxLength}
      />
    </IdentityTag>
  )

  if (disabled) {
    return item.link ? <a href={item.link}>{content}</a> : content
  }

  if (item.shouldHover === false) {
    return content
  }

  return (
    <HoverCard openDelay={150} closeDelay={150}>
      <HoverCardTrigger asChild>
        {item.link ? <a href={item.link}>{content}</a> : content}
      </HoverCardTrigger>
      <HoverCardContent
        side="bottom"
        className="w-full hover-card cursor-default"
        align="center"
      >
        <div className="flex flex-col gap-4 w-80 max-md:max-w-fit">
          <ProfileCard
            variant={item.variant}
            avatarSrc={item.imgSrc ?? ''}
            name={item.label}
            id={item.id ?? ''}
            bio={item.description ?? ''}
            ipfsLink={item.ipfsLink}
          />
          {item.link && (
            <a href={item.link}>
              <Button variant={ButtonVariant.secondary} className="w-full">
                View Identity{' '}
                <Icon name={'arrow-up-right'} className="h-3 w-3" />
              </Button>
            </a>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

export const Claim = ({
  subject,
  predicate,
  object,
  disabled,
  size,
  maxIdentityLength,
}: ClaimProps) => {
  const separatorWidth = size !== IdentityTagSize.default ? 'w-4' : 'w-2'
  const items = [subject, predicate, object]
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)

  const handleItemClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  const handleItemHover = (index: number | null) => {
    setHoveredItem(index)
  }

  return (
    <div className="flex items-center w-full max-w-max group relative max-sm:flex-col max-sm:m-auto">
      {items.map((item, index) => (
        <Fragment key={index}>
          {index > 0 && (
            <Separator
              className={cn(
                separatorWidth,
                'group-hover:bg-primary max-sm:w-px max-sm:h-2 ',
              )}
            />
          )}
          <button
            onClick={(e) => handleItemClick(e)}
            onMouseEnter={() => handleItemHover(index)}
            onMouseLeave={() => handleItemHover(null)}
          >
            <ClaimItem
              item={item}
              size={size}
              disabled={disabled}
              shouldHover={item.shouldHover}
              maxIdentityLength={maxIdentityLength}
              isHovered={hoveredItem === index}
              otherItemHovered={hoveredItem !== null && hoveredItem !== index}
            />
          </button>
        </Fragment>
      ))}
    </div>
  )
}
