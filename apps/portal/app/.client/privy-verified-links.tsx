import { Button } from '@0xintuition/1ui'

import { useSocialLinking } from '@lib/hooks/usePrivySocialLinking'
import { ExtendedPrivyUser, PrivyPlatform } from 'types/privy'

// colocated this for now but we can move into a constants if that is cleaner
const verifiedPlatforms: PrivyPlatform[] = [
  {
    platformPrivyName: 'twitter',
    platformDisplayName: 'X',
    linkMethod: 'linkTwitter',
    unlinkMethod: 'unlinkTwitter',
  },
  {
    platformPrivyName: 'github',
    platformDisplayName: 'GitHub',
    linkMethod: 'linkGithub',
    unlinkMethod: 'unlinkGithub',
  },
  {
    platformPrivyName: 'farcaster',
    platformDisplayName: 'Farcaster',
    linkMethod: 'linkFarcaster',
    unlinkMethod: 'unlinkFarcaster',
  },
]

export function PrivyVerifiedLinks() {
  const {
    privyUser,
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
              (privyUser as ExtendedPrivyUser)[platform.platformPrivyName],
            )
          : false

        return (
          <VerifiedLinkItem
            key={platform.platformPrivyName}
            platformDisplayName={platform.platformDisplayName}
            isConnected={isConnected}
            privyUser={privyUser as ExtendedPrivyUser}
            platform={platform}
            linkMethod={() => handleLink(platform.linkMethod)}
            unlinkMethod={() => {
              return new Promise<void>((resolve, reject) => {
                const userDetails = (privyUser as ExtendedPrivyUser)[
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
    <div className="flex w-full justify-between gap-4 px-8">
      {platformIcon && <img src="" alt="" />}
      {isConnected ? (
        <span>
          {(privyUser &&
            (privyUser as ExtendedPrivyUser)[platform.platformPrivyName]
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
