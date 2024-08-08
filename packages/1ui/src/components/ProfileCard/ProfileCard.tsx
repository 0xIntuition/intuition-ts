import React, { HTMLAttributes } from 'react'

import { Text } from 'components/Text'
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
  children,
  ...props
}: ProfileCardProps) => {
  return (
    <div
      className={cn(
        'flex flex-col justify-start items-start w-full min-w-[320px] max-w-full rounded-lg gap-2.5',
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
      />
      {variant === Identity.user && stats && (
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
          <div className="w-full overflow-hidden">
            <Text
              variant="body"
              weight="medium"
              className="text-primary-300 pt-2.5 break-all whitespace-pre-wrap"
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
                <Text variant="body">{externalLink}</Text>
              </a>
            </div>
          )}
      </div>
      {children && <div className="flex justify-center w-full">{children}</div>}
    </div>
  )
}

export { ProfileCard }
