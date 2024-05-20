import { useLinkAccount, usePrivy } from '@privy-io/react-auth'
import { Button } from '@0xintuition/1ui'
import logger from '@lib/utils/logger'

const verifiedPlatforms = [
  {
    platformPrivyName: 'twitter',
    platformDisplayName: 'X',
    linkMethod: 'linkTwitter',
  },

  {
    platformPrivyName: 'github',
    platformDisplayName: 'GitHub',
    linkMethod: 'linkGithub',
  },
]

export function PrivyVerifiedLinks() {
  const { user: privyUser } = usePrivy()
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

  const linkMethods = { linkTwitter, linkGithub, linkFarcaster, linkGoogle }

  return (
    <div className="flex w-full flex-col items-center gap-8">
      {verifiedPlatforms.map((platform) => {
        const method =
          linkMethods[platform.linkMethod as keyof typeof linkMethods]
        if (typeof method !== 'function') {
          logger(`Link method ${platform.linkMethod} is not a function`)
          return null
        }
        if (privyUser === null) {
          logger('Privy user is null')
        }

        const isConnected = privyUser
          ? privyUser[platform.platformPrivyName] !== undefined
          : false

        return (
          <VerifiedLinkItem
            key={platform.platformPrivyName}
            platformPrivyName={platform.platformPrivyName}
            platformDisplayName={platform.platformDisplayName}
            isConnected={isConnected}
            linkMethod={method}
          />
        )
      })}
    </div>
  )
}

interface VerifiedLinkItemProps {
  // platformPrivyName: string
  platformDisplayName: string
  platformIcon?: string
  linkMethod: () => void
  isConnected: boolean
}

export function VerifiedLinkItem({
  platformDisplayName,
  platformIcon,
  linkMethod,
  isConnected,
}: VerifiedLinkItemProps) {
  return (
    <div className="flex w-full justify-between gap-4 px-8">
      {platformIcon && <img src="" alt="" />}
      <span>{platformDisplayName}</span>
      {isConnected ? (
        <Button>X</Button>
      ) : (
        <Button onClick={() => linkMethod()}>Link</Button>
      )}
    </div>
  )
}
