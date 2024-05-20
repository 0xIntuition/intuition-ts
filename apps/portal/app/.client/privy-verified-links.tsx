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

  type UnlinkMethod =
    | ((subject: string) => Promise<User>) // For Twitter and GitHub
    | ((fid: number) => Promise<User>) // For Farcaster

  const unlinkMethods: Record<string | number, UnlinkMethod> = {
    unlinkTwitter: (subject: string) => unlinkTwitter(subject),
    unlinkGithub: (subject: string) => unlinkGithub(subject),
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
    unlinkMethodName: keyof typeof unlinkMethods,
    subject?: string,
    fid?: number,
  ) => {
    const unlinkMethod = unlinkMethods[unlinkMethodName]
    if (typeof unlinkMethod === 'function') {
      try {
        if (unlinkMethodName === 'unlinkFarcaster') {
          if (fid === undefined) {
            throw new Error(`Missing fid for ${unlinkMethodName}`)
          }
          await unlinkMethod(fid) // fid is number, correct type for unlinkFarcaster
        } else {
          if (subject === undefined) {
            throw new Error(`Missing subject for ${unlinkMethodName}`)
          }
          await unlinkMethod(subject as string) // subject is string, correct type for unlinkTwitter and unlinkGithub
        }
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

        const unlinkMethod =
          unlinkMethods[platform.unlinkMethod as keyof typeof unlinkMethods]
        if (typeof unlinkMethod !== 'function') {
          logger(`Unlink method ${platform.unlinkMethod} is not a function`)
          return null
        }
        const subject = privyUser?.[platform.platformPrivyName]?.subject

        const isConnected = privyUser && privyUser[platform.platformPrivyName]

        return (
          <VerifiedLinkItem
            key={platform.platformPrivyName}
            // platformPrivyName={platform.platformPrivyName}
            platformDisplayName={platform.platformDisplayName}
            isConnected={isConnected}
            linkMethod={() =>
              handleLink(platform.linkMethod as keyof typeof linkMethods)
            }
            unlinkMethod={() =>
              handleUnlink(
                platform.unlinkMethod as keyof typeof unlinkMethods,
                subject,
              )
            }
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
