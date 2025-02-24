import { Button } from '@0xintuition/1ui'

import { useDiscordRoles } from '../hooks/useDiscordRoles'
import type { PrivyUser } from '../types/auth'
import { SessionDiscordUser } from '../types/discord'

interface ConnectionCardProps {
  type: 'wallet' | 'discord'
  isConnected: boolean
  onConnect: () => void
  onDisconnect: () => void
  privyUser?: PrivyUser
  discordUser?: SessionDiscordUser
}

export function ConnectionCard({
  type,
  isConnected,
  onConnect,
  onDisconnect,
  privyUser,
  discordUser,
}: ConnectionCardProps) {
  const { roles, isLoading: isLoadingRoles } = useDiscordRoles({
    roleIds: discordUser?.roleIds,
  })

  return (
    <div className="w-full max-w-md bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">
            {type === 'wallet' ? 'Wallet' : 'Discord'}
          </h3>
          <p className="text-sm text-gray-400">
            {type === 'wallet'
              ? 'Connect your wallet to get started'
              : 'Connect your Discord account'}
          </p>
        </div>
        <Button
          variant={isConnected ? 'destructive' : 'primary'}
          onClick={isConnected ? onDisconnect : onConnect}
          className="shrink-0"
        >
          {isConnected ? 'Disconnect' : 'Connect'}
        </Button>
      </div>

      {isConnected && (
        <div className="space-y-2">
          {type === 'wallet' && privyUser?.wallet?.address && (
            <p className="text-sm font-mono text-gray-400">
              {privyUser.wallet.address}
            </p>
          )}
          {type === 'discord' && discordUser && (
            <div className="space-y-2">
              <p className="text-sm text-gray-400">
                Connected as{' '}
                <span className="font-semibold">{discordUser.username}</span>
              </p>
              {isLoadingRoles ? (
                <p className="text-sm text-gray-500">Loading roles...</p>
              ) : roles?.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {roles.map((role) => (
                    <span
                      key={role.id}
                      className="inline-flex items-center px-2 py-1 rounded-md text-xs"
                      style={{
                        backgroundColor: role.color
                          ? `${role.color}15`
                          : '#ffffff10',
                        color: role.color || '#fff',
                        border: `1px solid ${role.color ? `${role.color}30` : '#ffffff20'}`,
                      }}
                    >
                      {role.unicodeEmoji && (
                        <span className="mr-1">{role.unicodeEmoji}</span>
                      )}
                      {role.name}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
