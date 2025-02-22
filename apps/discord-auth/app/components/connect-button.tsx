import { Avatar, cn, IconName, SidebarMenuButton } from '@0xintuition/1ui'

import { useAuth } from '@lib/providers/auth-provider'

export function ConnectButton() {
  const { connect, isReady, isAuthenticated, isLoading } = useAuth()

  const handleConnect = async () => {
    await connect()
  }

  if (!isReady || isAuthenticated) {
    return null
  }

  return (
    <SidebarMenuButton
      size="lg"
      onClick={handleConnect}
      disabled={isLoading}
      className="w-full gap-3 theme-border"
    >
      <Avatar
        name="Connect Wallet"
        icon={isLoading ? IconName.inProgress : IconName.wallet}
        className={cn('h-6 w-6 border border-border/10', {
          'animate-spin': isLoading,
        })}
      />
      <div className="flex flex-1 items-center justify-between">
        <span className="text-sm font-medium">
          {isLoading ? 'Connecting...' : 'Connect Wallet'}
        </span>
      </div>
    </SidebarMenuButton>
  )
}
