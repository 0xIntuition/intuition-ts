import { Button, ButtonVariant } from 'components/Button'
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
}

export interface ClaimProps {
  size?: keyof typeof IdentityTagSize
  disabled?: boolean
  subject: ClaimItemProps
  predicate: ClaimItemProps
  object: ClaimItemProps
  link?: string
}

const ClaimItem = ({
  item,
  link,
  size,
  disabled,
}: {
  item: ClaimItemProps
  link?: string
  size?: keyof typeof IdentityTagSize
  disabled?: boolean
}) => {
  const content = (
    <IdentityTag
      variant={item.variant}
      size={size}
      imgSrc={item.imgSrc}
      disabled={disabled}
      className="group-hover:border-primary group-hover:bg-primary/20 relative z-10"
    >
      <Trunctacular value={item.label} disableTooltip />
    </IdentityTag>
  )

  if (disabled) {
    return link ? <a href={link}>{content}</a> : content
  }

  return (
    <HoverCard openDelay={100} closeDelay={100}>
      <HoverCardTrigger>
        {link ? <a href={link}>{content}</a> : content}
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <ProfileCard
          variant={item.variant}
          avatarSrc={item.imgSrc ?? ''}
          name={item.label}
          id={item.id ?? ''}
          bio={item.description ?? ''}
          ipfsLink={item.ipfsLink}
          className="profile-card"
        />
        {item.link && (
          <a href={item.link}>
            <Button variant={ButtonVariant.secondary} className="w-full">
              View Identity
            </Button>
          </a>
        )}
      </HoverCardContent>
    </HoverCard>
  )
}

export const Claim = ({
  subject,
  predicate,
  object,
  link,
  disabled,
  size,
}: ClaimProps) => {
  const separatorWidth = size !== IdentityTagSize.default ? 'w-4' : 'w-2'
  const items = [subject, predicate, object]

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
          <ClaimItem
            item={item}
            link={link}
            size={size}
            disabled={(!item.link && true) || disabled}
          />
        </Fragment>
      ))}
    </div>
  )
}
