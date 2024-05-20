import { useLinkAccount, usePrivy } from '@privy-io/react-auth'
import { Button } from '@0xintuition/1ui'

const verifiedPlatforms = [
  {
    platformName: 'X',
    linkMethod: 'linkTwitter',
  },

  {
    platformName: 'GitHub',
    linkMethod: 'linkGithub',
  },
]

export function PrivyVerifiedLinks() {
  const { ready, authenticated, login, logout, user: privyUser } = usePrivy()

  const { linkTwitter, linkGithub, linkFarcaster, linkGoogle } = useLinkAccount(
    {
      onSuccess: (user, linkMethod, linkedAccount) => {
        console.log(user, linkMethod, linkedAccount)
      },
      onError: (error) => {
        console.log(error)
      },
    },
  )

  const linkMethods = { linkTwitter, linkGithub, linkFarcaster, linkGoogle }

  return (
    <div className="flex flex-col items-center gap-y-9">
      {verifiedPlatforms.map((platform) => {
        const method = linkMethods[platform.linkMethod]
        if (typeof method !== 'function') {
          console.error(`Link method ${platform.linkMethod} is not a function`)
          return null // Optionally handle this case more gracefully
        }
        return (
          <VerifiedLinkItem
            key={platform.platformName}
            platformName={platform.platformName}
            linkMethod={method}
          />
        )
      })}
    </div>
  )
}

interface VerifiedLinkItemProps {
  platformName: string
  platformIcon?: string
  linkMethod: () => void
}

export function VerifiedLinkItem({
  platformName,
  platformIcon,
  linkMethod,
}: VerifiedLinkItemProps) {
  return (
    <div className="flex items-center justify-between gap-4 px-8">
      {platformIcon && <img src="" alt="" />}
      <span>{platformName}</span>
      <Button onClick={() => linkMethod()}>Link</Button>
    </div>
  )
}
