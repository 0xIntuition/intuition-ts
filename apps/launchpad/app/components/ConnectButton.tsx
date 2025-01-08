import { useState } from 'react'

import { Avatar, cn, IconName, SidebarMenuButton } from '@0xintuition/1ui'

import { useAuth } from '@lib/providers/auth-provider'

export function ConnectButton() {
  const [loading, setLoading] = useState(false)
  const { isReady, connect } = useAuth()

  const handleConnect = async () => {
    setLoading(true)
    try {
      await connect()
    } catch (error) {
      console.error('Failed to connect:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!isReady) {
    return null
  }

  return (
    <SidebarMenuButton
      size="lg"
      onClick={handleConnect}
      disabled={loading}
      className="w-full gap-3 theme-border"
    >
      <Avatar
        name="Connect Wallet"
        icon={loading ? IconName.inProgress : IconName.wallet}
        className={cn('h-6 w-6 border border-border/10', {
          'animate-spin': loading,
        })}
      />
      <div className="flex flex-1 items-center justify-between">
        <span className="text-sm font-medium">
          {loading ? 'Connecting...' : 'Connect Wallet'}
        </span>
      </div>
    </SidebarMenuButton>
  )
}
