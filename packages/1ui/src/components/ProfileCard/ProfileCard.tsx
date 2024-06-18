import React from 'react'

import { ProfileCardHeader } from './components'
import { ProfileVariant } from './ProfileCard.utils'

export type ProfileVariantType = keyof typeof ProfileVariant

export interface ProfileCardProps {
  type: ProfileVariantType
  avatarSrc: string
  name: string
  walletAddress: string
  stats: {
    numberOfFollowers: number
    numberOfFollowing?: number
    points?: number
  }
  link?: string
  bio?: string
}

const ProfileCard = ({
  type,
  avatarSrc,
  name,
  walletAddress,
  stats,
  link,
  bio,
}: ProfileCardProps) => {
  return (
    <div className="flex flex-col justify-center items-start flex-grow self-stretch p-4 rounded-lg">
      <ProfileCardHeader
        avatarSrc={avatarSrc}
        name={name}
        walletAddress={walletAddress}
      />
      <p className="text-gray-400 mt-2">{bio}</p>
      <div className="mt-2">
        <p className="text-gray-400">Followers: {stats.numberOfFollowers}</p>
        {type === 'user' && stats.numberOfFollowing !== undefined && (
          <p className="text-gray-400">Following: {stats.numberOfFollowing}</p>
        )}
        {type === 'user' && stats.points !== undefined && (
          <p className="text-gray-400">Points: {stats.points}</p>
        )}
        {type === 'entity' && link && (
          <a href={link} className="text-blue-500">
            {link}
          </a>
        )}
      </div>
    </div>
  )
}

export { ProfileCard }
