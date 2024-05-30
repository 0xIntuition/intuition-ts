import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@0xintuition/1ui'

import { usePrivy, useWallets } from '@privy-io/react-auth'
import { NavLink, useFetcher } from '@remix-run/react'
import { useDisconnect } from 'wagmi'

export function PrivyButton() {
  const { ready, authenticated, login, logout, user: privyUser } = usePrivy()

  const { disconnect } = useDisconnect()
  const { wallets } = useWallets()
  const chainId = wallets?.[0]?.chainId

  // Disable login when Privy is not ready or the user is already authenticated
  const disableLogin = !ready || (ready && authenticated)

  const fetcher = useFetcher()

  async function handleSignout() {
    logout()
    disconnect()
    fetcher.submit({}, { method: 'post', action: '/actions/auth/logout' })
  }

  if (!ready) {
    return null
  }

  if (ready && !authenticated) {
    return (
      <Button disabled={disableLogin} onClick={login} variant="primary">
        Log in
      </Button>
    )
  }

  if (ready && authenticated && privyUser !== null) {
    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <span>
              <Button variant="primary">
                User: {privyUser.wallet?.address}
              </Button>
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="bg-popover w-48">
            <DropdownMenuItem className="flex items-center gap-2">
              <NavLink to={`/profile`} className="font-semibold">
                <div className="space-y-1">
                  <div className="text-secondary-foreground text-sm font-normal">
                    Signed in as:
                  </div>
                  {privyUser?.wallet?.address}
                </div>
              </NavLink>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2">
              <div className="space-y-1">
                <div className="text-secondary-foreground text-sm font-normal">
                  Connected to:
                </div>
                <div className="flex flex-row items-center gap-1">
                  {chainId}
                </div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault()
                handleSignout()
              }}
              className="cursor-pointer justify-start"
            >
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    )
  }
}
