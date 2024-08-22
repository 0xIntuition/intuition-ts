import React, { HTMLAttributes } from 'react'

import { Link } from '@remix-run/react'
import { Text } from 'components/Text'
import { Trunctacular } from 'components/Trunctacular'
import { cn } from 'styles'
import { Identity, IdentityType } from 'types'

import { ProfileCardHeader, ProfileCardStatItem } from './components'

export interface ProfileCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: IdentityType
  avatarSrc?: string
  name: string
  id?: string
  vaultId?: string
  stats?: {
    numberOfFollowers?: number
    numberOfFollowing?: number
    points?: number
  }
  ipfsLink?: string
  externalLink?: string
  bio?: string
  children?: React.ReactNode
  followingLink?: string
  followerLink?: string
  statsLink?: string
  onAvatarClick?: () => void
}

const ProfileCard = ({
  variant = Identity.user,
  avatarSrc = '',
  name,
  id,
  vaultId,
  stats,
  ipfsLink,
  externalLink,
  bio,
  followingLink,
  followerLink,
  children,
  onAvatarClick,
  ...props
}: ProfileCardProps) => {
  return (
    <div
      className={cn(
        'flex flex-col justify-start items-start w-full min-w-[320px] max-w-full rounded-lg gap-2.5 max-lg:items-center',
        'overflow-hidden',
        props.className,
      )}
      {...props}
    >
      <ProfileCardHeader
        variant={variant}
        avatarSrc={avatarSrc}
        name={name}
        id={id}
        link={ipfsLink}
        onAvatarClick={onAvatarClick}
      />
      {variant === Identity.user && stats && (
        <div className="flex justify-start items-center gap-4 pt-2">
          {followingLink ? (
            <Link to={followingLink}>
              <ProfileCardStatItem
                value={stats?.numberOfFollowing ?? 0}
                label="Following"
              />
            </Link>
          ) : (
            <ProfileCardStatItem
              value={stats?.numberOfFollowing ?? 0}
              label="Following"
            />
          )}
          {followerLink ? (
            <Link to={followerLink}>
              <ProfileCardStatItem
                value={stats?.numberOfFollowers ?? 0}
                label="Followers"
              />
            </Link>
          ) : (
            <ProfileCardStatItem
              value={stats?.numberOfFollowers ?? 0}
              label="Followers"
            />
          )}
          {stats?.points !== undefined && (
            <ProfileCardStatItem
              value={stats.points}
              label="IQ Points"
              valueClassName="text-success"
            />
          )}
        </div>
      )}
      <div>
        {bio && (
          <div className="w-full overflow-hidden">
            <Text
              variant="body"
              weight="medium"
              className="text-primary-300 pt-2.5 whitespace-pre-wrap"
            >
              {bio}
            </Text>
          </div>
        )}

        {vaultId && (
          <div className="pt-2.5 max-lg:flex max-lg:flex-col max-lg:items-center">
            <Text variant="body" className="text-muted-foreground">
              Vault ID
            </Text>
            <Text variant="body">{vaultId}</Text>
          </div>
        )}

        {variant === Identity.nonUser &&
          externalLink &&
          externalLink !== 'https://' && (
            <div className="pt-2.5 max-lg:flex max-lg:flex-col max-lg:items-center">
              <Text variant="body" className="text-muted-foreground">
                Link
              </Text>
              <a href={externalLink} target="_blank" rel="noreferrer noopener">
                <Trunctacular value={externalLink} maxStringLength={48} />
              </a>
            </div>
          )}
      </div>
      {children && <div className="flex justify-center w-full">{children}</div>}
    </div>
  )
}

export { ProfileCard }
