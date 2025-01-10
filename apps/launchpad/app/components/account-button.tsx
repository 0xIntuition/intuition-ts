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
        <SidebarMenuButton
          size="lg"
          className="w-full gap-3 theme-border bg-[#131313]"
        >
          <Avatar
            className="h-7 w-7 border border-border/10"
            name={walletAddress}
            src={avatarImage}
          />
          {!isMinimal && (
            <div className="flex flex-1 items-center justify-between">
              <Text variant={TextVariant.body}>
                {accountResult?.account?.label || displayAddress}
              </Text>
              <MoreVertical className="h-6 w-6 text-secondary/60" />
            </div>
          )}
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-[--radix-dropdown-menu-trigger-width] bg-[#131313]"
      >
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Preferences</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem onClick={disconnect}>Disconnect</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : null
}
