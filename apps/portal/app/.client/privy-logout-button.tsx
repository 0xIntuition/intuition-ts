import {
  Button,
  ButtonSize,
  ButtonVariant,
  Icon,
  IconName,
} from '@0xintuition/1ui'

import { useLogout } from '@privy-io/react-auth'
import { useDisconnect } from 'wagmi'

interface PrivyLogoutButtonProps {
  handleLogout: () => void
}

export default function PrivyLogoutButton({
  handleLogout,
}: PrivyLogoutButtonProps) {
  const { disconnect } = useDisconnect()
  const { logout } = useLogout({
    onSuccess: () => {
      handleLogout()
    },
  })

  async function onLogout() {
    await logout()
    disconnect()
  }

  return (
    <Button
      variant={ButtonVariant.text}
      size={ButtonSize.lg}
      onClick={() => {
        onLogout()
      }}
    >
      <Icon name={IconName.arrowBoxLeft} /> Log Out
    </Button>
  )
}
