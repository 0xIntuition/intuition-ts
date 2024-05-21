import { User, useLinkAccount, usePrivy } from '@privy-io/react-auth'
import { Button } from '@0xintuition/1ui'
import logger from '@lib/utils/logger'

const verifiedPlatforms = [
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
    user: privyUser,
    unlinkTwitter,
    unlinkGithub,
    unlinkFarcaster,
  } = usePrivy()
  logger('privyUser in PrivyVerifiedLinks', privyUser)

  const { linkTwitter, linkGithub, linkFarcaster } = useLinkAccount({
    onSuccess: (user, linkMethod, linkedAccount) => {
      logger('Link successful:', user, linkMethod, linkedAccount)
    },
    onError: (error) => {
      logger(error)
    },
  })

  const linkMethods = {
    linkTwitter,
    linkGithub,
    linkFarcaster,
  }
  interface PlatformUserDetails {
    subject: string
    fid: number
  }

  type ExtendedPrivyUser = User & {
    twitter?: PlatformUserDetails
    github?: PlatformUserDetails
    farcaster?: PlatformUserDetails
    [key: string | number]: PlatformUserDetails | undefined
  }

  type UnlinkMethodBySubject = (subject: string) => Promise<User>
  type UnlinkMethodByFid = (fid: number) => Promise<User>

  const unlinkMethodsBySubject: Record<
    'unlinkTwitter' | 'unlinkGithub',
    UnlinkMethodBySubject
  > = {
    unlinkTwitter: (subject: string) => unlinkTwitter(subject),
    unlinkGithub: (subject: string) => unlinkGithub(subject),
  }

  const unlinkMethodsByFid: Record<'unlinkFarcaster', UnlinkMethodByFid> = {
    unlinkFarcaster: (fid: number) => unlinkFarcaster(fid),
  }

  const handleLink = async (linkMethodName: keyof typeof linkMethods) => {
    const linkMethod = linkMethods[linkMethodName]
    if (typeof linkMethod === 'function') {
      try {
        await linkMethod()
      } catch (error) {
        console.error('Link failed', error)
      }
    }
  }

  const handleUnlink = async (
    unlinkMethodName:
      | keyof typeof unlinkMethodsBySubject
      | keyof typeof unlinkMethodsByFid,
    subject?: string,
    fid?: number,
  ) => {
    if (unlinkMethodName === 'unlinkFarcaster') {
      if (fid === undefined) {
        throw new Error(`Missing fid for ${unlinkMethodName}`)
      }
      try {
        await unlinkMethodsByFid[unlinkMethodName](fid)
        console.log('Unlink successful. privyUser:', privyUser)
      } catch (error) {
        console.error('Unlink failed', error)
      }
    } else {
      if (subject === undefined) {
        throw new Error(`Missing subject for ${unlinkMethodName}`)
      }
      try {
        await unlinkMethodsBySubject[unlinkMethodName](subject)
        console.log('Unlink successful. privyUser:', privyUser)
      } catch (error) {
        console.error('Unlink failed', error)
      }
    }
  }

  return (
    <div className="flex w-full flex-col items-center gap-8">
      {verifiedPlatforms.map((platform) => {
        if (privyUser === null) {
          logger('Privy user is null')
        }

        const linkMethod =
          linkMethods[platform.linkMethod as keyof typeof linkMethods]
        if (typeof linkMethod !== 'function') {
          logger(`Link method ${platform.linkMethod} is not a function`)
          return null
        }

        let unlinkMethod:
          | ((subject: string) => Promise<User>)
          | ((fid: number) => Promise<User>)
          | undefined
        if (platform.platformPrivyName === 'farcaster') {
          unlinkMethod =
            unlinkMethodsByFid[
              platform.unlinkMethod as keyof typeof unlinkMethodsByFid
            ]
        } else {
          unlinkMethod =
            unlinkMethodsBySubject[
              platform.unlinkMethod as keyof typeof unlinkMethodsBySubject
            ]
        }

        if (typeof unlinkMethod !== 'function') {
          logger(`Unlink method ${platform.unlinkMethod} is not a function`)
          return null
        }

        const subject = (privyUser as ExtendedPrivyUser)?.[
          platform.platformPrivyName
        ]?.subject

        const fid = (privyUser as ExtendedPrivyUser)?.[
          platform.platformPrivyName
        ]?.fid

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
            linkMethod={() =>
              handleLink(platform.linkMethod as keyof typeof linkMethods)
            }
            unlinkMethod={() => {
              // Check for the 'farcaster' condition and ensure a 'fid' is defined
              if (
                platform.platformPrivyName === 'farcaster' &&
                fid !== undefined
              ) {
                return handleUnlink(
                  platform.unlinkMethod as keyof typeof unlinkMethodsByFid,
                  undefined,
                  fid,
                )
              } else if (subject !== undefined) {
                // Check if subject is defined for other platforms
                return handleUnlink(
                  platform.unlinkMethod as keyof typeof unlinkMethodsBySubject,
                  subject,
                )
              } else {
                // Handle cases where neither 'fid' nor 'subject' is defined appropriately
                const error = `Error: Unlink method called without required parameter for platform ${platform.platformPrivyName}`
                console.error(error)
                return Promise.reject(new Error(error))
              }
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
  unlinkMethod: (subject?: string) => Promise<void>
  isConnected: boolean
}

export function VerifiedLinkItem({
  platformDisplayName,
  platformIcon,
  linkMethod,
  unlinkMethod,
  isConnected,
}: VerifiedLinkItemProps) {
  return (
    <div className="flex w-full justify-between gap-4 px-8">
      {platformIcon && <img src="" alt="" />}
      <span>{platformDisplayName}</span>
      {isConnected ? (
        <Button onClick={() => unlinkMethod()}>X</Button>
      ) : (
        <Button onClick={() => linkMethod()}>Link</Button>
      )}
    </div>
  )
}
