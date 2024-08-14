import React from 'react'

import {
  Button,
  ButtonSize,
  ButtonVariant,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Icon,
  IconName,
  Text,
  Trunctacular,
} from '@0xintuition/1ui'
import { UserPresenter } from '@0xintuition/api'

import PrivyLogoutButton from '@client/privy-logout-button'
import { usePrivy } from '@privy-io/react-auth'
import { useNavigate } from '@remix-run/react'
import { PATHS } from 'app/consts'
import { useDisconnect } from 'wagmi'

export default function PrivyButton({
  triggerComponent,
  userObject,
  onLogout,
}: {
  triggerComponent?: React.ReactNode
  userObject?: UserPresenter
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

  console.log('userObject', userObject)

  if (ready && authenticated && privyUser !== null) {
    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="border-none p-0 max-sm:p-0">
              {triggerComponent}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="top"
            align="start"
            sideOffset={8}
            className="bg-popover w-48"
          >
            <div className="flex flex-col gap-1 px-4 pt-2">
              <div className="space-y-1">
                <Text
                  variant="footnote"
                  weight="medium"
                  className="text-muted-foreground"
                >
                  Signed in as:
                </Text>
              </div>
              <div className="flex items-center gap-2 font-medium py-2 gap-2 text-base text-secondary-foreground">
                <Icon name={IconName.ethereum} />{' '}
                <Trunctacular
                  value={
                    userObject?.ens_name ??
                    userObject?.wallet ??
                    privyUser?.wallet?.address ??
                    ''
                  }
                  className="text-secondary-foreground"
                />
              </div>
            </div>
            <DropdownMenuSeparator />
            <Button
              variant={ButtonVariant.text}
              size={ButtonSize.lg}
              onClick={() => {
                navigate(PATHS.PROFILE)
              }}
            >
              <Icon name={IconName.cryptoPunk} /> View Profile
            </Button>
            <DropdownMenuSeparator />
            <PrivyLogoutButton handleLogout={handleSignout} />
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    )
  }
}
