import {
  Button,
  ButtonSize,
  ButtonVariant,
  Icon,
  IconName,
} from '@0xintuition/1ui'

import { usePrivy } from '@privy-io/react-auth'
import { useSubmit } from '@remix-run/react'
import { useDisconnect } from 'wagmi'

export default function PrivyLogoutButton() {
  const { logout } = usePrivy()
  const submit = useSubmit()

  const { disconnect } = useDisconnect()

  function onLogout() {
    submit(null, {
      action: '/actions/logout',
      method: 'post',
    })
  }

  async function handleSignout() {
    await logout()
    disconnect()
    onLogout?.()
  }

  return (
    <Button
      variant={ButtonVariant.text}
      size={ButtonSize.lg}
      onClick={() => {
        handleSignout()
      }}
    >
      <Icon name={IconName.arrowBoxLeft} /> Log Out
    </Button>
  )
}
