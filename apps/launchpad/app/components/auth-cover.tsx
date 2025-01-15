import { Button } from '@0xintuition/1ui'

import { usePrivy } from '@privy-io/react-auth'

interface AuthCoverProps {
  children: React.ReactNode
  className?: string
  // Allow customizing the blur amount
  blurAmount?: string
  // Optional custom styles for the button container
  buttonContainerClassName?: string
}

export function AuthCover({
  children,
  className,
  blurAmount = 'blur-sm',
  buttonContainerClassName,
}: AuthCoverProps) {
  const { login, ready, authenticated } = usePrivy()

  if (!ready) {
    return null
  }

  if (authenticated) {
    return <>{children}</>
  }

  return (
    <div className={`relative ${className}`}>
      <div className={`${blurAmount} select-none brightness-[0.7]`}>
        {children}
      </div>
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={
            buttonContainerClassName ??
            'h-full flex items-center justify-center'
          }
        >
          <Button
            variant="primary"
            size="lg"
            onClick={login}
            className="pointer-events-auto shadow-2xl"
          >
            Connect Wallet
          </Button>
        </div>
      </div>
    </div>
  )
}
