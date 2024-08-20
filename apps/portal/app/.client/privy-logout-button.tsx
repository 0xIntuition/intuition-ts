import {
  Button,
  ButtonSize,
  ButtonVariant,
  Icon,
  IconName,
} from '@0xintuition/1ui'

import { usePrivy } from '@privy-io/react-auth'
import { useDisconnect } from 'wagmi'

interface PrivyLogoutButtonProps {
  handleLogout?: () => void
}

export default function PrivyLogoutButton({
  handleLogout,
}: PrivyLogoutButtonProps) {
  const { logout } = usePrivy()

  const { disconnect } = useDisconnect()

  async function onLogout() {
    await logout()
    disconnect()
  }

  return (
    <Button
      variant={ButtonVariant.text}
      size={ButtonSize.lg}
      onClick={() => {
        handleLogout ? handleLogout() : onLogout()
      }}
    >
      <Icon name={IconName.arrowBoxLeft} /> Log Out
    </Button>
  )
}
