import { platform } from 'os'

import {
  Button,
  Icon,
  IconNameType,
  SocialLinks,
  SocialLinksBadge,
  SocialLinksButton,
} from '@0xintuition/1ui'

import { useSocialLinking } from '@lib/hooks/usePrivySocialLinking'
import { verifiedPlatforms } from '@lib/utils/constants'
import logger from '@lib/utils/logger'
import { Discord, Farcaster, Github, Twitter } from '@privy-io/react-auth'
import { PlatformUserDetails, PrivyPlatform } from 'types/privy'
import { ExtendedPrivyUser } from 'types/user'
import { $ } from 'vitest/dist/reporters-yx5ZTtEV.js'

export function PrivyVerifiedLinks({
  privyUser,
}: {
  privyUser: ExtendedPrivyUser
}) {
  const {
    handleLink,
    handleUnlink,
    verifiedPlatforms: linkedPlatforms,
  } = useSocialLinking(verifiedPlatforms)

  if (!privyUser) {
    return null
  }
  const renderLinkItem = (platform: PrivyPlatform) => {
    const isConnected = Boolean(privyUser[platform.platformPrivyName])
    logger('privyUser', privyUser)
    logger(
      'privyUser[platform.platformPrivyName',
      privyUser[platform.platformPrivyName],
    )
    logger(`${platform.platformPrivyName} : ${isConnected}`)

    const handleUnlinkWrapper = () => {
      const userDetails:
        | PlatformUserDetails
        | (Twitter & PlatformUserDetails)
        | (Github & PlatformUserDetails)
        | (Farcaster & PlatformUserDetails)
        | Discord
        | undefined = privyUser[platform.platformPrivyName]

      function isFarcasterUserDetails(
        userDetails:
          | PlatformUserDetails
          | Twitter
          | Github
          | Farcaster
          | Discord
          | undefined,
      ): userDetails is Farcaster {
        return !!userDetails && 'fid' in userDetails
      }

      return new Promise<void>((resolve, reject) => {
        if (isFarcasterUserDetails(userDetails)) {
          handleUnlink(platform.unlinkMethod, undefined, userDetails.fid)
            .then(resolve)
            .catch(reject)
        } else if (userDetails?.subject) {
          handleUnlink(platform.unlinkMethod, userDetails.subject)
            .then(resolve)
            .catch(reject)
        } else {
          console.error(
            `Error: Unlink method called without required parameter for platform ${platform.platformPrivyName}`,
          )
          reject(new Error('Missing required parameter'))
        }
      })
    }
    return (
      <VerifiedLinkItem
        key={platform.platformPrivyName}
        platformDisplayName={
          platform.platformDisplayName as VerifiedLinkItemProps['platformDisplayName']
        }
        platformIcon={platform.platformIcon}
        isConnected={isConnected}
        privyUser={privyUser}
        platform={platform}
        linkMethod={() => handleLink(platform.linkMethod)}
        unlinkMethod={handleUnlinkWrapper}
      />
    )
  }
  return (
    <div className="flex flex-col items-center bg-red-100 gap-4">
      {linkedPlatforms.map(renderLinkItem)}
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
  return (
    <div className="flex w-full justify-between gap-4 px-8 ">
      <div className="flex flex-row items-center gap-3">
        <div className="flex flex-col items-center border border-solid  border-white/10 rounded-full p-2.5">
          <Icon name={platformIcon} className="w-4 h-4" />
        </div>
        {isConnected ? (
          <span className="font-medium text-sm">
            {(privyUser && privyUser[platform.platformPrivyName]?.username) ??
              platformDisplayName}
          </span>
        ) : (
          <span>{platformDisplayName}</span>
        )}
      </div>
      {isConnected ? (
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

        const isConnected = Boolean(privyUser[platform.platformPrivyName])

        return isConnected ? (
          <SocialLinksBadge
            key={platform.platformPrivyName}
            platform={platform.platformUiName}
            isVerified={isConnected}
            username={
              (privyUser && privyUser[platform.platformPrivyName]?.username) ??
              platform.platformDisplayName
            }
          />
        ) : null
      })}
      <SocialLinksButton onClick={handleOpenEditSocialLinksModal} />
    </SocialLinks>
  )
}
