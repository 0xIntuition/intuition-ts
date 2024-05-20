import { useLinkAccount, usePrivy } from '@privy-io/react-auth'
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
]

export function PrivyVerifiedLinks() {
  const {
    user: privyUser,
    unlinkTwitter,
    unlinkGithub,
    unlinkFarcaster,
    unlinkGoogle,
  } = usePrivy()
  logger('privyUser in PrivyVerifiedLinks', privyUser)

  const { linkTwitter, linkGithub, linkFarcaster, linkGoogle } = useLinkAccount(
    {
      onSuccess: (user, linkMethod, linkedAccount) => {
        logger(user, linkMethod, linkedAccount)
      },
      onError: (error) => {
        logger(error)
      },
    },
  )

  const linkMethods = {
    linkTwitter,
    linkGithub,
    linkFarcaster,
    linkGoogle,
  }

  const unlinkMethods = {
    unlinkTwitter,
    unlinkGithub,
    unlinkFarcaster,
    unlinkGoogle,
  }

  const handleUnlink = async (unlinkMethod, subject) => {
    try {
      await unlinkMethod(subject)
      // Action after successful unlink
      console.log('Unlink successful. privyUser:', privyUser)
      // You can also check the updated privyUser object here if needed
    } catch (error) {
      console.error('Unlink failed', error)
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
            platformPrivyName={platform.platformPrivyName}
            platformDisplayName={platform.platformDisplayName}
            isConnected={isConnected}
            // linkMethod={linkMethod}
            // unlinkMethod={unlinkMethod}
            linkMethod={() => linkMethod()}
            unlinkMethod={() => handleUnlink(unlinkMethod, subject)}
          />
        )
      })}
      <Button onClick={() => unlinkGithub(privyUser?.github?.subject)}>
        Test
      </Button>
    </div>
  )
}

interface VerifiedLinkItemProps {
  // platformPrivyName: string
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
  logger('linkMethod', linkMethod)
  logger('unlinkMethod', unlinkMethod)
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
