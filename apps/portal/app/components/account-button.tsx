import {
  Avatar,
  Button,
  ButtonSize,
  ButtonVariant,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@0xintuition/1ui'
import { useGetAccountQuery } from '@0xintuition/graphql'

import { usePrivy, User } from '@privy-io/react-auth'
import { Loader2 } from 'lucide-react'

export function AccountButton({ privyUser }: { privyUser: User }) {
  const { ready: isReady, authenticated: isAuthenticated, logout } = usePrivy()
  const walletAddress = privyUser.wallet?.address ?? ''

  const { data: accountResult } = useGetAccountQuery(
    { address: walletAddress.toLowerCase() },
    {
      queryKey: ['get-account', { address: walletAddress.toLowerCase() }],
      enabled: !!walletAddress,
    },
  )

  const avatarImage = accountResult?.account?.image || undefined

  // If we have a wallet and are authenticated, show the button regardless of loading state
  if (privyUser.wallet && isAuthenticated) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={ButtonVariant.ghost}
            size={ButtonSize.lg}
            className="w-full gap-2 py-5 border border-primary/10 justify-start"
          >
            <Avatar
              className="h-5 w-5 border border-primary/10"
              name={walletAddress}
              src={avatarImage}
            />
          </Button>
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
      <Button
        variant={ButtonVariant.ghost}
        size={ButtonSize.lg}
        className="w-full gap-2 py-5 border border-primary/10 justify-start"
      >
        <Loader2 className="h-5 w-5 animate-spin" />
      </Button>
    )
  }

  // Otherwise show nothing
  return null
}
