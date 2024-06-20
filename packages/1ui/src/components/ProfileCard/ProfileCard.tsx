import React from 'react'

import { Text } from 'components/Text'

import { ProfileCardHeader, ProfileCardStatItem } from './components'
import { ProfileVariant } from './ProfileCard.utils'

export type ProfileVariantType = keyof typeof ProfileVariant

export interface ProfileCardProps {
  type: ProfileVariantType
  avatarSrc: string
  name: string
  walletAddress: string
  stats?: {
    numberOfFollowers: number
    numberOfFollowing?: number
    points?: number
  }
  link?: string
  bio?: string
  children?: React.ReactNode
}

const ProfileCard = ({
  type,
  avatarSrc,
  name,
  walletAddress,
  stats,
  link,
  bio,
  children,
}: ProfileCardProps) => {
  return (
    <div className="flex flex-col justify-center items-start w-[300px] rounded-lg box-border">
      <ProfileCardHeader
        type={type}
        avatarSrc={avatarSrc}
        name={name}
        walletAddress={walletAddress}
      />
      {type === ProfileVariant.user && (
        <div className="flex justify-between items-center space-x-4 mt-5">
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
      <div className="mt-5">
        <Text variant="body" weight="medium" className="text-primary-300">
          {bio}
        </Text>

        {type === ProfileVariant.entity && link && (
          <div className="mt-5">
            <Text variant="body" className="text-muted-foreground">
              Link
            </Text>
            <a href={link} className="text-primary-300">
              {link}
            </a>
          </div>
        )}
      </div>
      {children && (
        <div className="flex justify-center w-full mt-5">{children}</div>
      )}
    </div>
  )
}

export { ProfileCard }
