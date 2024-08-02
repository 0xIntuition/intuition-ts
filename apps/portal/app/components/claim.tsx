import {
  Button,
  ButtonVariant,
  cn,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  IdentityTag,
  IdentityTagSize,
  IdentityType,
  ProfileCard,
  Separator,
  Trunctacular,
} from '@0xintuition/1ui'

import { Link } from '@remix-run/react'
import { Fragment } from 'react/jsx-runtime'

interface ClaimItemProps {
  variant?: IdentityType
  label: string
  imgSrc?: string | null
  id?: string | null
  description?: string | null
  ipfsLink: string
  link: string
}

export interface ClaimProps {
  size?: keyof typeof IdentityTagSize
  disabled?: boolean
  subject: ClaimItemProps
  predicate: ClaimItemProps
  object: ClaimItemProps
  link: string
}

const ClaimItem = ({
  item,
  link,
  size,
  disabled,
}: {
  item: ClaimItemProps
  link: string
  size?: keyof typeof IdentityTagSize
  disabled?: boolean
}) => {
  const handleItemClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  return (
    <HoverCard>
      <HoverCardTrigger>
        <Link to={link} prefetch="intent">
          <IdentityTag
            variant={item.variant}
            size={size}
            imgSrc={item.imgSrc}
            disabled={disabled}
            className="group-hover:border-primary group-hover:bg-primary/20 relative z-10"
          >
            <Trunctacular value={item.label} disableTooltip />
          </IdentityTag>
        </Link>
      </HoverCardTrigger>
      <HoverCardContent>
        <ProfileCard
          variant={item.variant}
          avatarSrc={item.imgSrc ?? ''}
          name={item.label}
          id={item.id ?? ''}
          bio={item.description ?? ''}
          ipfsLink={item.ipfsLink}
          className="profile-card"
        />
        <a href={item.link} onClick={handleItemClick}>
          <Button
            variant={ButtonVariant.secondary}
            className="w-full"
            onClick={handleItemClick}
          >
            View Identity
          </Button>
        </a>
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
    <div className="flex items-center w-full max-w-max group relative">
      {items.map((item, index) => (
        <Fragment key={index}>
          {index > 0 && (
            <Separator
              className={cn(separatorWidth, 'group-hover:bg-primary')}
            />
          )}
          <ClaimItem item={item} link={link} size={size} disabled={disabled} />
        </Fragment>
      ))}
    </div>
  )
}
