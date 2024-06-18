import {
  Button,
  Icon,
  IconName,
  SocialLinks,
  SocialLinksBadge,
  SocialLinksButton,
} from '@0xintuition/1ui'

import { useSocialLinking } from '@lib/hooks/usePrivySocialLinking'
import { verifiedPlatforms } from '@lib/utils/constants'
import { PrivyPlatform } from 'types/privy'
import { SessionUser } from 'types/user'

export function PrivyVerifiedLinks({ privyUser }: { privyUser: SessionUser }) {
  const {
    handleLink,
    handleUnlink,
    verifiedPlatforms: linkedPlatforms,
  } = useSocialLinking(verifiedPlatforms)

  if (!privyUser) {
    return null
  }
  const renderLinkItem = (platform: PrivyPlatform) => {
    const isConnected = Boolean(privyUser.details?.[platform.platformPrivyName])

    const handleUnlinkWrapper = () => {
      const userDetails = privyUser.details?.[platform.platformPrivyName]

      return new Promise<void>((resolve, reject) => {
        if (platform.platformPrivyName === 'farcaster' && userDetails?.fid) {
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
        platformDisplayName={platform.platformDisplayName}
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
  platformIcon: IconName
  linkMethod: () => Promise<void>
  unlinkMethod: () => Promise<void>
  isConnected: boolean
  privyUser: SessionUser | null
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
            {(privyUser &&
              (privyUser as SessionUser).details?.[platform.platformPrivyName]
                ?.username) ??
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
  privyUser: SessionUser
  handleOpenEditSocialLinksModal: () => void
}) {
  return (
    <SocialLinks>
      {verifiedPlatforms.map((platform) => {
        if (!privyUser) {
          return null
        }

        const isConnected = Boolean(
          privyUser.details?.[platform.platformPrivyName],
        )

        return isConnected ? (
          <SocialLinksBadge
            key={platform.platformPrivyName}
            platform={platform.platformUiName}
            isVerified={isConnected}
            username={
              (privyUser &&
                (privyUser as SessionUser).details?.[platform.platformPrivyName]
                  ?.username) ??
              platform.platformDisplayName
            }
          />
        ) : null
      })}
      <SocialLinksButton onClick={handleOpenEditSocialLinksModal} />
    </SocialLinks>
  )
}
