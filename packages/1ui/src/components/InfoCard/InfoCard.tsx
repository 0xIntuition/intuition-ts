import * as React from 'react'

import { cn } from 'styles'
import { Identity, IdentityType } from 'types'

import {
  Button,
  ButtonVariant,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Icon,
  IdentityTag,
  ProfileCard,
  Text,
  TextVariant,
  Trunctacular,
} from '..'

export interface InfoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant: IdentityType
  username: string
  avatarImgSrc: string
  id: string
  description: string
  link: string
  ipfsLink: string
  timestamp: string
}

const InfoCard = ({
  variant = Identity.user,
  username,
  avatarImgSrc,
  id,
  description,
  link,
  ipfsLink,
  timestamp,
  className,
  ...props
}: InfoCardProps) => {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(timestamp))

  return (
    <div
      className={cn(
        `flex flex-col gap-2 theme-border p-5 rounded-lg max-sm:items-center`,
        className,
      )}
      {...props}
    >
      <Text variant={TextVariant.caption} className="text-muted-foreground">
        Creator
      </Text>
      <div className="flex justify-start items-center gap-1">
        <HoverCard openDelay={100} closeDelay={100}>
          <HoverCardTrigger>
            <a href={link}>
              <IdentityTag variant={variant} imgSrc={avatarImgSrc}>
                <Trunctacular value={username} maxStringLength={18} />
              </IdentityTag>
            </a>
          </HoverCardTrigger>
          <HoverCardContent side="right" className="w-max">
            <div className="flex flex-col gap-4 w-80 max-md:w-[80%]">
              <ProfileCard
                variant={variant}
                avatarSrc={avatarImgSrc ?? ''}
                name={username}
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
        <span className="bg-muted-foreground h-[2px] w-[2px] block rounded-full" />
        <Text variant={TextVariant.body} className="text-muted-foreground">
          {formattedDate}
        </Text>
      </div>
    </div>
  )
}

export { InfoCard }
