import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@intuition-ts/1ui'
import { usePrivy, useWallets } from '@privy-io/react-auth'
import { NavLink } from '@remix-run/react'

export function PrivyButton() {
  const { ready, authenticated, login, logout, user: privyUser } = usePrivy()
  const { wallets } = useWallets()
  const chainId = wallets?.[0]?.chainId

  // Disable login when Privy is not ready or the user is already authenticated
  const disableLogin = !ready || (ready && authenticated)

  console.log('ready', ready)
  console.log('authenticated', authenticated)
  console.log('privyUser', privyUser)

  if (!ready) {
    return null
  }

  if (ready && !authenticated) {
    return (
      <Button disabled={disableLogin} onClick={login} className="bg-cyan-50">
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
              <Button className="bg-cyan-50">User: {privyUser.id}</Button>
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
                logout()
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
