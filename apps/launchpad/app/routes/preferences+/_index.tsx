import { Text, TextVariant, TextWeight } from '@0xintuition/1ui'

export default function PreferencesIndex() {
  return (
    <div className="flex flex-col gap-4">
      <Text variant={TextVariant.headline} weight={TextWeight.medium}>
        Preferences
      </Text>
      <Text variant={TextVariant.body} className="text-muted-foreground">
        Configure your application settings and preferences. Select a category
        from the sidebar to get started.
      </Text>
    </div>
  )
}
