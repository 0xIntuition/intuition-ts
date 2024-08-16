import { Icon, Text } from '@0xintuition/1ui'

import NavigationButton from './navigation-link'

export function PendingRefreshBanner({
  title,
  message,
}: {
  title: string
  message: string
}) {
  return (
    <div className="w-full rounded-lg bg-warning/10 border border-warning/30">
      <div className="p-3 flex w-full items-center justify-between rounded-tl-lg rounded-tr-lg">
        <div className="flex items-center gap-2">
          <Icon name="triangle-exclamation" className="text-warning" />
          <Text variant="bodyLarge" className="text-warning">
            {title}
          </Text>
        </div>

        <NavigationButton reloadDocument variant="secondary" to="">
          Refresh
        </NavigationButton>
      </div>
      <div className="p-4">
        <Text variant="bodyMedium" className="text-secondary-foreground/70">
          {message}
        </Text>
      </div>
    </div>
  )
}
