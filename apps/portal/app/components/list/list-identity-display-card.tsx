import { IdentityTag, Text } from '@0xintuition/1ui'

export function ListIdentityDisplayCard({
  displayName,
  avatarImgSrc,
}: {
  displayName: string
  avatarImgSrc?: string
}) {
  return (
    <div className="flex flex-col gap-2 theme-border p-5 rounded-lg">
      <Text variant="caption" className="text-muted-foreground">
        Tag Identity
      </Text>
      <div className="flex justify-between items-center gap-1">
        <IdentityTag variant="nonUser" imgSrc={avatarImgSrc}>
          {displayName}
        </IdentityTag>
      </div>
    </div>
  )
}
