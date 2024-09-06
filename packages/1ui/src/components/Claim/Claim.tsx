import { useState } from 'react'

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from 'components/HoverCard'
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
  onClick?: () => void
  maxIdentityLength?: number
}

export const Claim = ({
  subject,
  predicate,
  object,
  disabled,
  size,
  onClick,
  maxIdentityLength,
}: ClaimProps) => {
  const separatorWidth = size !== IdentityTagSize.default ? 'w-4' : 'w-2'
  const items = [subject, predicate, object]
  const [isHovered, setIsHovered] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const handleMouseEnter = () => {
    setIsHovered(true)
    if (onClick) {
      setHoveredIndex(null)
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setHoveredIndex(null)
  }

  const claimContent = (
    <div
      className={cn(
        'flex items-center w-full max-w-max group relative max-sm:flex-col max-sm:m-auto transition-colors duration-200',
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {items.map((item, index) => (
        <Fragment key={index}>
          {index > 0 && (
            <Separator
              className={cn(
                separatorWidth,
                'max-sm:w-px max-sm:h-2 transition-colors duration-200',
                { 'bg-primary': isHovered && onClick },
                { 'group-hover:bg-primary': !onClick && hoveredIndex === null },
              )}
            />
          )}
          <div>
            <ClaimItem
              item={item}
              size={size}
              disabled={disabled}
              shouldHover={!onClick}
              maxIdentityLength={maxIdentityLength}
              isHovered={onClick ? isHovered : hoveredIndex === index}
              isAnyHovered={hoveredIndex !== null}
              onMouseEnter={() => !onClick && setHoveredIndex(index)}
              onMouseLeave={() => !onClick && setHoveredIndex(null)}
            />
          </div>
        </Fragment>
      ))}
    </div>
  )

  return onClick ? (
    <button onClick={onClick}>{claimContent}</button>
  ) : (
    claimContent
  )
}

const ClaimItem = ({
  item,
  size,
  disabled,
  shouldHover = true,
  maxIdentityLength,
  isHovered,
  isAnyHovered,
  onMouseEnter,
  onMouseLeave,
}: {
  item: ClaimItemProps
  link?: string
  size?: keyof typeof IdentityTagSize
  shouldHover?: boolean
  disabled?: boolean
  maxIdentityLength?: number
  isHovered: boolean
  isAnyHovered: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
}) => {
  const effectiveMaxLength = maxIdentityLength ?? 24

  const content = (
    <IdentityTag
      variant={item.variant}
      size={size}
      imgSrc={item.imgSrc}
      disabled={disabled}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cn(
        'relative z-10 identity-tag transition-colors duration-200',
        {
          'group-hover:border-primary': !isAnyHovered,
          'border-primary bg-primary/10': isHovered,
          'border-theme bg-none': isAnyHovered && !isHovered,
        },
      )}
      shouldHover={shouldHover}
    >
      <Trunctacular
        value={item.label}
        disableTooltip={shouldHover}
        maxStringLength={effectiveMaxLength}
      />
    </IdentityTag>
  )

  if (disabled || !shouldHover) {
    return item.link ? <a href={item.link}>{content}</a> : content
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
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
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
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
