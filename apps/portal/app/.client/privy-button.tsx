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
import { PATHS } from 'consts'
import { useDisconnect } from 'wagmi'

export function PrivyButton({
  triggerComponent,
  onLogout,
}: {
  triggerComponent?: React.ReactNode
  onLogout?: () => void
}) {
  const { ready, authenticated, logout, user: privyUser } = usePrivy()

  const navigate = useNavigate()
  const { disconnect } = useDisconnect()

  async function handleSignout() {
    await logout()
    disconnect()
    onLogout?.()
  }

  if (!ready) {
    return null
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
                navigate(PATHS.PROFILE)
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
