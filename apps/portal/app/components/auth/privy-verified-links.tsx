import {
  Button,
  Icon,
  IconNameType,
  SocialLinks,
  SocialLinksBadge,
  SocialLinksButton,
} from '@0xintuition/1ui'

import { useSocialLinking } from '@lib/hooks/usePrivySocialLinking'
import { isFeatureEnabled } from '@lib/utils/feature-flags'
import { User as PrivyUser } from '@privy-io/react-auth'
import { verifiedPlatforms } from 'app/consts'
import { PrivyPlatform } from 'app/types/privy'
import { ExtendedPrivyUser } from 'app/types/user'

const SUPPORTED_PLATFORMS = ['twitter', 'github', 'farcaster'] as const
type SupportedPlatform = (typeof SUPPORTED_PLATFORMS)[number]

function isSupportedPlatform(platform: string): platform is SupportedPlatform {
  return SUPPORTED_PLATFORMS.includes(platform as SupportedPlatform)
}

function isExtendedPrivyUser(user: PrivyUser): user is ExtendedPrivyUser {
  return 'twitter' in user || 'github' in user || 'farcaster' in user
}

export function PrivyVerifiedLinks({
  verifiedPlatforms,
}: {
  verifiedPlatforms: PrivyPlatform[]
}) {
  const { privyUser, handleLink, handleUnlink } =
    useSocialLinking(verifiedPlatforms)

  // Return null if social linking is disabled
  if (!isFeatureEnabled('SOCIAL_LINKING')) {
    return null
  }

  if (!privyUser || !isExtendedPrivyUser(privyUser)) {
    return null
  }

  const sortedPlatforms = [...verifiedPlatforms].sort((a, b) => {
    if (a.platformPrivyName === 'farcaster') {
      return -1
    }
    if (b.platformPrivyName === 'farcaster') {
      return 1
    }
    return a.platformPrivyName.localeCompare(b.platformPrivyName)
  })

  const isLinkedPlatform = (platform: PrivyPlatform) => {
    const platformName = platform.platformPrivyName
    if (!isSupportedPlatform(platformName)) {
      return false
    }
    const platformDetails = privyUser[platformName as keyof ExtendedPrivyUser]
    return Boolean(platformDetails)
  }

  return (
    <div className="flex flex-col gap-4">
      {sortedPlatforms.map((platform) => {
        const isLinked = isLinkedPlatform(platform)
        return (
          <div
            key={platform.platformPrivyName}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Icon name={platform.platformIcon} className="h-6 w-6" />
              <span>{platform.platformDisplayName}</span>
            </div>
            {isLinked ? (
              <Button
                variant="ghost"
                onClick={() => handleUnlink(platform.unlinkMethod)}
              >
                Unlink
              </Button>
            ) : (
              <Button
                variant="ghost"
                onClick={() => handleLink(platform.linkMethod)}
              >
                Link
              </Button>
            )}
          </div>
        )
      })}
    </div>
  )
}

interface VerifiedLinkItemProps {
  platformDisplayName:
    | 'twitter'
    | 'discord'
    | 'lens'
    | 'farcaster'
    | 'calendly'
    | 'medium'
    | 'github'
  platformIcon: IconNameType
  linkMethod: () => Promise<void>
  unlinkMethod: () => Promise<void>
  isConnected: boolean
  privyUser: ExtendedPrivyUser | null
  platform: PrivyPlatform
}

export function VerifiedLinkItem({
  platformDisplayName,
  platformIcon,
  linkMethod,
  unlinkMethod,
  isConnected,
  privyUser,
  platform,
}: VerifiedLinkItemProps) {
  const isComingSoon =
    platform.platformPrivyName === 'github' ||
    platform.platformPrivyName === 'twitter'

  const getUsername = () => {
    if (!privyUser || !isConnected) {
      return platformDisplayName
    }
    const details =
      privyUser[platform.platformPrivyName as keyof ExtendedPrivyUser]
    return details?.username ?? platformDisplayName
  }

  return (
    <div className="flex w-full justify-between gap-4 px-8 ">
      <div className="flex flex-row items-center gap-3">
        <div className="flex flex-col items-center theme-border rounded-full p-2.5">
          <Icon name={platformIcon} className="w-4 h-4" />
        </div>
        {isConnected ? (
          <span className="font-medium text-sm">{getUsername()}</span>
        ) : (
          <span>{platformDisplayName}</span>
        )}
      </div>
      {isComingSoon ? (
        <Button variant="accent" className="py-1 px-3" disabled>
          Coming Soon
        </Button>
      ) : isConnected ? (
        <Button
          variant="destructive"
          className="py-1 px-3"
          onClick={unlinkMethod}
        >
          Unlink
        </Button>
      ) : (
        <Button variant="accent" className="py-1 px-3" onClick={linkMethod}>
          Link Account
        </Button>
      )}
    </div>
  )
}

export function VerifiedLinkBadges({
  privyUser,
  handleOpenEditSocialLinksModal,
}: {
  privyUser: ExtendedPrivyUser
  handleOpenEditSocialLinksModal: () => void
}) {
  return (
    <SocialLinks>
      {verifiedPlatforms.map((platform) => {
        if (!privyUser) {
          return null
        }

        const details =
          privyUser[platform.platformPrivyName as keyof ExtendedPrivyUser]
        const isConnected = Boolean(details)
        const username = details?.username ?? platform.platformDisplayName

        return isConnected ? (
          <SocialLinksBadge
            key={platform.platformPrivyName}
            platform={platform.platformUiName}
            isVerified={isConnected}
            username={username}
          />
        ) : null
      })}
      <SocialLinksButton onClick={handleOpenEditSocialLinksModal} />
    </SocialLinks>
  )
}
