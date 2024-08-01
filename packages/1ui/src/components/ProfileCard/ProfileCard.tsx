import React, { HTMLAttributes } from 'react'

import { Text } from 'components/Text'
import { cn } from 'styles'
import { Identity, IdentityType } from 'types'

import { ProfileCardHeader, ProfileCardStatItem } from './components'

export interface ProfileCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: IdentityType
  avatarSrc: string
  name: string
  walletAddress: string
  stats?: {
    numberOfFollowers?: number
    numberOfFollowing?: number
    points?: number
  }
  ipfsLink: string
  externalLink?: string
  bio?: string
  children?: React.ReactNode
}

const ProfileCard = ({
  variant = Identity.user,
  avatarSrc,
  name,
  walletAddress,
  stats,
  ipfsLink,
  externalLink,
  bio,
  children,
  ...props
}: ProfileCardProps) => {
  return (
    <div
      className={cn(
        'flex flex-col justify-center items-start w-full min-w-80 rounded-lg gap-2.5',
        props.className,
      )}
      {...props}
    >
      <ProfileCardHeader
        variant={variant}
        avatarSrc={avatarSrc}
        name={name}
        walletAddress={walletAddress}
        ipfsLink={ipfsLink}
      />
      {variant === Identity.user && (
        <div className="flex justify-start items-center gap-4 pt-2">
          <ProfileCardStatItem
            value={stats?.numberOfFollowing ?? 0}
            label="Following"
          />
          <ProfileCardStatItem
            value={stats?.numberOfFollowers ?? 0}
            label="Followers"
          />
          {stats?.points !== undefined && (
            <ProfileCardStatItem
              value={stats.points}
              label="Points"
              valueClassName="text-success"
            />
          )}
        </div>
      )}
      <div>
        {bio && (
          <Text
            variant="body"
            weight="medium"
            className="text-primary-300 pt-2.5"
          >
            {bio}
          </Text>
        )}

        {variant === Identity.nonUser &&
          externalLink &&
          externalLink !== 'https://' && (
            <div className="">
              <Text variant="body" className="text-muted-foreground">
                Link
              </Text>
              <a href={externalLink} className="text-primary-300">
                {externalLink}
              </a>
            </div>
          )}
      </div>
      {children && <div className="flex justify-center w-full">{children}</div>}
    </div>
  )
}

export { ProfileCard }
