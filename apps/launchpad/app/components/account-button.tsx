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

import { useAuth } from '@lib/providers/auth-provider'
import { User } from '@privy-io/react-auth'
import { Loader2, MoreVertical } from 'lucide-react'

export function AccountButton({
  privyUser,
  isMinimal,
}: {
  privyUser: User
  isMinimal: boolean
}) {
  const { isReady, isAuthenticated, isLoading, disconnect } = useAuth()
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

  // Show loading state
  if (isLoading) {
    return (
      <SidebarMenuButton className="w-full gap-2 py-5 border border-primary/10">
        <Loader2 className="h-5 w-5 animate-spin" />
        {!isMinimal && <Text variant={TextVariant.body}>Loading...</Text>}
      </SidebarMenuButton>
    )
  }

  // Only show the dropdown when ready and authenticated
  if (!isReady || !isAuthenticated || !privyUser.wallet) {
    return null
  }

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
                {accountResult?.account?.label || displayAddress}
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
        <DropdownMenuItem onClick={disconnect}>Disconnect</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
