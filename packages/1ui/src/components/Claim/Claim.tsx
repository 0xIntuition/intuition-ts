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
import { useSidebarLayoutContext } from 'components/SidebarLayout'
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
  link?: string
  maxIdentityLength?: number
}

const ClaimItem = ({
  item,
  link,
  size,
  disabled,
  shouldHover = true,
  maxIdentityLength = 24,
}: {
  item: ClaimItemProps
  link?: string
  size?: keyof typeof IdentityTagSize
  shouldHover?: boolean
  disabled?: boolean
  maxIdentityLength?: number
}) => {
  const { isMobileView } = useSidebarLayoutContext()
  const content = (
    <IdentityTag
      variant={item.variant}
      size={size}
      imgSrc={item.imgSrc}
      disabled={disabled}
      className="group-hover:border-primary group-hover:bg-primary/20 relative z-10"
      shouldHover={shouldHover}
    >
      <Trunctacular
        value={item.label}
        disableTooltip={shouldHover}
        maxStringLength={maxIdentityLength}
      />
    </IdentityTag>
  )

  if (disabled) {
    return link ? <a href={link}>{content}</a> : content
  }

  if (item.shouldHover === false) {
    return content
  }

  return (
    <HoverCard openDelay={100} closeDelay={100}>
      <HoverCardTrigger asChild>
        {link ? <a href={link}>{content}</a> : content}
      </HoverCardTrigger>
      <HoverCardContent
        side="bottom"
        className="w-full"
        align={isMobileView ? 'center' : 'start'}
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
  link,
  disabled,
  size,
  maxIdentityLength,
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
            disabled={disabled}
            shouldHover={item.shouldHover}
            maxIdentityLength={maxIdentityLength}
          />
        </Fragment>
      ))}
    </div>
  )
}
