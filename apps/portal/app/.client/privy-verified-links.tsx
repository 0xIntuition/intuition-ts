import { Button, Icon } from '@0xintuition/1ui'

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

  return (
    <div className="flex w-full flex-col items-center gap-8">
      {linkedPlatforms.map((platform) => {
        if (privyUser === null) {
          return null
        }

        const isConnected = privyUser
          ? Boolean(
              (privyUser as SessionUser).details?.[platform.platformPrivyName],
            )
          : false

        return (
          <VerifiedLinkItem
            key={platform.platformPrivyName}
            platformDisplayName={platform.platformDisplayName}
            isConnected={isConnected}
            privyUser={privyUser as SessionUser}
            platform={platform}
            linkMethod={() => handleLink(platform.linkMethod)}
            unlinkMethod={() => {
              return new Promise<void>((resolve, reject) => {
                const userDetails = (privyUser as SessionUser).details?.[
                  platform.platformPrivyName
                ]
                if (
                  platform.platformPrivyName === 'farcaster' &&
                  userDetails?.fid
                ) {
                  handleUnlink(
                    platform.unlinkMethod,
                    undefined,
                    userDetails.fid,
                  )
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
            }}
          />
        )
      })}
    </div>
  )
}

interface VerifiedLinkItemProps {
  platformDisplayName: string
  platformIcon?: string
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
    <div className="flex w-full justify-between gap-4 px-8">
      {platformIcon && <img src="" alt="" />}
      {isConnected ? (
        <span>
          {(privyUser &&
            (privyUser as SessionUser).details?.[platform.platformPrivyName]
              ?.username) ??
            platformDisplayName}
        </span>
      ) : (
        <span>{platformDisplayName}</span>
      )}
      {isConnected ? (
        <Button onClick={unlinkMethod}>X</Button>
      ) : (
        <Button onClick={linkMethod}>Link</Button>
      )}
    </div>
  )
}

interface VerifiedLinkBadgeProps {
  platformDisplayName: string
  platformIcon?: string
  isConnected: boolean
  privyUser: SessionUser | null
  platform: PrivyPlatform
}

export function VerifiedLinkBadge({
  platformDisplayName,
  platformIcon,
  privyUser,
  platform,
}: VerifiedLinkBadgeProps) {
  return (
    <div
      className="flex w-full justify-between
    border border-solid border-white/10 rounded-xl px-2 py-1 items-center"
    >
      {platformIcon && <img src="" alt="" />}
      <span className="font-normal text-sm text-foreground">
        {(privyUser &&
          (privyUser as SessionUser).details?.[platform.platformPrivyName]
            ?.username) ??
          platformDisplayName}
      </span>
      <Icon name="circle-check" className="text-blue-500 h-4 w-4  " />
    </div>
  )
}

export function VerifiedLinkBadges({ privyUser }: { privyUser: SessionUser }) {
  return (
    <div className="flex flex-row gap-2">
      {verifiedPlatforms.map((platform) => {
        if (!privyUser) {
          return null
        }

        const isConnected = Boolean(
          privyUser.details?.[platform.platformPrivyName],
        )

        return isConnected ? (
          <VerifiedLinkBadge
            key={platform.platformPrivyName}
            platformDisplayName={platform.platformDisplayName}
            isConnected={isConnected}
            privyUser={privyUser as SessionUser}
            platform={platform}
          />
        ) : null
      })}
    </div>
  )
}
