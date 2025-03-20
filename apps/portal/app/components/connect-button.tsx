import {
  Button,
  ButtonSize,
  ButtonVariant,
  cn,
  Icon,
  IconName,
  Text,
  TextWeight,
} from '@0xintuition/1ui'

import { useAuth } from '@lib/providers/auth-provider'

export function ConnectButton() {
  const { connect, isReady, isAuthenticated, isLoading } = useAuth()

  const handleConnect = async () => {
    await connect()
  }

  if (!isReady || isAuthenticated) {
    return null
  }

  return (
    <Button
      variant={ButtonVariant.ghost}
      size={ButtonSize.lg}
      onClick={handleConnect}
      disabled={isLoading}
      className="w-full gap-3 theme-border justify-start"
    >
      <Icon
        name={isLoading ? IconName.inProgress : IconName.wallet}
        className={cn('h-6 w-6 text-muted-foreground', {
          'animate-spin': isLoading,
        })}
      />
      <div className="flex flex-1 items-center justify-between">
        <Text weight={TextWeight.medium} className="text-muted-foreground">
          {isLoading ? 'Connecting...' : 'Connect Wallet'}
        </Text>
      </div>
    </Button>
  )
}
