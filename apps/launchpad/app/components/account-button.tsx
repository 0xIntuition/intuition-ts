import {
  Avatar,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  SidebarMenuButton,
  Text,
  TextVariant,
} from '@0xintuition/1ui'
import { useGetAccountQuery } from '@0xintuition/graphql'

import { usePrivy, User } from '@privy-io/react-auth'
import { Loader2, MoreVertical } from 'lucide-react'

export function AccountButton({
  privyUser,
  isMinimal,
}: {
  privyUser: User
  isMinimal: boolean
}) {
  const { ready: isReady, authenticated: isAuthenticated, logout } = usePrivy()
  const walletAddress = privyUser.wallet?.address ?? ''

  const { data: accountResult, isLoading: isAccountLoading } =
    useGetAccountQuery(
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

  // If we have a wallet and are authenticated, show the button regardless of loading state
  if (privyUser.wallet && isAuthenticated) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton className="w-full gap-2 py-5 border border-primary/10">
            <Avatar
              className="h-5 w-5 border border-primary/10"
              name={walletAddress}
              src={avatarImage}
            />
            {!isMinimal && (
              <div className="flex flex-1 items-center justify-between">
                <Text variant={TextVariant.body}>
                  {isAccountLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin inline mr-2" />
                  ) : (
                    accountResult?.account?.label || displayAddress
                  )}
                </Text>
                <MoreVertical className="h-5 w-5 text-primary/50" />
              </div>
            )}
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="w-[--radix-dropdown-menu-trigger-width]"
        >
          <DropdownMenuItem onClick={logout}>Disconnect</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  // Only show loading state during initial connection and when not authenticated
  if (!isReady) {
    return (
      <SidebarMenuButton className="w-full gap-2 py-5 border border-primary/10">
        <Loader2 className="h-5 w-5 animate-spin" />
        {!isMinimal && <Text variant={TextVariant.body}>Loading...</Text>}
      </SidebarMenuButton>
    )
  }

  // Otherwise show nothing
  return null
}
