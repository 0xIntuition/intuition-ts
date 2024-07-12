import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Text,
  Trunctacular,
} from '@0xintuition/1ui'

import { usePrivy } from '@privy-io/react-auth'
import { NavLink, useNavigate } from '@remix-run/react'
import { useDisconnect } from 'wagmi'

export function PrivyButton({
  triggerComponent,
}: {
  triggerComponent?: React.ReactNode
}) {
  const { ready, authenticated, login, logout, user: privyUser } = usePrivy()

  const navigate = useNavigate()
  const { disconnect } = useDisconnect()

  // Disable login when Privy is not ready or the user is already authenticated
  const disableLogin = !ready || (ready && authenticated)

  async function handleSignout() {
    logout()
    disconnect()
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
            <Button variant="ghost" className="border-none p-0">
              {triggerComponent}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="bg-popover w-48">
            <DropdownMenuItem className="flex items-center gap-2" disabled>
              <div className="space-y-1">
                <Text
                  variant="footnote"
                  weight="medium"
                  className="text-secondary-foreground"
                >
                  Signed in as:
                </Text>
                <Trunctacular value={privyUser?.wallet?.address ?? ''} />
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer justify-start"
              onSelect={(e) => {
                e.preventDefault()
                navigate('/app/profile')
              }}
            >
              <NavLink to={`/app/profile`} className="font-semibold">
                <div className="space-y-1">
                  <Text>View Profile</Text>
                </div>
              </NavLink>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault()
                handleSignout()
              }}
              className="cursor-pointer justify-start"
            >
              <div className="space-y-1">
                <Text>Logout</Text>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    )
  }
}
