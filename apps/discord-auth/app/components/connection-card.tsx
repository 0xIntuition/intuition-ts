import { useMemo } from 'react'

import { Button } from '@0xintuition/1ui'

import { Wallet } from 'lucide-react'
import { useEnsName } from 'wagmi'

import { useDiscordRoles } from '../hooks/useDiscordRoles'
import type { PrivyUser } from '../types/auth'
import type { DiscordRole, SessionDiscordUser } from '../types/discord'

interface ConnectionCardProps {
  type: 'wallet' | 'discord'
  isConnected: boolean
  onConnect: () => void
  onDisconnect?: () => void
  privyUser?: PrivyUser
  discordUser?: SessionDiscordUser
  isLoading?: boolean
}

export function ConnectionCard({
  type,
  isConnected,
  onConnect,
  onDisconnect,
  privyUser,
  discordUser,
  isLoading,
}: ConnectionCardProps) {
  const { data: ensName } = useEnsName({
    address: privyUser?.wallet?.address as `0x${string}`,
    chainId: 1, // mainnet
  })
  const walletAddress = privyUser?.wallet?.address.toLowerCase()

  // Memoize the roleIds to prevent unnecessary re-renders
  const roleIds = useMemo(() => {
    if (!discordUser) {
      return undefined
    }

    // Check if roleIds exists directly on the discordUser
    if (discordUser.roleIds) {
      // Even if roleIds is empty, return it as an empty array rather than undefined
      return discordUser.roleIds
    }

    // Fallback to roles array if it exists (legacy format)
    const legacyRoles = (discordUser as unknown as { roles: DiscordRole[] })
      ?.roles
    if (legacyRoles) {
      const mappedRoleIds = legacyRoles.map((r) => r.id)
      return mappedRoleIds
    }

    // Return empty array instead of undefined to trigger role fetching
    return []
  }, [discordUser])

  const { roles, isLoading: isLoadingRoles } = useDiscordRoles({ roleIds })

  return (
    <div className="w-full max-w-md rounded-lg bg-white/5 backdrop-blur-md backdrop-saturate-150 p-6 border border-border/10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {type === 'wallet' ? (
            <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
              <Wallet className="w-6 h-6 text-green-500" />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full overflow-hidden">
              {discordUser?.avatar ? (
                <img
                  src={`https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`}
                  alt={discordUser.username}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-indigo-500/10 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-indigo-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026 13.83 13.83 0 0 0 1.226-1.963.074.074 0 0 0-.041-.104 13.175 13.175 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z" />
                  </svg>
                </div>
              )}
            </div>
          )}
          <div>
            <h3 className="text-lg font-semibold">
              {type === 'wallet' ? 'Wallet' : 'Discord'}
            </h3>
            {isConnected && (
              <p className="text-sm text-gray-400">
                {type === 'wallet'
                  ? ensName ||
                    `${walletAddress?.slice(0, 6)}...${walletAddress?.slice(-4)}`
                  : discordUser?.username}
              </p>
            )}
          </div>
        </div>
        {isConnected ? (
          <Button
            variant="secondary"
            onClick={onDisconnect}
            disabled={isLoading}
          >
            Disconnect
          </Button>
        ) : (
          <Button variant="primary" onClick={onConnect} disabled={isLoading}>
            Connect
          </Button>
        )}
      </div>
      {isConnected && type === 'wallet' && (
        <div className="mt-2 p-3 bg-black/20 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Address</span>
            <span className="font-mono">{walletAddress}</span>
          </div>
          {ensName && (
            <div className="flex items-center justify-between text-sm mt-2">
              <span className="text-gray-400">ENS Name</span>
              <span>{ensName}</span>
            </div>
          )}
        </div>
      )}
      {isConnected && type === 'discord' && discordUser && (
        <div className="mt-2 space-y-3">
          <div className="p-3 bg-black/20 rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Username</span>
              <span>{discordUser.username}</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-2">
              <span className="text-gray-400">ID</span>
              <span className="font-mono">{discordUser.id}</span>
            </div>
          </div>
          {isLoadingRoles ? (
            <div className="p-3 bg-black/20 rounded-lg">
              <span className="text-gray-400 text-sm">Loading roles...</span>
            </div>
          ) : (
            roles?.length > 0 && (
              <div className="p-3 bg-black/20 rounded-lg">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-400">Roles</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">
                      {roles.length} role{roles.length !== 1 ? 's' : ''}
                    </span>
                    {discordUser.totalPoints ? (
                      <span className="text-xs bg-green-500/20 text-green-500 px-2 py-0.5 rounded-full">
                        {discordUser.totalPoints.toLocaleString()} points
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {roles.map((role) => (
                    <div
                      key={role.id}
                      className="flex items-center gap-1 px-2 py-1 text-xs rounded-md"
                      style={{
                        backgroundColor: role.color
                          ? `${role.color}10`
                          : 'rgba(99, 102, 241, 0.1)',
                        borderColor: role.color
                          ? `${role.color}20`
                          : 'rgba(99, 102, 241, 0.2)',
                        color: role.color || '#818cf8',
                        borderWidth: '1px',
                      }}
                    >
                      {role.unicodeEmoji && (
                        <span className="mr-1">{role.unicodeEmoji}</span>
                      )}
                      {role.icon && (
                        <img
                          src={`https://cdn.discordapp.com/role-icons/${role.id}/${role.icon}.png`}
                          alt=""
                          className="w-4 h-4 mr-1"
                        />
                      )}
                      <span className="flex items-center gap-1">
                        {role.name}
                        {role.points ? (
                          <span className="text-[10px] opacity-75 ml-1">
                            ({role.points.toLocaleString()})
                          </span>
                        ) : null}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  )
}
