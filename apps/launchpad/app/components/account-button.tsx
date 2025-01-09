import {
  Avatar,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  SidebarMenuButton,
} from '@0xintuition/1ui'
import { useGetAccountQuery } from '@0xintuition/graphql'

import { useAuth } from '@lib/providers/auth-provider'
import { User } from '@privy-io/react-auth'
import { MoreVertical } from 'lucide-react'

export function AccountButton({
  privyUser,
  isMinimal,
}: {
  privyUser: User
  isMinimal: boolean
}) {
  const { isReady, isAuthenticated, disconnect } = useAuth()
  const walletAddress = privyUser.wallet?.address ?? ''

  const { data: accountResult } = useGetAccountQuery(
    { address: walletAddress.toLowerCase() },
    {
      queryKey: ['get-account', { address: walletAddress.toLowerCase() }],
      enabled: !!walletAddress,
    },
  )

  const avatarImage = accountResult?.account?.image || undefined
  const displayAddress = walletAddress
    ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
    : ''

  return isReady && isAuthenticated && privyUser.wallet ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton size="lg" className="w-full gap-3 theme-border">
          <Avatar
            className="h-6 w-6 border border-border/10"
            name={walletAddress}
            src={avatarImage}
          />
          {!isMinimal && (
            <div className="flex flex-1 items-center justify-between">
              <span className="text-sm font-medium">
                {accountResult?.account?.label || displayAddress}
              </span>
              <MoreVertical className="h-4 w-4 text-muted-foreground/70" />
            </div>
          )}
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-[--radix-dropdown-menu-trigger-width]"
      >
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Preferences</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem onClick={disconnect}>Disconnect</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : null
}
