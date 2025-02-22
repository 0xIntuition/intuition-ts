import { usePrivy } from '@privy-io/react-auth'

import { AccountButton } from './account-button'
import { ConnectButton } from './connect-button'

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const { user: privyUser, ready: isReady } = usePrivy()

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 right-0 p-4 z-50">
        {!isReady ? null : privyUser ? (
          <AccountButton privyUser={privyUser} isMinimal={false} />
        ) : (
          <ConnectButton />
        )}
      </header>
      <main>{children}</main>
    </div>
  )
}
